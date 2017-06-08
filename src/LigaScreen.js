import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native'

import { styles } from './styles'
import SimpleCell from './SimpleCell'

export default class LigaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.liga.name,
  })
  constructor(props) {
    super(props)
    const { navigate } = this.props.navigation
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          icon: require('../images/icon-table.png'),
          title: 'Resultados',
          onPress: () => {
          },
          topCell: true,
        }, {
          icon: require('../images/icon-table.png'),
          title: 'Partidos Pendientes',
          onPress: () => {
          },
        }, {
          icon: require('../images/icon-table.png'),
          title: 'Cargar Partido',
          onPress: () => {
            navigate('AddMatch')
          },
        }, {
          icon: require('../images/icon-table.png'),
          title: 'Tabla de Posiciones',
          onPress: () => {
          },
        }, {
          icon: require('../images/icon-table.png'),
          title: 'Estadísticas',
          onPress: () => {
          },
        },
      ])
    };
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
          style={{
            borderColor: '#bbbbbb',
          }}
          renderRow={(rowData) =>
            <SimpleCell rowData={ rowData } />
          }
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);