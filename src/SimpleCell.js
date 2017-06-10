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

import { color, styles } from './styles'

export default class SimpleCell extends Component {
  constructor(props) {
    super(props);
    this.state = { highlighted: false }
  }
  render() {
    const { rowData } = this.props
    return <View>
      <TouchableHighlight
        onPress={ rowData.onPress }
        onShowUnderlay={ () => this.setState({ highlighted: true }) }
        onHideUnderlay={ () => this.setState({ highlighted: false }) }
        style={[
          styles.cell,
          rowData.topCell && styles.topCell,
          this.props.style, {
          height: 44,
        }]}
        underlayColor={ color.highlightedCell }
        activeOpacity={ 1 }>
        <View style={{
          flexDirection: 'row',
        }}>
          {
          rowData.icon && <Image source={ rowData.icon }
            style={{
              width: 30,
              height: 30,
              marginLeft: 16,
              marginRight: -6,
            }} />
          }
          <Text style={[styles.cellText, this.state.highlighted && { color: color.highlightedCellText }]}>
            {rowData.title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  }
}
