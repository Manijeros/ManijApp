import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

module.exports.styles = StyleSheet.create({
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
  },
  matchResult: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
  },
});
