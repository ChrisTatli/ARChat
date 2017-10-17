'use strict'
import React, {Component} from 'react';
import {
   ScrollView,
   StyleSheet,
   Text,
   View,
   Image,
   Alert
} from 'react-native';
import {Button} from 'react-native-elements';
import NavIcons from "../components/NavIcons";
import {autobind} from 'core-decorators';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {
   NavigationActions,
} from 'react-navigation';


import Ionicons from 'react-native-vector-icons/Ionicons';

@autobind @observer
export default class FriendRequest extends Component{
   static navigationOptions = ({navigation}) => ({
      title: "Friend Requests",
      headerLeft: NavIcons.closeButton(navigation.goBack),
      tabBarLabel: 'Requests',
      tabBarIcon: ({tintColor, focused }) => (
        <Ionicons
           name={focused ? 'ios-person-add' : 'ios-person-add-outline'}
           size={26}
           style={{color: tintColor}}
        />
     ),
   });


   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;

    }


    generateFriendRequestList() {
      if(this.store.user != null) {

        return this.store.user.friendRequests.map((friend) =>
        <View key={friend.fromUser._id + friend.toUser._id}>
            {this.generateNamesFrom(friend)}
            {this.generateNamesTo(friend)}

        </View>
        );
      } else {
        return
      }
    }

    generateNamesTo(friend){
      if(this.store.user.username == friend.toUser.username){
      return(
      <View style={styles.friendRow}>
      <Image source={{ uri: friend.fromUser.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{ friend.fromUser.username }</Text>
      { this.generateButtonsTo(friend) }
      </View>
    );
    }
  }

  generateNamesFrom(friend){
    if(this.store.user.username == friend.fromUser.username){
    return(
    <View style={styles.friendRow}>
    <Image source={{ uri: friend.toUser.avatar }} style={styles.avatar} />
    <Text style={styles.username}>{ friend.toUser.username }</Text>
    { this.generateButtonsFrom(friend) }
    </View>
  );
  }
}

    generateButtonsTo(friend){
      if(this.store.user.username == friend.toUser.username){
      return(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title='Accept'
          onPress={() => {this.store.acceptFriendRequest(friend)}}
          backgroundColor='#aee283'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          disabled = {false}
          >
        </Button>
        <Button title='Decline'
          onPress={() => {this.declineFriendRequest(friend)}}
          backgroundColor='#e87175'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
      </View>
    );
    }
  }

    generateButtonsFrom(friend){
      if(this.store.user.username == friend.fromUser.username){
      return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button title='Waiting..'
            onPress={() => {}}
            backgroundColor='#89bbfe'
            color={'black'}
            fontSize={10}
            buttonStyle={styles.button}
            disabled = {false}
            >
          </Button>
          <Button title='Cancel'
            onPress={() => {this.store.cancelFriendRequest(friend)}}
            backgroundColor='#a1a8ad'
            color={'black'}
            fontSize={10}
            buttonStyle={styles.button}
            >
          </Button>
        </View>
    );
  }
    }



       render(){
          return(
             <ScrollView style={styles.container}>
                {this.generateFriendRequestList()}
             </ScrollView>
          );
       }
    }

    const styles = StyleSheet.create({
      container: {
       flex: 1,
       flexDirection: 'column',
       paddingTop: 5,
       backgroundColor: 'white'
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
      },
      friendRow: {
        flex: 2,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#48fdf6'
      },
      username: {
        fontSize: 18,
        textAlign: 'left',
        color: 'black'
      }
    })
