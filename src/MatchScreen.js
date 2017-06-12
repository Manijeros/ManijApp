import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight,
  Picker,
  TextInput,
  Button,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import R from 'ramda'

import { styles } from './styles'
import SimpleCell from './SimpleCell'
import TeamSelectView from './TeamSelectView'
import DatePicker from './DatePicker'

function interlace(deinterlaced) {
  const a = deinterlaced[0], b = deinterlaced[1]
  const interlaced = []
  let i = 0
  while (i < a.length || i < b.length) {
    if (i < a.length) {
      interlaced.push(a[i])
    }
    if (i < b.length) {
      interlaced.push(b[i])
    }
    i++
  }
  return interlaced
}

function deinterlace(interlaced) {
  const a = [], b = []
  for (i in interlaced) {
    ((i % 2 == 0) ? a : b).push(interlaced[i])
  }
  return [a, b]
}

export default class MatchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Partido',
  })
  constructor(props) {
    super(props)
    const { navigation } = this.props
    const match = this.props.match || {
      players: [[], []],
      teams: [{
        name: 'Manchester United',
        profileImage: 'https://www.fifaindex.com/static/FIFA17/images/crest/256/light/11.png',
      }, {
        name: 'Juventus',
        profileImage: 'https://www.fifaindex.com/static/FIFA17/images/crest/256/light/45.png',
      }],
      date: new Date(),
      goals: [0, 0],
      notes: '',
    }
    this.state = {
      numberOfPlayers: navigation.state.params.numberOfPlayers,
      match: match,
      scrollBarDisabled: false,
      askPlayersIfRequired: true,
      askTeamsIfRequired: true,
    }
  }
  selectPlayers() {
    const { numberOfPlayers } = this.state
    this.props.navigation.navigate('PlayerSelect', {
      numberOfPlayers: numberOfPlayers,
      selected: interlace(this.state.match.players),
      onSelectChange: players => {
        this.updatePlayers(players)
      }
    })
  }
  disableScrollBar() {
    this.setState(ps => { return {...ps, scrollBarDisabled: true }})
  }
  updatePlayers(sortedPlayers) {
    this.updateMatch({
      players: deinterlace(sortedPlayers),
    }, {
      scrollBarDisabled: false,
    })
  }
  updateTeams(sortedTeams) {
    console.log(sortedTeams)
    this.updateMatch({
      teams: sortedTeams,
    }, {
      scrollBarDisabled: false,
    })
  }
  updateMatch(m, state) {
    this.setState(prevState => {
      const match = {
        ...prevState.match,
        ...(typeof(m) == 'function' ? m(prevState.match) : m)
      }
      return {
        ...prevState,
        ...state,
        match: match
      }
    })
  }
  async save() {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  render() {
    const { players, teams, date, goals } = this.state.match
    return (
      <KeyboardAwareScrollView
        scrollEnabled={ !this.state.scrollBarDisabled }>
        <Text style={ styles.tableHeader }>JUGADORES</Text>
        <View
          style={ [styles.cell, styles.topCell, {
            paddingLeft: 40,
            paddingRight: 40,
          }] }>
          <TeamSelectView
            players={ interlace(players) }
            rounded={ true }
            onDragStart={ this.disableScrollBar.bind(this) }
            onDragRelease={ this.updatePlayers.bind(this) } />
          <Button
            onPress={ this.selectPlayers.bind(this) }
            title="Elegir" />
        </View>
        <Text style={ styles.tableHeader }>EQUIPOS</Text>
        <View
          style={ [styles.cell, styles.topCell, {
            paddingLeft: 40,
            paddingRight: 40,
          }] }>
          <TeamSelectView
            players={ teams }
            resizeMode={ Image.resizeMode.contain }
            onDragStart={ this.disableScrollBar.bind(this) }
            onDragRelease={ this.updateTeams.bind(this) } />
        </View>
        <Text style={ styles.tableHeader }>RESULTADO</Text>
        <View
          style={ [styles.cell, styles.topCell, {
            paddingLeft: 40,
            paddingRight: 40,
          }] }>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={ styles.matchHeader }>Local</Text>
              <Text style={ styles.matchHeader }>Visitante</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 80,
                overflow: 'hidden',
              }}>
              {
                [0, 1].map(index =>
                  <Picker
                    key={ `goals${index}` }
                    selectedValue={ goals[index] }
                    onValueChange={ itemValue => this.updateMatch(prevMatch => {
                      var newMatch = {...prevMatch}
                      newMatch.goals[index] = itemValue
                      return newMatch
                    })}
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    {
                      R.range(0, 150).reverse().map(i =>
                        <Picker.Item key={ `goals${index}_${i}` } label={ `${i}` } value={ i } />
                      )
                    }
                  </Picker>
                )
              }
            </View>
          </View>
        </View>
        <Text style={ styles.tableHeader }>FECHA</Text>
        <DatePicker
          date={ date }
          onDateChange={ (newDate) => this.updateMatch({ date: newDate }) }
          style={[ styles.cell, styles.topCell ]} />
        <Text style={ styles.tableHeader }>NOTAS</Text>
        <View
          style={[
            styles.cell, styles.topCell, {
              marginBottom: 10,
              padding: 16,
          }]}>
          <TextInput
            placeholder='Notas'
            multiline={ true }
            onChangeText={ (text) => this.updateMatch({ notes: text }) }
            >
            <Text style={ styles.cellText }>{ this.state.notes }</Text>
          </TextInput>
        </View>
        <TouchableHighlight
          onPress={ this.save.bind(this) }
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#080',
            height: 44,
          }}
          underlayColor='#060'>
            <Text
              style={{
                alignSelf: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 17,
              }}>Guardar</Text>
          </TouchableHighlight>
      </KeyboardAwareScrollView>
    )
  }
}

AppRegistry.registerComponent('MatchScreen', () => MatchScreen)
