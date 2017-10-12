'use strict'
import React, {Component} from 'react';
import {
   ScrollView,
   StyleSheet,
   Text,
   View,
   Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import NavIcons from "../components/NavIcons";

import {
   NavigationActions,
} from 'react-navigation';


import Ionicons from 'react-native-vector-icons/Ionicons';

//@autobind @observer
export default class FriendRequest extends Component{


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
       paddingRight:10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#dee1e5'}}>
       <Image source={{uri: request.avatar}} style={styles.avatar} />
       <Text style={{fontSize:18, textAlign:'left', color: 'black'}} >{request.name}</Text>
       <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
         <Button title='Accept'
           onPress={() => {}}
           backgroundColor='#aee283'
           color={'black'}
           fontSize={10}
           buttonStyle={styles.button}
           >
         </Button>
         <Button title='Decline'
           onPress={() => {}}
           backgroundColor='#e87175'
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
         <View style= {{flex: 1}} >
         <ScrollView style={styles.container}>
            {this.generateFriendRequestList(this.requests)}
         </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   paddingTop: 5,
   backgroundColor: 'white'
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
