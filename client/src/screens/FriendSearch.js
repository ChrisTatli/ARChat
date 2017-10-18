'use strict';

import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import {autobind} from 'core-decorators';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {Button,SearchBar} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import Utils from '../Utils';

import SearchInput, {createFilter} from 'react-native-search-filter';
import {List, ListItem} from 'react-native-elements';

const baseStyles = require('../baseStyles');
const KEYS_TO_FILTER = ['username'];


@autobind @observer
export default class FriendSearch extends Component{

   static navigationOptions = ({navigation}) => ({
      title: 'Friend Search',
      headerLeft: NavIcons.closeButton(navigation.goBack)
   });

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
      this.state =  {
         searchTerm: ''
      }
      this.store.loadUsers();
   }

   onChangeSearchString(text){
      this.setState({searchTerm: text})
   }

   _loadUsers(){
      this.store.loadUsers();
   }

   showUserDetails = (user) => {
      this.props.navigation.navigate('UserDetails', user);
   }

   generateUserList(){

      var filteredUsers = this.store.users.filter(createFilter(this.state.searchTerm,KEYS_TO_FILTER))
      if(filteredUsers.length == 0){
         return(
            <View>
               <Text> User does not exist </Text>
            </View>
         );
      }
      return filteredUsers.map((user) =>
         <ListItem
            key ={user._id}
            roundAvatar
            avatar={{uri: user.avatar }}
            title = {`${user.username}`}
            onPress = {() => this.showUserDetails(user)}
         />
      );


   }

   render(){

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style= {{flex:1}}>
            <View>
              <SearchBar
                lightTheme
                onChangeText={(term) => {this.onChangeSearchString(term)}}
              />
            </View>

            <ScrollView style={styles.containers}>
               <List>
                  {this.generateUserList()}
               </List>
            </ScrollView>

         </View>
        </TouchableWithoutFeedback>
      );
   }

}

const styles = StyleSheet.create({
   containers: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 5,
      backgroundColor: 'white',
   },
   avatar: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
      borderRadius: 50,
      marginRight: 10,
   },
   friendRow:{
      flex: 2,
      flexDirection: 'row',
      margin: 5,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
   },
   username: {
      fontSize: 18,
      textAlign: 'left',
      color: 'black',
   },
   searchBar:{
      backgroundColor: 'white',
      fontSize: 18,
      textAlign: 'left',
   },
   searchContainer:{
      backgroundColor: 'white',
      paddingLeft:10,
      paddingRight:10,

   }
});
