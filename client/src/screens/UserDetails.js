import React, {Component} from 'react';
import {ScrollView,View,Alert} from 'react-native';
import {Tile, List, ListItem, Button} from 'react-native-elements';

export default class UserDetails extends Component {

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
   }

   sendFriendRequest() {
    this.store.app.service('friend-requests').create({
        f_id: this.store.user._id,
        femail: this.store.user.email,
        fusername: this.store.user.username,
        favatar: this.store.user.avatar,
        t_id: this._id,
        temail: this.email,
        tusername: this.username,
        tavatar: this.avatar,
        thasAccepted: false
    }).then(result => {
      console.log('friend request sent!');
    }).catch(error => {
      console.log('Error sending friend request');
      console.log(error);
    });
  }

  // requestSentConfirmation(){
  //   var q1 = this.store.user._id;
  //   var q2 = this._id;
  //   var passing;
  //   const query = {query: {
  //     $and: [
  //       { $and: [{f_id: q1},{t_id: q2}]},
  //       { $and: [{f_id: q2},{t_id: q1}]}
  //     ]
  //   } }
  //   this.store.app.service('friend-requests').find(query).then(response => {
  //     // let count = response.data;
  //     if(response.data != null){
  //       // Alert.alert('false', JSON.stringify(count,null,2));
  //       // passing = true;
  //       return true;
  //     }
  //     else {
  //       // Alert.alert('true', JSON.stringify(count,null,2));
  //       // passing = false;
  //       return false;
  //     }
  //     // Alert.alert('Error', JSON.stringify(count,null,2));
  //   });
  // }


   render(){
      const {avatar, username, email, _id} = this.props.navigation.state.params;
      this.username = username;
      this.email = email;
      this._id = _id;
      this.avatar = avatar;
      this.count = [];
      // Alert.alert('Error',this.passing,JSON.stringify(this.passing,null,2));
      return(
         <ScrollView style={{flex:1}}>
            <Tile
            imageSrc = {{uri: avatar}}
            featured
            title={`${username.toUpperCase()}`}
            />

            <List>
               <ListItem
                  title = "Username"
                  rightTitle = {username}
                  hideChevron
               />
               <ListItem
                  title = "Email"
                  rightTitle = {email}
                  hideChevron
               />
            </List>
            <View style={{flex:1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', paddingTop:20}}>
            <Button
               title= "Add Friend"
               icon = {{name: 'person-add',color:'black'}}
               color = "black"
               backgroundColor ="#aee283"
               onPress={() => {this.sendFriendRequest()}}
              //  disabled={ boolean  =>{this.requestSentConfirmation()}}
            />
            </View>
         </ScrollView>

      );
   }
}
