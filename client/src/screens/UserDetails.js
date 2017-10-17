import React, {Component} from 'react';
import {ScrollView,View,Alert} from 'react-native';
import {Tile, List, ListItem, Button} from 'react-native-elements';
import {autobind} from 'core-decorators';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';

@autobind @observer
export default class UserDetails extends Component {

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
   }



  generateButtons(id,username,email,avatar){
    if(this.store.user.friendRequests.length == 0) {
        // Alert.alert('Error0');
      return this.addfriend(id,username,email,avatar);
    }

    else {
      for(let request of this.store.user.friendRequests ){
        var flag = 0;
      if(this._id == request.toUser._id
        && this.store.user._id == request.fromUser._id){
          // Alert.alert('Error');
          flag = 1;
      return this.requestsent(id,username,email,avatar);
      }
      else if (this.username == this.store.user.friends.username){
          // Alert.alert('Error1');
          flag = 1;
        return this.alreadyFriend();
      }
    }

     if (flag == 0 ){
          // Alert.alert('Error2');
        return this.addfriend(id,username,email,avatar);
      }

  }
  }

  requestsent(){
    return(
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', paddingTop:20}}>
    <Button
       title= "Request Sent"
       icon = {{name: 'person-add',color:'black'}}
       color = "black"
       backgroundColor ="#aee283"
       onPress={() => {}}
       disabled={true}
    />
    </View>
  );
  }

  addfriend(id,username,email,avatar){
    return(
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', paddingTop:20}}>
    <Button
       title= "Add Friend"
       icon = {{name: 'person-add',color:'black'}}
       color = "black"
       backgroundColor ="#aee283"
       onPress={() => {this.store.sendFriendRequest(id,username,email,avatar)}}
       />
    </View>
  );
  }

  alreadyFriend(){
    return(
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', paddingTop:20}}>
    <Button
       title= "Friend"
       icon = {{name: 'person-add',color:'black'}}
       color = "black"
       backgroundColor ="#aee283"
       onPress={() => {}}
       diabled = {true}
    />
    </View>
  );
  }


   render(){
      const {avatar, username, email, _id} = this.props.navigation.state.params;
      this.username = username;
      this.email = email;
      this._id = _id;
      this.avatar = avatar;
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
            {this.generateButtons(this._id,this.username,this.email,this.avatar)}

         </ScrollView>

      );
   }
}
