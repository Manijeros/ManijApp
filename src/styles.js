import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

var color = {
  cellText: '#222',
  highlightedCell: '#2c7efc',
  highlightedCellText: 'white',
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4',
    width: '100%',
  },
  cell: {
    backgroundColor: '#ffffff',
    borderColor: '#bbbbbb',
    borderBottomWidth: 0.5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cellText: {
    backgroundColor: 'transparent',
    color: color.cellText,
    fontSize: 17,
    marginLeft: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  topCell: {
    marginTop: 10,
    borderTopWidth: 0.5
  },
  tableHeader: {
    fontSize: 13,
    color: '#222222',
    marginTop: 10,
    paddingLeft: 16,
    marginBottom: -5,
  },
  matchHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    color: color.cellText,
  },
  matchResult: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
  },
});

module.exports.color = color
module.exports.styles = styles
