import React, {Component} from 'react';
import {ScrollView,View} from 'react-native';
import {Tile, List, ListItem, Button} from 'react-native-elements';

export default class UserDetails extends Component {

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
   }


   render(){
      const {avatar, username, email} = this.props.navigation.state.params;
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
               onPress={() => {this.store.sendFriendRequest(user)}}
            />
            </View>
         </ScrollView>

      );
   }
}
