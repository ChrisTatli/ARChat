import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {autobind} from 'core-decorators';
import {observer} from 'mobx-react/native';
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const baseStyles = require('../baseStyles');

import { NavigationActions } from 'react-navigation'

@autobind @observer
export default class MeetView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Map',
    headerLeft: NavIcons.closeButton(navigation.goBack),
    tabBarLabel: 'Meet',
    tabBarIcon: ({tintColor, focused }) => (
      <Ionicons
         name={focused ? 'ios-compass' : 'ios-compass-outline'}
         size={26}
         style={{color: tintColor}}
      />
   ),
  });

  render() {
    return (
      <View style={baseStyles.container}>
        <View style={styles.topSection}>
        </View>
        <View style={styles.bottomSection}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 140
  }
});
