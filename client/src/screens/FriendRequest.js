'use strict'
import React, {Component} from 'react';
import {
   ScrollView,
   StyleSheet,
   Text,
   View,
   Button
} from 'react-native';
import NavIcons from "../components/NavIcons";
import {NavigationActions} from 'react-navigation';

//@autobind @observer
export default class FriendRequest extends Component{
   static navigationOptions = ({navigation}) => ({
      title: "Friend Requests",
      headerLeft: NavIcons.closeButton(navigation.goBack)
   });

   constructor(props){
      super(props);
      this.store = this.props.screenProps.store;
      this.requests = [
         {
            name: "Chris",
         },
         {
            name:"Marco",
         }
      ];
   }

   generateFriendRequestList(requests){
      return requests.map((request) =>
      <View style={{flex: 2, flexDirection: 'row', margin:5, paddingLeft:10, paddingRight:10}}>
        <Text style={{fontSize:20, textAlign:'left'}} >{request.name}</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            title="Accept"
            style={{padding:5}}
          />
          <Button
            title="Decline"

          />
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
      flex:1,
      flexDirection: 'column',
      paddingTop:5
   },
});
