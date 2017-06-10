import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'
import SortableGrid from 'react-native-sortable-grid'

import { styles } from './styles'

export default class TeamSelectView extends React.Component {
  constructor(props) {
    super(props);
  }
  onDragRelease(event) {
    const oldPlayers = this.props.players
    const playerMap = {}
    for (const i in oldPlayers) {
      playerMap[oldPlayers[i].name] = oldPlayers[i]
    }
    const newPlayers = []
    for  (const i in event.itemOrder) {
      const key = event.itemOrder[i].key
      newPlayers.push(playerMap[key])
    }
    this.props.onDragRelease(newPlayers)
  }
  render() {
    const { players } = this.props
    return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
      <Text style={ styles.matchHeader }>Local</Text>
      <Text style={ styles.matchHeader }>Visitante</Text>
    </View>
    <SortableGrid
      itemsPerRow={ 2 }
      onDragStart={ this.props.onDragStart }
      onDragRelease={ this.onDragRelease.bind(this) }
      style={{
      }}>
      {
        players.map( (player, index) =>
          <View key={ player.name }
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              borderRadius: this.props.rounded ? 300 : 0,
              margin: 5,
              overflow: 'hidden',
              alignSelf: 'stretch',
            }}>
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
                style={{
                  color: '#ffffff',
                  textAlign: 'center',
                  marginBottom: 25,
                  backgroundColor: '#00000066',
                  textShadowColor: 'black',
                  textShadowRadius: 1,
                  textShadowOffset: { width: 0, height: 0 },
                }}>{ player.name }</Text>
            </Image>
          </View>
        )
      }
      </SortableGrid>
    </View>
    )
  }
}
