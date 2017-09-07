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

const baseStyles = require('../baseStyles');


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
      const commonInputProps = {
        style: [baseStyles.input, baseStyles.darkFont],
        underlineColorAndroid: 'transparent',
        placeholderTextColor: '#AAA',
        autoCorrect: false,
        autoCapitalize: 'none'
      };

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={baseStyles.container}>
            <View style={baseStyles.inputs}>
              <View style={baseStyles.inputContainer}>
                <TextInput
                  {...commonInputProps}
                  autoFocus={true}
                  placeholder='Search Friends'
                  returnKeyType='send'
                  value={this.searchString}
                  onChangeText={this.onChangeSearchString}
                />
              </View>
              <View style={{height: 60}}>
                <Button title='Search'
                        onPress={this.search}
                        color='#000'
                        backgroundColor='#48fdf6'
                        buttonStyle={{marginTop: 10, borderRadius: 5}}/>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
   }




}
