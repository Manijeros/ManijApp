import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native';

import { styles } from './styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'ManijApp',
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          title: 'Jugadores',
          background: require('../images/jugadores.png'),
          onPress: () => {
            this.props.navigation.navigate('Home')
          }
        }, {
          title: 'Equipos',
          background: require('../images/equipos.png'),
        }, {
          title: 'Liga Manija',
          background: require('../images/ligaManija.png'),
        },
      ])
    };
  }
  _onPressButton(data) {
    return function () {
    console.log("You tapped the button!");
    console.log(data);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View 
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#dddddd',
        }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View
              style={{
                padding: 5,
              }}>
              <TouchableHighlight
                onPress={ rowData.onPress }
                style={{
                  padding: 5,
                }}
                style={{
                  borderRadius: 10,
                  borderColor: '#ffffff',
                  borderWidth: 1,
                  overflow: 'hidden',
                }}>
                <Image
                  source={ rowData.background }
                  style={{
                    width: '100%',
                    height: 125,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <Text style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontSize: 48,
                    textAlign: 'center',
                    textShadowColor: '#000',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
                  }}>
                    {rowData.title}
                  </Text>
                </Image>
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);