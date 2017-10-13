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
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import Utils from '../Utils';

import SearchInput, {createFilter} from 'react-native-search-filter';

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
         <View key ={user._id} style ={styles.friendRow}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.username}> {user.username} </Text>
         </View>
      );


   }

   render(){

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={baseStyles.container}>

               <SearchInput
                  style={styles.searchBar}
                  onChangeText={(term) => {this.onChangeSearchString(term)}}
               />

               <ScrollView style={styles.containers}>
                  {this.generateUserList()}
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
   }
});
