import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { styles } from './styles'
import SimpleCell from './SimpleCell'

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlighted: false }
  }
  render() {
    const { rowData } = this.props
    return <View
      style={ this.props.style }>
      <Text>{ this.props.date.toString() }</Text>
    </View>
  }
}
