import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  DeviceEventEmitter,
  Alert,
  Image
} from 'react-native';   
import {autobind} from 'core-decorators';
import {observer} from 'mobx-react/native';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
  
const baseStyles = require('../baseStyles');
   
import Camera from 'react-native-camera';   
import { NavigationActions } from 'react-navigation';
type Props = {
  Accelerometer: Object,
  children: any
}
import { decorator as sensors } from 'react-native-sensors';

import RNSimpleCompass from 'react-native-simple-compass';
const degree_update_rate = 3; // Number of degrees changed before the callback is triggered

@autobind @observer   
class XRay extends Component{ // no lifecycle needed   
  static navigationOptions = ({navigation}) => ({
    title: 'XRay',  
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });

  constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
  }
  
  componentDidMount() {
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      console.log('You are facing', degree);
      this.store.degree = degree;
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
  if(this.store.meetData.length == 0) {
      return;
  } else {
      return this.store.meetData.map(user => {
        if(user._id == this.store.user._id) {
          return;
        } else if(user._id == null || user.username == null 
          || user.location == null || user.avatar == null) {
              return;
          } else if(this.store.degree > 200 && this.store.degree < 300){
            return (
            <Text style={{color: '#FFF'}}>{user.avatar}</Text>
            );
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
          <Text style={{color: '#FFF'}}>Accelerometer Z: {this.store.accelerometer}</Text>
          <Text style={{color: '#FFF'}}>Degree: {this.store.degree}</Text>
        </Camera>
      </View>
    );   
  }
}

export default sensors({
  Accelerometer: {
    updateInterval: 100, // optional
  },
  Gyroscope: true,
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
  avatar: {   
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
