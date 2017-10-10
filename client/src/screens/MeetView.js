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
  static navigationOptions = ({navigation}) => ({
    title: 'Map',
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });



  constructor(props) {
    super(props);

    this.state = {
        latitude: -38.022037,
        longitude: 145.300863,

        markers: [{
          key: 1,
          title: 'Friend',
          description: "Distance to friend",
          coordinates: {
            latitude: -38.022037,
            longitude: 145.300863
          },
          image: require("/usr/local/house-martell-project/client/images/saksham2.png"),
          style: {
            height: 22,
            width: 22
          },
        },
        {
          key: 2,
          title: "Yourself",
          description: "This is your current location",
          coordinates: {
            latitude: -38.122046,
        	  longitude: 145.300873,
          },
          image: require("/usr/local/house-martell-project/client/images/Github image.png"),
          style: {
            height: 22,
            width: 22
          },
        }]
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          error: null,
          markers: [{
            key: 1,
            title: (Math.sqrt(111*111*(position.coords.latitude-this.state.markers[1].coordinates.latitude)*(position.coords.latitude-this.state.markers[1].coordinates.latitude)+111*111*(position.coords.longitude-this.state.markers[1].coordinates.longitude)*(position.coords.longitude-this.state.markers[1].coordinates.longitude))).toFixed(2).toString()+" km",
            description: "Distance to friend",
            coordinates: {
              latitude: -38.122046,
          	  longitude: 145.300873,
            },
            image: require("/usr/local/house-martell-project/client/images/Github image.png"),
            style: {
              height: 22,
              width: 22
            },
          },
          {
            key: 2,
            title: "Yourself",
            description: "This is your current location",
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            image: require("/usr/local/house-martell-project/client/images/saksham2.png"),
            style: {
              height: 22,
              width: 22
            },
          }]
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONG_DELTA,
          }}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.title}
              key={marker.key}
              image={marker.image}
            />
          ))}
        </MapView>
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
  }
});
