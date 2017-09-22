import {Alert, AsyncStorage} from 'react-native';
import {observable, action, computed} from 'mobx';
import {autobind} from 'core-decorators';
import io from 'socket.io-client';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client';

const API_URL = 'http://52.62.125.103:8080';

@autobind
export default class Store {

  @observable isAuthenticated = false;
  @observable isConnecting = false;
  @observable user = null;
  @observable messages = [];
  @observable meetParticipants = []; 
  @observable hasMoreMessages = false;
  @observable skip = 0;

  constructor() {
    const options = {transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000};
    const socket = io(API_URL, options);

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      .configure(authentication({
        storage: AsyncStorage // To store our accessToken
      }));

    this.connect();

    this.app.service('messages').on('created', createdMessage => {
      this.messages.unshift(this.formatMessage(createdMessage));
    });

    this.app.service('messages').on('removed', removedMessage => {
      this.deleteMessage(removedMessage);
    });

    this.app.service('users').on('updated', updatedUser => {
      if(this.user == null) {
        return;
      }
      updatedUser.friends = this.user.friends;
      this.user = updatedUser;
    })      

    if (this.app.get('accessToken')) {
      this.isAuthenticated = this.app.get('accessToken') !== null;
    }
  }

  connect() {
    this.isConnecting = true;

    this.app.io.on('connect', () => {
      this.isConnecting = false;

      this.authenticate().then(() => {
        console.log('authenticated after reconnection');
      }).catch(error => {
        console.log('error authenticating after reconnection', error);
      });
    });

    this.app.io.on('disconnect', () => {
      console.log('disconnected');
      this.isConnecting = true;
    });
  }

  createAccount(email, username, password) {
    const userData = {
      email, 
      username, 
      password,
      friends : [],
      friendRequests : [],
      meetRequests: []
    };
    return this.app.service('users').create(userData).then((result) => {
      return this.authenticate(Object.assign(userData, {strategy: 'local'}))
    });
  }

  login(email, password) {
    const payload = {
      strategy: 'local',
      email,
      password
    };
    return this.authenticate(payload);
  }

  authenticate(options) {
    options = options ? options : undefined;
    return this._authenticate(options).then(user => {
      console.log('authenticated successfully', user._id, user.email);
      this.user = user;
      this.isAuthenticated = true;
      this.loadFriends();
      return Promise.resolve(user);
    }).catch(error => {
      console.log('authenticated failed', error.message);
      console.log(error);
      return Promise.reject(error);
    });
  }

  _authenticate(payload) {
    return this.app.authenticate(payload)
      .then(response => {
        return this.app.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        return this.app.service('users').get(payload.userId);
      }).catch(e => Promise.reject(e));
  }

  promptForLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel', onPress: () => {
        }, style: 'cancel'
        },
        {text: 'Yes', onPress: this.logout, style: 'destructive'},
      ]
    );
  }

  logout() {
    this.app.logout();
    this.skip = 0;
    this.messages = [];
    this.user = null;
    this.isAuthenticated = false;
    this.meetParticipants = [];
  }

  loadMessages(loadNextPage) {
    let $skip = this.skip;

    const query = {query: {$sort: {createdAt: -1}, $skip}};
    
    return this.app.service('messages').find(query).then(response => {
      const messages = [];
      const skip = response.skip + response.limit;

      for (let message of response.data) {
        messages.push(this.formatMessage(message));
      }

      console.log('loaded messages from server', JSON.stringify(messages, null, 2));
      if (!loadNextPage) {
        this.messages = messages;
      } else {
        this.messages = this.messages.concat(messages);
      }
      this.skip = skip;
      this.hasMoreMessages = response.skip + response.limit < response.total;

    }).catch(error => {
      console.log(error);
    });
  }

  formatMessage(message) {
    return {
      _id: message._id,
      text: message.text,
      position: message.user._id.toString() === this.user._id.toString() ? 'left' : 'right',
      createdAt: message.createdAt,
      user: {
        _id: message.user._id ? message.user._id : '',
        name: message.user.username,
        avatar: message.user.avatar
      }
    };
  }

  deleteMessage(messageToRemove) {
    let messages = this.messages;
    let idToRemove = messageToRemove.id ? messageToRemove.id : messageToRemove._id;

    messages = messages.filter(function (message) {
      return message.id !== idToRemove;
    });
    this.messages = messages;
  }

  sendMessage(messages = {}, rowID = null) {
    this.app.service('messages').create({
      user: {
        _id: this.user._id,
        email: this.user.email,
        username: this.user.username,
        avatar: this.user.avatar
      },
      text: messages[0].text
    }).then(result => {
        console.log('message created!');
        }).catch((error) => {
          console.log('ERROR creating message');
          console.log(error);
      });
    }

  sendMeetRequest(friend) {
    this.app.service('meet-requests').create({
      fromUser: {
        _id: this.user._id,
        email: this.user.email,
        username: this.user.username
      },
      toUser: {
        _id: friend._id,
        email: friend.email,
        username: friend.username,
        hasAccepted: false
      } 
    }).then(result => {
      console.log('meet request sent!');
    }).catch(error => {
      console.log('Error sending meet request');
      console.log(error);
    });
  }

  deleteMeetRequest(requestToRemove) {
    this.app.service('meet-requests').remove(requestToRemove._id);
  }

  // Temporarily loading all other users for testing purposes
  loadFriends() {
    this.app.service('users').find({ query: {$limit: 100, email: {$ne: this.user.email}}})
      .then(response => {
          const friends = [];
            
            for(let friend of response.data) {
              friends.push(friend);
            }
            this.user.friends = friends;
        }).catch(error => {
        console.log(error);
      });
  }

}
