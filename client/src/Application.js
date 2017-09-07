import React, {Component} from 'react';
import {View} from 'react-native';
import {autobind} from 'core-decorators';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {StackNavigator} from 'react-navigation';

import {Launch,
        Login,
        Signup,
        Chat,
        Settings,
        FriendList,
        FriendSearch,
        FriendRequest,
        MeetView,
        XRay,
        MainMenu

} from './screens'

import Store from './Store';

const UnauthenticatedNavigator = StackNavigator({
  Launch: {screen: Launch},
  Login: {screen: Login},
  Signup: {screen: Signup}
}, {mode: 'modal'});

const MainNavigator = StackNavigator({
  Chat: {screen: Chat},
  Settings: {screen: Settings},
  FriendList: {screen: FriendList},
  //FriendRequest: {screen: FriendRequest},
  //FriendSearch: {screen: FriendSearch},
  MainMenu: {screen: MainMenu},
  //MeetView: {screen: MeetView},
  //XRay: {screen: XRay},
}, {mode: 'modal'});

@autobind @observer
export default class Application extends Component {
  constructor(props) {
    super(props);
    this.store = new Store();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.store.isAuthenticated ? <MainNavigator screenProps={{store: this.store}}/> :
          <UnauthenticatedNavigator screenProps={{store: this.store}}/>}
      </View>
    );
  }
}
