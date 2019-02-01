import jwtDecode from 'jwt-decode'
import React from 'react'
import { AppLoading } from 'expo'
import { Container, Content, Text } from 'native-base'
import { StyleSheet, View, AsyncStorage, BackHandler } from 'react-native'
import NoteList from './components/NoteList'
import LoginOrReg from './components/LoginOrReg'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Random from './components/Random'
import Create from './components/Create'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'
const DASHBOARD = 'Dashboard'
const RANDOM = 'Random'
const NOTE_LIST = 'NoteList'
const CREATE = 'Create'
const FRIEND = 'Friend'
const ABOUT = 'About'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      loggedInUser: null,
      token: null,
      notes: [],
      error: null,
      screen: null
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    })

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    // check for JWT and set screen and loggedInUser
    try {
      let token = await AsyncStorage.getItem('Token')
      if (token !== null) {
        let user_id = jwtDecode(token).user_id
        this.setState({ screen: DASHBOARD, loggedInUser: user_id, token, isLoading: false })
        this.getNotes()
      }
      else {
        this.setState({ screen: LOGIN, isLoading: false })
      }
    }
    catch (error) {
      this.setState({ error })
    }
  }

  handleBackPress = () => {
    if (![DASHBOARD, LOGIN, REGISTRATION].includes(this.state.screen)) {
      this.setState({ screen: DASHBOARD })
      return true
    }
    else return false
  }

  loginOrRegHandler = async (formData, isNewUser) => {
    let route = isNewUser ? 'register' : 'login'

    let response = await fetch(`http://note-jar.herokuapp.com/auth/${route}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    let body = await response.json()

    if (response.status.toString()[0] === '2') {
      try {
        let jwtData = jwtDecode(body.signedJwt)
        await AsyncStorage.setItem('Token', body.signedJwt)
        this.setState({ screen: DASHBOARD, loggedInUser: jwtData.user_id, token: body.signedJwt, error: null })
        this.getNotes()
      }
      catch (error) {
        this.setState({ error })
      }
    }
    else {
      this.setState({ error: body })
    }
  }

  logoutHandler = async () => {
    await AsyncStorage.removeItem('Token')
    this.setState({ loggedInUser: null, notes: [], screen: LOGIN })
  }

  screenChangeHandler = (screen) => {
    this.setState({ screen })
  }

  getNotes = async () => {
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.loggedInUser}/notes`,
        { headers: { Authorization: `Bearer ${this.state.token}` } })
      const notes = await response.json()
      this.setState({ notes, error: null })
    }
    catch (error) {
      this.setState({ error })
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
        {this.state.error ? <Text style={{color: 'red'}}> {this.state.error.message} </Text> : null}

        {this.state.isLoading ?
          <AppLoading />
          : <View>
              {this.state.screen === LOGIN || this.state.screen === REGISTRATION
                ? <LoginOrReg
                    loginOrRegHandler={this.loginOrRegHandler}
                    error={this.state.error}
                    screen={this.state.screen}
                  />
                : null}
              {this.state.screen === DASHBOARD
                ? <Dashboard
                  screenChangeHandler={this.screenChangeHandler}
                  logoutHandler={this.logoutHandler}
                />
                : null}
              {this.state.screen === NOTE_LIST
                ? <NoteList
                notes={this.state.notes}
                screenChangeHandler={this.screenChangeHandler}
                />
                : null}
              {this.state.screen === CREATE ? <Create /> : null}
              {this.state.screen === RANDOM
                ? <Random
                  notes={this.state.notes}
                  screenChangeHandler={this.screenChangeHandler}
                  />
                : null}
              {this.state.screen === ABOUT ? <About /> : null}
            </View>
        }
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
