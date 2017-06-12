import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Image,
} from 'react-native'
import SortableGrid from 'react-native-sortable-grid'

export default class Players extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rounded: true,
      selected: (this.props.selected || []).map(player => player.name),
    }
  }
  onSelectChange() {
    const map = {}
    for (i in this.props.players) {
      const player = this.props.players[i]
      map[player.name] = player
    }
    const selected = []
    for (i in this.state.selected) {
      selected.push(map[this.state.selected[i]])
    }
    this.props.onSelectChange(selected)
  }
  toggle(name) {
    this.setState(ps => {
      const state = { ...ps }
      const index = ps.selected.indexOf(name)
      if (index >= 0) {
        state.selected.splice(index, 1)
      }
      else if (state.selected.length < this.props.numberOfPlayers) {
        state.selected.push(name)
      }
      return state
    })
    this.onSelectChange()
  }
  render() {
    const { players } = this.props
    const { selected } = this.state
    return <SortableGrid ref={'SortableGrid'}
      dragActivationTreshold={ 60000 } // "disable"
      itemsPerRow={ 4 }>
      {
        players.map( (player, index) =>
          <PlayerView key={ player.name }
            player={ player }
            onTap={ () => this.toggle(player.name) }
            selected={ selected.indexOf(player.name) >= 0 }
            rounded={ this.state.rounded } />
        )
      }
    </SortableGrid>
  }
}

class PlayerView extends React.Component {
  render() {
    const { player, onTap, rounded, selected } = this.props
    return <View
      onTap={ () => { onTap(); this.setState({}) } }
      style={[{
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: rounded ? 300 : 0,
        margin: 5,
        overflow: 'hidden',
        alignSelf: 'stretch',
      }, selected && {
        borderWidth: 2,
        borderColor: '#00f',
      }]}>
      <Image
        source={{
          uri: player.profileImage,
        }}
        style={{
          flex: 1,
          justifyContent: 'flex-end',

        }}
        resizeMode={ this.props.resizeMode || Image.resizeMode.cover }>
        <Text
          numberOfLines={ 2 }
          style={{
            color: '#ffffff',
            fontSize: 10,
            textAlign: 'center',
            marginBottom: 25,
            backgroundColor: '#00000066',
            textShadowColor: 'black',
            textShadowRadius: 1,
            textShadowOffset: { width: 0, height: 0 },
          }}>{ player.name }</Text>
      </Image>
    </View>
  }
}
