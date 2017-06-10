import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  DatePickerAndroid,
} from 'react-native'

import { color, styles } from './styles'
import SimpleCell from './SimpleCell'

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlighted: false }
  }
  async selectDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.props.date
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(this.props.date)
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(day)
        this.props.onDateChange(date)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  render() {
    const { rowData } = this.props
    return <TouchableHighlight
      onPress={ () => {
        this.selectDate()
      }}
      onShowUnderlay={ () => this.setState({ highlighted: true }) }
      onHideUnderlay={ () => this.setState({ highlighted: false }) }
      style={ [this.props.style, {
        height: 44,
      }] }
      underlayColor={ color.highlightedCell }
      activeOpacity={ 1 }>
      <Text
        style={
          [styles.cellText, this.state.highlighted && { color: color.highlightedCellText }]
        }>{ this.props.date.toString() }</Text>
    </TouchableHighlight>
  }
}
