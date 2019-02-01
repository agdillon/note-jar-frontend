import jwtDecode from 'jwt-decode'
import React from 'react'
import { StyleSheet, View, AsyncStorage, BackHandler } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import NoteList from './components/NoteList'
import LoginOrReg from './components/LoginOrReg'
import Dashboard from './components/Dashboard'
import About from './components/About'

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
      notes: [],
      error: null,
      screen: null
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    // check for JWT and set screen and loggedInUser
    let token

    try {
      token = await AsyncStorage.getItem('Token')
      if (token !== null) {
        let user_id = jwtDecode(token).user_id
        this.setState({ screen: DASHBOARD, loggedInUser: user_id })
      }
      else {
        this.setState({ screen: LOGIN })
      }
    }
    catch (error) {
      this.setState({ error })
    }

    // get notes
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.loggedInUser}/notes`,
        { headers: { Authorization: `Bearer ${token}` } })
      const notes = await response.json()
      this.setState({ notes, isLoading: false, error: null })
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

    let theJwt

    try {
      theJwt = jwtDecode(body.signedJwt)
    }
    catch (error) {
      this.setState({ error })
    }

    if (response.status.toString()[0] === '2') {
      try {
        await AsyncStorage.setItem('Token', body.signedJwt)
        this.setState({ screen: DASHBOARD, loggedInUser: theJwt.user_id, error: null })
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

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
        {this.state.error ? <Text style={{color: 'red'}}> {this.state.error.message} </Text> : null}

        {this.state.isLoading ?
          <Spinner color='purple' />
          : <View>
              {this.state.screen === LOGIN || this.state.screen === REGISTRATION ?
                 <LoginOrReg
                    loginOrRegHandler={this.loginOrRegHandler}
                    error={this.state.error}
                    screen={this.state.screen}
                  /> : null}
              {this.state.screen === DASHBOARD ?
                <Dashboard
                  screenChangeHandler={this.screenChangeHandler}
                  logoutHandler={this.logoutHandler}
                />
                : null}
              {this.state.screen === NOTE_LIST ? <NoteList notes={this.state.notes} /> : null}
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
