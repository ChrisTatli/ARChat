'use strict'
import React, {Component} from 'react';
import {
   ScrollView,
   StyleSheet,
   Text,
   View,
   Image
} from 'react-native';
import {Button} from 'react-native-elements';
import NavIcons from "../components/NavIcons";
import {NavigationActions} from 'react-navigation';

//@autobind @observer
export default class FriendRequest extends Component{
   static navigationOptions = ({navigation}) => ({
      title: "Friend Requests",
      headerLeft: NavIcons.closeButton(navigation.goBack)
   });

   constructor(props) {
      super(props);
      this.store = this.props.screenProps.store;
      this.requests = [
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

    generateFriendRequestList(requests) {
     return requests.map((request) =>
     <View key={request._id} style={{flex: 2, flexDirection: 'row', margin:5, paddingLeft:10,
       paddingRight:10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#48fdf6'}}>
       <Image source={{uri: request.avatar}} style={styles.avatar} />
       <Text style={{fontSize:18, textAlign:'left', color: '#48fdf6'}} >{request.name}</Text>
       <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
         <Button title='accept'
           onPress={() => {}}
           backgroundColor='#48fdf6'
           color={'black'}
           fontSize={10}
           buttonStyle={styles.button}
           >
         </Button>
         <Button title='decline'
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

   render(){
      return(
         <ScrollView style={styles.container}>
            {this.generateFriendRequestList(this.requests)}
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
})
