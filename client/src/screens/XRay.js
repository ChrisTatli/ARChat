import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';   
import {autobind} from 'core-decorators';
import {observer} from 'mobx-react/native';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from '../Utils';

const baseStyles = require('../baseStyles');
   
import Camera from 'react-native-camera';   
import { NavigationActions } from 'react-navigation';
type Props = {
  Accelerometer: Object,
  children: any
}
import { decorator as sensors } from 'react-native-sensors';
import RNSimpleCompass from 'react-native-simple-compass';
const DEGREE_UPDATE_RATE = 3; // Number of degrees changed before the callback is triggered, for RNSimpleCompass
const MAX_DIST_BETWEEN_USERS = 500; // Limit maximum distnace between two users in meters
@autobind @observer   
class XRay extends Component{ // no lifecycle needed   
  static navigationOptions = ({navigation}) => ({
    title: 'XRay',  
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });

  constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
    this.state = {
      degree: null,
      distanceBetweenUsers: null,
      usernameMeet: null
    }
  }
  
  componentDidMount() {
    RNSimpleCompass.start(DEGREE_UPDATE_RATE, (degree) => {
      console.log('You are facing', degree);
      //this.store.degree = degree;
      this.state.degree = degree;
    });
  }

  componentWillUnmount() {
    RNSimpleCompass.stop();
  }

  componentWillReceiveProps() {
    if (this.props.Accelerometer) {
      this.store.accelerometer = this.props.Accelerometer.z;
    }
  }

  displayUsers() {
    if(this.store.meetData.length != 0) {
      return this.store.meetData.map(user => {
        if(user._id != this.store.user._id) { 
          if(user._id != null && user.username != null 
             && user.location != null || user.avatar != null) {
               this.state.usernameMeet = user.username;
               this.state.distBetweenUsers = parseFloat(Utils.calculateDistance(this.store.user.location, user.location));
              if (this.distBetweenUsers <= MAX_DIST_BETWEEN_USERS) {
                if(this.state.degree < parseFloat(Utils.calculateBearing(this.store.user.location, user.location)) + 10
                   && this.state.degree > parseFloat(Utils.calculateBearing(this.store.user.location, user.location) - 10)) {
                  // Alert.alert('Looking at user', JSON.stringify(user.avatar, null, 2));
                  return (
                    // TODO: Render image size in accordance to distance, not sure how that'll work though
                    <Image source={{uri: user.avatar}}
                           style={styles.defaultAvatar}/>
                  );
                } else {
                  return (
                    <Image source={{uri: user.avatar}}
                           style={{opacity: 0}}/>
                  );
                }
              }
          }
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>   
        <Camera
          ref={(cam) => {
            this.camera = cam;   
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          {this.displayUsers()}
          <Text style={{color: '#FFF'}}>{this.state.usernameMeet}</Text>
          <Text style={{color: '#FFF'}}>Distance Away: {this.state.distBetweenUsers}m</Text>
          <Text style={{color: '#FFF'}}>Accelerometer Z: {this.store.accelerometer}</Text>
          <Text style={{color: '#FFF'}}>Degree: {this.state.degree}</Text>
        </Camera>
      </View>
    );   
  }
}

export default sensors({
  Accelerometer: {
    updateInterval: 100, // optional
  },
  Gyroscope: false,
})(XRay);
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  defaultAvatar: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
