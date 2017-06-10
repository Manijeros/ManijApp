import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight,
  Picker,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import R from 'ramda'

import { styles } from './styles'
import SimpleCell from './SimpleCell'
import TeamSelectView from './TeamSelectView'
import DatePicker from './DatePicker'

export default class AddMatchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Partido',
  })
  constructor(props) {
    super(props)
    const { navigate } = this.props.navigation
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
      scrollBarDisabled: false,
    }
  }
  disableScrollBar() {
    this.setState(ps => { return {...ps, scrollBarDisabled: true }})
  }
  updatePlayers(sortedPlayers) {
    this.setState(ps => {
      return {
        ...ps,
        scrollBarDisabled: false,
        players: sortedPlayers,
      }
    })
  }
  updateTeams(sortedTeams) {
    console.log(sortedTeams)
    this.setState(ps => {
      return {
        ...ps,
        scrollBarDisabled: false,
        teams: sortedTeams,
      }
    })
  }
  async save() {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  render() {
    const { navigate } = this.props.navigation
    const { players, teams, date, goals } = this.state
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
            players={ players }
            rounded={ true }
            onDragStart={ this.disableScrollBar.bind(this) }
            onDragRelease={ this.updatePlayers.bind(this) } />
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
                    onValueChange={ itemValue => this.setState(prevState => {
                      var newState = {...prevState}
                      newState.goals[index] = itemValue
                      return newState
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
          onDateChange={ (newDate) => this.setState(prevState => { return {...prevState, date: newDate }}) }
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
            onChangeText={ (text) => this.setState(prevState => { return {...prevState, notes: text }}) }
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

AppRegistry.registerComponent('AddMatch', () => AddMatchScreen);