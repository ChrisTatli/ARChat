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

const baseStyles = require('../baseStyles');

import { NavigationActions } from 'react-navigation'

@autobind @observer
export default class MainMenu extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Menu',
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });

  _showFriendList() {
    this.props.navigation.navigate('FriendList');
  }

  _showFriendSearch() {
    this.props.navigation.navigate('FriendSearch');
  }

  render() {
    const user = this.props.screenProps.store.user;

    if(!user) {
      return null;
    }

    return (
      <View style={baseStyles.container}>
        <View style={styles.topSection}>
          <Button title='Friends'
                  onPress={this._showFriendList}
                  backgroundColor='#48fdf6'
                  color={'black'}
                  buttonStyle={styles.navButton}/>
          <Button title='Search Friends'
                  onPress={this._showFriendSearch}
                  backgroundColor='#48fdf6'
                  color={'black'}
                  buttonStyle={styles.navButton}/>
          <Button title='Map'
                  onPress={() => {}} // no defined route yet, page not done
                  backgroundColor='#48fdf6'
                  color={'black'}
                  buttonStyle={styles.navButton}/>
        </View>
        <View style={styles.bottomSection}>
          <Button title='Sign Out'
                  onPress={this.props.screenProps.store.promptForLogout}
                  backgroundColor='#48fdf6'
                  color={'black'}
                  buttonStyle={styles.signoutButton}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
  signoutButton: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#777'
  },
  navButton: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#777',
    marginTop: 20,
    width: 150
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
