import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LigaScreen from './LigaScreen'
import MatchScreen from './MatchScreen'

const ManijApp = StackNavigator({
  Home: { screen: HomeScreen },
  Liga: { screen: LigaScreen },
  Match: { screen: MatchScreen },
});

AppRegistry.registerComponent('ManijApp', () => ManijApp);
