import jwtDecode from 'jwt-decode'
import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import NoteList from './components/NoteList'
import LoginOrReg from './components/LoginOrReg'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'
const DASHBOARD = 'Dashboard'
const NOTE_LIST = 'NoteList'

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
    // check for JWT and set screen and loggedInUser
    let token

    try {
      token = await AsyncStorage.getItem('Token')
      console.log(`token ${token}`)
      if (token !== null) {
        let user_id = jwtDecode(token).user_id
        this.setState({ screen: NOTE_LIST, loggedInUser: user_id })
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
    let user_id = jwtDecode(body.signedJwt).user_id

    if (response.status.toString()[0] === '2') {
      try {
        await AsyncStorage.setItem('Token', body.signedJwt)
        this.setState({ screen: NOTE_LIST, loggedInUser: user_id, error: null })
      }
      catch (error) {
        this.setState({ error })
      }
    }
    else {
      this.setState({ error: body })
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
        {this.state.error ? <Text style={{color: "red"}}> {this.state.error.message} </Text> : null}

        {this.state.isLoading ?
          <Spinner color='purple' />
          : <View>
              {this.state.screen === NOTE_LIST ? <NoteList notes={this.state.notes} /> : null}
              {this.state.screen === LOGIN || this.state.screen === REGISTRATION ?
                 <LoginOrReg
                    loginOrRegHandler={this.loginOrRegHandler}
                    error={this.state.error}
                    screen={this.state.screen}
                  /> : null}
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
