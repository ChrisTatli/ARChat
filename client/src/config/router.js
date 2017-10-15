import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        UserDetails,
} from '../screens'

export const ChatStack = StackNavigator({
   Chat:{
      screen: Chat,
      navigationOptions: {
         title: 'Chat',
      },
   },
});

export const MeetStack = StackNavigator({
   Map:{
      screen: MeetView,
      navigationOptions: {
         title: 'Map',
      },
   },
   XRay:{
      screen: XRay,
      navigationOptions: {
         title: 'AR View',
      },
   },
});

export const FriendStack = StackNavigator({
   FriendList:{
      screen: FriendList,
      navigationOptions: {
         title: 'Friends',
      },
   },
},{
   headerMode: 'screen'
});

export const SearchStack = StackNavigator({
   FriendSearch:{
      screen: FriendSearch,
      navigationOptions: {
         header: null,
      },
   },
   UserDetails:{
      screen: UserDetails,
   }
},{
   headerMode: 'screen'
})

export const RequestTab = TabNavigator({
   FriendRequest:{
      screen: FriendRequest,
      navigationOptions: {
         tabBarLabel: 'Friend Requests'
      },
   },
   FriendSearch: {
      screen: SearchStack,
      navigationOptions: {
         tabBarLabel: 'Find Friends'
      },
   },
},{
      tabBarPosition : 'top',
      animationEnabled: true,
      tabBarOptions: {
         inactiveTintColor: '#5c626d',
         activeTintColor: '#000',
         showIcon: false,
         upperCaseLabel: false,
         indicatorStyle: {
            backgroundColor: '#615d6c',
         },
         labelStyle: {
            fontSize: 17,
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

export const Tabs = TabNavigator({
   Chat: {
      screen: ChatStack,
      navigationOptions: {
         tabBarLabel: 'Chat',
         tabBarIcon: ({tintColor, focused }) => (
           <Ionicons
              name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
              size={26}
              style={{color: tintColor}}
           />
        ),
      }
   },
   FriendList: {
      screen: FriendStack,
      navigationOptions: {
         tabBarLabel: 'Friends',
         tabBarIcon: ({tintColor, focused }) => (
           <Ionicons
             name={focused ? 'ios-people' : 'ios-people-outline'}
             size={26}
             style={{color: tintColor}}
           />
        ),
      }
   },
   MeetView: {
      screen: MeetStack,
      navigationOptions: {
         tabBarLabel: 'Meet',
         tabBarIcon: ({tintColor, focused }) => (
           <Ionicons
              name={focused ? 'ios-compass' : 'ios-compass-outline'}
              size={26}
              style={{color: tintColor}}
           />
        ),

      },
   },
   Requests: {
      screen: RequestTab,
      navigationOptions: {
         tabBarLabel: 'Requests',
         tabBarIcon: ({tintColor, focused }) => (
           <Ionicons
              name={focused ? 'ios-person-add' : 'ios-person-add-outline'}
              size={26}
              style={{color: tintColor}}
           />
        ),
     },
   },
   Settings: {
      screen: Settings,
      navigationOptions: {
         tabBarLabel: 'Settings',
         tabBarIcon: ({tintColor, focused }) => (
          <Ionicons
              name={focused ? 'ios-settings' : 'ios-settings-outline'}
              size={26}
              style={{color: tintColor}}
          />
        ),
      },
   },
},{
      tabBarPosition : 'bottom',
      lazy: true,
      animationEnabled: false,
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
            width: 80,
         },
         style: {
            backgroundColor:'#89bbfe',
            height: 60,
         }
      },
});
