import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default {
  closeButton (goBack) {
    return (
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name='close' style={styles.close}/>
      </TouchableOpacity>
    )
  },

  settingsButton (navigate) {
    return (<TouchableOpacity onPress={() => navigate('Settings')}>
        <Icon name='settings' style={styles.settings}/>
      </TouchableOpacity>
    )
  },

  menuButton (navigate) {
    return (<TouchableOpacity onPress={() => navigate('MainMenu')}>
        <Icon name='menu' style={styles.menu}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  close: {
    marginLeft: 10,
    fontSize: 28,
    color: '#000',
  },
  settings: {
    marginRight: 10,
    fontSize: 28,
    color: '#555',
  },
  menu: {
    marginLeft: 10,
    fontSize: 28,
    color: '#555',
  }
});
