import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';

const ManijApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('ManijApp', () => ManijApp);
