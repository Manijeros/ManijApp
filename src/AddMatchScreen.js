import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Image,
  TouchableHighlight,
  ScrollView,
  Picker,
} from 'react-native'

import { styles } from './styles'
import SimpleCell from './SimpleCell'
import TeamSelectView from './TeamSelectView'
import DatePicker from './DatePicker'

export default class AddMatchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Cargar Partido',
  })
  constructor(props) {
    super(props)
    const { navigate } = this.props.navigation
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
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
    }
  }
  render() {
    const { navigate } = this.props.navigation
    const { players, teams, date, goals } = this.state
    return (
      <ScrollView>
        <Text style={ styles.tableHeader }>JUGADORES</Text>
        <View
          style={ [styles.cell, styles.topCell, {
            paddingLeft: 40,
            paddingRight: 40,
          }] }>
          <TeamSelectView
            rounded={ true }
            players={ players } />
        </View>
        <Text style={ styles.tableHeader }>EQUIPOS</Text>
        <View
          style={ [styles.cell, styles.topCell, {
            paddingLeft: 40,
            paddingRight: 40,
          }] }>
          <TeamSelectView
            players={ teams }
            rounded={ false }
            resizeMode={ Image.resizeMode.contain } />
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
                      [...Array(150).keys()].reverse().map(i =>
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
          onDateChange={ (newDate) => this.setState(prevState => { return {...prevState, date: newDate, prevState }}) }
          style={[
            styles.cell, styles.topCell, {
              marginBottom: 10,
          }]} />
      </ScrollView>
    )
  }
}

AppRegistry.registerComponent('AddMatch', () => AddMatchScreen);