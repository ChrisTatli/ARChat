import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  Alert
} from 'react-native';
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import { NavigationActions } from 'react-navigation';
import {autobind} from 'core-decorators';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';

@observer @autobind
export default class FriendList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Friends',
    headerLeft: NavIcons.closeButton(navigation.goBack),
    headerRight: NavIcons.addfriendButton(navigation.navigate)
  });

 constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
    this.meetRequests = this.store.user.meetRequests;
    this.friends = this.store.user.friends;
  }
 
  generateFriendsList() {
    return this.friends.map((friend) => 
    <View key={friend._id} style={{flex: 2, flexDirection: 'row', margin:5, paddingLeft:10, 
      paddingRight:10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#48fdf6'}}>
      <Image source={{uri: friend.avatar}} style={styles.avatar} /> 
      <Text style={{fontSize:18, textAlign:'left', color: '#48fdf6'}} >{friend.username}</Text>
      {
        this.meetRequests.length == 0 ? this.noMeetRequest(friend, false)
         :  friend._id == this.meetRequests[0].toUser._id ? this.sentMeetRequest()
         : friend._id == this.meetRequests[0].fromUser._id ? this.receivedMeetRequest()
         : this.noMeetRequest(friend, true)
      }
    </View>
    );
  }

  noMeetRequest(friend, disabled) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title='meet'
          onPress={() => this.store.sendMeetRequest(friend)}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          disabled={disabled}
          >
        </Button>
        <Button title='remove'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
      </View>
    );
  }

  sentMeetRequest() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title='waiting...'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          disabled={false}
          >
        </Button>
        <Button title='cancel'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
      </View>
    );
  }

  receivedMeetRequest() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title='accept'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          disabled={false}
          >
        </Button>
        <Button title='decline'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
      </View>
    );
  }


  render() {
    return (
        <ScrollView style={styles.container}>
          {this.generateFriendsList()}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   paddingTop: 5,
   backgroundColor: 'black'
  },
  button: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'black',
    width: 80,
    height: 30,
    marginRight: 0
  },
  avatar: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 10
  }
});
