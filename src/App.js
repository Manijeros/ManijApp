import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LigaScreen from './LigaScreen'

const ManijApp = StackNavigator({
  Home: { screen: HomeScreen },
  Liga: { screen: LigaScreen },
});

AppRegistry.registerComponent('ManijApp', () => ManijApp);
