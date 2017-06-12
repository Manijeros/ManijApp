import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LigaScreen from './LigaScreen'
import MatchScreen from './MatchScreen'
import PlayerSelect from './PlayerSelect'

const ManijApp = StackNavigator({
  Home: { screen: HomeScreen },
  Liga: { screen: LigaScreen },
  Match: { screen: MatchScreen },
  PlayerSelect: { screen: PlayerSelect },
});

AppRegistry.registerComponent('ManijApp', () => ManijApp);
