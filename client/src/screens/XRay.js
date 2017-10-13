import React, {Component} from 'react';   
import {     
  AppRegistry,   
  Dimensions,   
  StyleSheet,   
  Text,   
  TouchableHighlight,   
  View,   
  DeviceEventEmitter   
} from 'react-native';   
import {autobind} from 'core-decorators';   
import {observer} from 'mobx-react/native';   
import {Button} from 'react-native-elements';   
import NavIcons from '../components/NavIcons';   
import Ionicons from 'react-native-vector-icons/Ionicons';  
  
const baseStyles = require('../baseStyles');   
import {SensorManager} from 'NativeModules'; // from react-native-sensor-manager   
   
import Camera from 'react-native-camera';   
import { NavigationActions } from 'react-navigation';   
   
const mSensorManager = require('NativeModules').SensorManager;   
  
@autobind @observer   
export default class XRay extends Component{ // no lifecycle needed   
  static navigationOptions = ({navigation}) => ({  
    title: 'XRay',  
    headerLeft: NavIcons.closeButton(navigation.goBack) 
  }); 
 
  componentWillMount() {}  
 
  componentDidMount() { 
    mSensorManager.startAccelerometer(100); // To start the accelerometer with a minimum delay of 100ms between events.   
    DeviceEventEmitter.addListener('Accelerometer', function (data) {   
      /**   
      * data.x   
      * data.y   
      * data.z   
      **/   
    });   
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
          <Button title='TAKE PICTURE' 
                  onPress={this.takePicture.bind(this)}   
                  color={'black'}   
                  buttonStyle={styles.capture}/>  
        </Camera>   
      </View>   
    );   
  }   
   
  takePicture() {   
    const options = {};   
    //options.location = ...   
    this.camera.capture({metadata: options})   
      .then((data) => console.log(data))   
      .catch(err => console.error(err));   
  }   
} 
 
//mSensorManager.stopAccelerometer();  
 
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
  },   
  bottomSection: {   
    flex: 1,   
    position: 'absolute',   
    justifyContent: 'center',   
    alignItems: 'center',   
    left: 0,   
    right: 0,   
    bottom: 15,   
  },   
  topSection: {   
    flex: 1,   
    justifyContent: 'center',   
    alignItems: 'center',   
    position: 'absolute',   
    left: 0,   
    right: 0,   
    top: 0,   
    bottom: 140   
  },  
  capture: {  
    flex: 1,  
    position: 'absolute',  
    justifyContent: 'center',   
    alignItems: 'center',  
    bottom: 25,  
    borderRadius: 20,   
    borderWidth: 0,   
    borderColor: 'black',   
    backgroundColor: '#89bbfe'  
  }  
}); 