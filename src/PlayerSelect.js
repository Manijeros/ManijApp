import React, { Component } from 'react'
import {
  AppRegistry,
  ScrollView,
} from 'react-native'

import PlayersView from './PlayersView'

export default class PlayerSelect extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Elegir Jugadores',
  })
  constructor(props) {
    super(props)
    this.state = {
      players: [{
        name: '@ema',
        profileImage: 'http://scvsoft.com/images/people/emanuel_andrada.jpg',
      }, {
        name: '@fernandoarielsoto',
        profileImage: 'http://scvsoft.com/images/people/fernando_soto.jpg',
      }, {
        name: '@pola',
        profileImage: 'http://scvsoft.com/images/people/daniel_mule.jpg',
      }, {
        name: '@javi',
        profileImage: 'http://scvsoft.com/images/people/javier_fernandes.jpg',
      }],
      selected: this.props.navigation.state.params.selected,
    }
  }
  onSelectChange(players) {
    this.setState(ps => { return {
      ...ps,
      selected: players,
    }})
    this.props.navigation.state.params.onSelectChange(players)
  }
  render() {
    const { numberOfPlayers } = this.props.navigation.state.params
    const { players } = this.state
    return <ScrollView>
      <PlayersView
        onSelectChange={ this.onSelectChange.bind(this) }
        numberOfPlayers={ numberOfPlayers }
        players={ this.state.players }
        selected={ this.state.selected } />
    </ScrollView>
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen)
