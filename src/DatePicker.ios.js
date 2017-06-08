import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  DatePickerIOS,
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
      <DatePickerIOS
        date={ this.props.date }
        onDateChange={ this.props.onDateChange } />
    </View>
  }
}
