import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import {autobind} from 'core-decorators';
import {observer} from 'mobx-react/native';
import {Button} from 'react-native-elements';
import NavIcons from '../components/NavIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const baseStyles = require('../baseStyles');

import { NavigationActions } from 'react-navigation';

//const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = 592
const SCREEN_WIDTH = 200
const ASPECT_RATIO = 200/592
const LATITUDE_DELTA = 0.0927
const LONG_DELTA = LATITUDE_DELTA * ASPECT_RATIO


@autobind @observer
export default class MeetView extends Component {


  constructor(props) {
    super(props);

    this.store = this.props.screenProps.store;
    
    this.initialRegion = {
      latitude: -37.8136,
      longitude: 144.9631,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONG_DELTA
    };

    }

  displayUsers() {
    return this.store.meetData.map(user => {
      if(user._id != null && user.username != null 
          && user.location != null && user.avatar != null) {
        return (
          <MapView.Marker
            key={user._id}
            coordinate={user.location}
            title={user.username}
            image={{uri: user.avatar}}
          />
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={ this.initialRegion }
        >
        { this.displayUsers() }
        </MapView>
        <Button title='Cancel Meet'
          onPress={() => {this.store.cancelMeet(this.store.user.activeMeet)}}
          backgroundColor='#e87175'
          color={'black'}
          buttonStyle={styles.cancelButton}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20
  }
});
