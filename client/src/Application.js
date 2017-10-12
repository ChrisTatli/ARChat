import React, {Component} from 'react';
import {View, ToolbarAndroid, StyleSheet} from 'react-native';
import {autobind} from 'core-decorators';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react/native';
import {StackNavigator,TabNavigator} from 'react-navigation';

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
        MainMenu,
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
  FriendRequest: {screen: FriendRequest},
  FriendSearch: {screen: FriendSearch},
  MainMenu: {screen: MainMenu},
  MeetView: {screen: MeetView},
  //XRay: {screen: XRay},
}, {mode: 'modal'});

const TabNav = TabNavigator({
   Chat: {screen: Chat},
   FriendList: {screen: FriendList},
   MeetView: {screen: MeetView},
   Requests: {screen: FriendRequest},
   Settings: {screen: Settings},
}, {
   tabBarPosition : 'bottom',
   animationEnabled: true,
   tabBarOptions: {
      inactiveTintColor: '#5c626d',
      activeTintColor: '#000',
      showIcon: true,
      upperCaseLabel: false,
      indicatorStyle: {
         backgroundColor: '#615d6c',
      },
      labelStyle: {
         fontSize: 11,
      },
      tabStyle: {
        flex: 1,
      },
      style: {
         backgroundColor:'#89bbfe',
         height: 60,
      }
   },

});

@autobind @observer
export default class Application extends Component {
  constructor(props) {
    super(props);
    this.store = new Store();
  }

  render() {
    return (
      <View style={{flex: 1}}>
         {this.store.isAuthenticated ?
            <ToolbarAndroid
               screenProps={{store: this.store}}
               title = 'ARChat'
               style = {styles.toolbar}
               titleColor = 'black'
            /> : null}
         {this.store.isAuthenticated ? <TabNav screenProps={{store: this.store}}/> :
          <UnauthenticatedNavigator screenProps={{store: this.store}}/>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
   toolbar: {
        height: 56,
        backgroundColor: '#89bbfe',
    },
})
