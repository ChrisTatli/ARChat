'use strict';

import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import {autobind} from 'core-decorators';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import Utils from '../Utils';

@autobind @observer
export default class FriendSearch extends Component{

   static navigationOptions = ({navigation}) => ({
      title: 'Friend Search',
      headerLeft: NavIcons.closeButton(navigation.goBack)
   });

   @observable searchString = '';

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
   }

   onChangeSearchString(text){
      this.searchString = text;
   }

   render(){
      
   }




}
