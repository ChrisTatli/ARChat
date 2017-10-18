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
   
import Camera from 'react-native-camera';   
import { NavigationActions } from 'react-navigation';
type Props = {
  Accelerometer: Object,
  children: any
}
import { decorator as sensors } from 'react-native-sensors';
  
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
 
  componentWillReceiveProps() {
    if (this.props.Accelerometer) {
      this.store.accelerometer = this.props.Accelerometer.z;
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
          <Text style={{color: '#FFF'}}>Accelerometer Z: {this.store.accelerometer}</Text>
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