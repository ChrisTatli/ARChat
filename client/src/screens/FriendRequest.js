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

import {
   NavigationActions,
} from 'react-navigation';


import Ionicons from 'react-native-vector-icons/Ionicons';

//@autobind @observer
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



    fromUserList(){
          let frequests = this.store.requestfromusers;
          return frequests.map((fuser) => {
          return (
          <View key={fuser._id} style={styles.friendRow}>
            <Image source={{uri: fuser.tavatar}} style={styles.avatar} />
            <Text style={styles.username} >{fuser.tusername}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button title='Waiting..'
                onPress={() => {}}
                backgroundColor='#aee283'
                color={'black'}
                fontSize={10}
                buttonStyle={styles.button}
                disabled = {false}
                >
              </Button>
              <Button title='Cancel'
                onPress={() => {this.cancelFriendRequest(fuser)}}
                backgroundColor='#e87175'
                color={'black'}
                fontSize={10}
                buttonStyle={styles.button}
                >
              </Button>
            </View>
          </View>
        )}
      );

        }

        toUserList() {

          let trequests = this.store.requesttousers;
          // Alert.alert('Error',JSON.stringify(trequests));

            return trequests.map((tuser) => {
              return (
               <View key={tuser._id} style={styles.friendRow}>
                <Image source={{ uri: tuser.favatar }} style={styles.avatar} />
                <Text style={styles.username}>{tuser.fusername }</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button title='Accept'
                    onPress={() => {this.acceptFriendRequest(tuser)}}
                    backgroundColor='#aee283'
                    color={'black'}
                    fontSize={10}
                    buttonStyle={styles.button}
                    disabled = {false}
                    >
                  </Button>
                  <Button title='Decline'
                    onPress={() => {this.declineFriendRequest(tuser)}}
                    backgroundColor='#e87175'
                    color={'black'}
                    fontSize={10}
                    buttonStyle={styles.button}
                    >
                  </Button>
                </View>
              </View>
            )}

          );

          }

          acceptFriendRequest(tuser){
            this.store.app.service('user').update(this.store.user.friends,
            {$push: {"_id": f_id, "username":fusername, "email":femail,"avatar":favatar} } )
            .then(result => {

            }).catch(error =>{
              Alert.alert('Error', "Error while updating friend in this user");
            });


            this.app.service('user').update( _id: tuser.f_id,
            {$push: {"_id": t_id,"username":tusername,"email":temail,"avatar":tavatar} } )
            .then(result =>{

            }).catch(error => {
              Alert.alert('Error', "Error while updating other user");
            });

           {this.declineFriendRequest(tuser)}
          }


          cancelFriendRequest(fuser){
            this.store.app.service('friend-requests').remove(fuser._id);
          }

          declineFriendRequest(tuser){
            this.store.app.service('friend-requests').remove(tuser._id);
          }


       render(){
          return(
             <ScrollView style={styles.container}>
                {this.toUserList()}
                {this.fromUserList()}
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
