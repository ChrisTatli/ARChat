import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  View } from 'react-native';
import NavIcons from '../components/NavIcons';
import { NavigationActions } from 'react-navigation';
// import {autobind} from 'core-decorators';
// import {observable} from 'mobx';
// import {observer} from 'mobx-react/native';

// @autobind @observer
export default class FriendList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Friends',
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });

 constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
    this.friends = [
      {
        name: "Marco",
      },
      {
        name: "Saksham",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Michael",
      },
      {
        name: "Sandesh",
      }
    ];
  }

  generateFriendList(friends) {
    return friends.map((friend) =>
    <View style={{flex: 2, flexDirection: 'row', margin:5, paddingLeft:10, paddingRight:10}}>
      <Text style={{fontSize:20, textAlign:'left'}} >{friend.name}</Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          title="Meet"
          style={{padding:5}}
        />
        <Button
          title="Remove"

        />
      </View>
    </View>
    );
  }

  render() {
    return (
        <ScrollView style={styles.container}>
          {this.generateFriendList(this.friends)}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   paddingTop: 5
  },
});
