import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LigaScreen from './LigaScreen'
import AddMatchScreen from './AddMatchScreen'

const ManijApp = StackNavigator({
  Home: { screen: HomeScreen },
  Liga: { screen: LigaScreen },
  AddMatch: { screen: AddMatchScreen },
});

AppRegistry.registerComponent('ManijApp', () => ManijApp);
