import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View } from 'react-native';
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import { NavigationActions } from 'react-navigation';
// import {autobind} from 'core-decorators';
// import {observable} from 'mobx';
// import {observer} from 'mobx-react/native';

// @autobind @observer
export default class FriendList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Friends',
    headerLeft: NavIcons.closeButton(navigation.goBack),
    headerRight: NavIcons.addfriendButton(navigation.navigate)
  });

 constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
    this.friends = [
      {
        _id: "59af9b954a6fb439b3950521",
        name: "Marco",
        avatar: "https://www.gravatar.com/avatar/0a9c48e5aae9e009e099bf46bca361d0?s=60&d=retro"
      },
      {
        _id: "59afaeb64a6fb439b395053a",
        name: "William",
        avatar: "https://www.gravatar.com/avatar/6340835627f09b4e97c16e78e4dc3b08?s=60&d=retro"
      }
    ];
  }

  generateFriendList(friends) {
    return friends.map((friend) =>
    <View key={friend._id} style={{flex: 2, flexDirection: 'row', margin:5, paddingLeft:10, 
      paddingRight:10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#48fdf6'}}>
      <Image source={{uri: friend.avatar}} style={styles.avatar} /> 
      <Text style={{fontSize:18, textAlign:'left', color: '#48fdf6'}} >{friend.name}</Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title='meet'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
        <Button title='remove'
          onPress={() => {}}
          backgroundColor='#48fdf6'
          color={'black'}
          fontSize={10}
          buttonStyle={styles.button}
          >
        </Button>
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
   paddingTop: 5,
   backgroundColor: 'black'
  },
  button: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'black',
    width: 80,
    height: 30,
    marginRight: 0
  },
  avatar: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 10
  }
});
