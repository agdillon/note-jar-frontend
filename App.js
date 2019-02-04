import jwtDecode from 'jwt-decode'
import React from 'react'
import { AppLoading } from 'expo'
import { Container, Content, Text, Spinner } from 'native-base'
import { StyleSheet, View, AsyncStorage, BackHandler } from 'react-native'
import NoteList from './components/NoteList'
import LoginOrReg from './components/LoginOrReg'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Random from './components/Random'
import Create from './components/Create'
import Friend from './components/Friend'
import styles from './styles'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'
const DASHBOARD = 'Dashboard'
const RANDOM = 'Random'
const NOTE_LIST = 'NoteList'
const CREATE = 'Create'
const INVITE = 'Invite'
const FRIEND = 'Friend'
const PROFILE = 'Profile'
const ABOUT = 'About'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      initialLoading: true,
      isLoading: false,
      userId: null,
      user: null,
      code: null,
      author: null,
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

    // check for JWT and set screen, userId, user, notes
    try {
      let token = await AsyncStorage.getItem('Token')
      if (token) {
        let user_id = jwtDecode(token).user_id
        this.setState({ userId: user_id, token })
        await this.getUser()
        await this.getNotes()
        this.setState({ screen: DASHBOARD, initialLoading: false })
      }
      else {
        this.setState({ screen: LOGIN, initialLoading: false })
      }
    }
    catch (error) {
      if (error.name === 'TokenExpiredError') {
        logoutHandler()
        this.setState({ initialLoading: false })
      }
      else {
        this.setState({ error })
      }
    }
  }

  handleBackPress = () => {
    // if user is a friend (has entered friend code) and they're on Create screen,
    // back button should take them back to Friend login screen
    if (this.state.screen === CREATE && this.state.code) {
      this.setState({ screen: FRIEND, code: null, author: null })
      return true
    }
    else if (this.state.screen === FRIEND) {
      this.setState({ screen: LOGIN })
      return true
    }
    else if (![DASHBOARD, LOGIN, REGISTRATION].includes(this.state.screen)) {
      this.setState({ screen: DASHBOARD })
      return true
    }
    else return false
  }

  loginOrRegHandler = async (formData, isNewUser) => {
    this.setState({ isLoading: true })

    let route = isNewUser ? 'register' : 'login'

    let response = await fetch(`http://note-jar.herokuapp.com/auth/${route}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    let body = await response.json()

    if (response.status.toString()[0] === '2') {
      try {
        await AsyncStorage.setItem('Token', body.jwt)
        this.setState({ token: body.jwt, userId: body.user.id, user: body.user })
        await this.getNotes()
        this.setState({ screen: DASHBOARD, isLoading: false })
      }
      catch (error) {
        this.setState({ error, isLoading: false })
      }
    }
    else {
      this.setState({ error: body, isLoading: false })
    }
  }

  friendSubmitHandler = (formData) => {
    this.setState(formData)
  }

  logoutHandler = async () => {
    await AsyncStorage.removeItem('Token')
    this.setState({ userId: null, user: null, token: null, notes: [], screen: LOGIN })
  }

  screenChangeHandler = (screen) => {
    this.setState({ screen })
  }

  getNotes = async () => {
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.userId}/notes`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
          }
        })
      const notes = await response.json()
      this.setState({ notes, error: null })
    }
    catch (error) {
      this.setState({ error })
    }
  }

  getUser = async () => {
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.userId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
          }
        })
      const user = await response.json()
      this.setState({ user, error: null })
    }
    catch (error) {
      this.setState({ error })
    }
  }

  render() {
    if (this.state.initialLoading) {
      return <AppLoading />
    }
    else if (this.state.isLoading) {
      return (
        <Container>
          <Content contentContainerStyle={styles.contentContainer}>
            <Spinner color='cadetblue' />
          </Content>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <Content contentContainerStyle={styles.contentContainer}>
          {this.state.error ? <Text style={{ color: 'red' }}> {this.state.error.message} </Text> : null}
          <View>
            {this.state.screen === LOGIN || this.state.screen === REGISTRATION
              ? <LoginOrReg
                  error={this.state.error}
                  screen={this.state.screen}
                  loginOrRegHandler={this.loginOrRegHandler}
                  screenChangeHandler={this.screenChangeHandler}
                />
              : null}
            {this.state.screen === DASHBOARD
              ? <Dashboard
                code={this.state.user ? this.state.user.code : null}
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
            {this.state.screen === FRIEND
              ? <Friend
                friendSubmitHandler={this.friendSubmitHandler}
                screenChangeHandler={this.screenChangeHandler}
                />
              : null}
            {this.state.screen === ABOUT ? <About /> : null}
          </View>
          </Content>
        </Container>
      )
    }
  }
}
