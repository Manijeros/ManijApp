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

export default class SimpleCell extends Component {
  constructor(props) {
    super(props);
    this.state = { highlighted: false }
  }
  render() {
    const { rowData } = this.props
    return <View
      style={ styles.container }>
      <TouchableHighlight
        onPress={ rowData.onPress }
        onShowUnderlay={ () => this.setState({ highlighted: true }) }
        onHideUnderlay={ () => this.setState({ highlighted: false }) }
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#bbbbbb',
          borderBottomWidth: 0.5,
          overflow: 'hidden',
          height: 44,
          justifyContent: 'center',
          ...rowData.topCell && {
            marginTop: 10,
            borderTopWidth: 0.5
          }
        }}
        underlayColor='#2c7efc'
        activeOpacity={ 1 }>
        <View style={{
          flexDirection: 'row',
        }}>
          <Image source={ rowData.icon }
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              marginRight: 10,
            }} />
          <Text style={[{
            backgroundColor: 'transparent',
            color: '#222',
            fontSize: 17,
            textAlign: 'center',
            alignSelf: 'center',
          }, this.state.highlighted && { color: '#fff' }]}>
            {rowData.title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  }
}
