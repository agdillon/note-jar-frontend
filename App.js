import jwtDecode from 'jwt-decode'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import NoteList from './components/NoteList'
import LoginOrReg from './components/LoginOrReg'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'
const NOTE_LIST = 'NoteList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      loggedInUser: null,
      notes: [],
      error: null,
      screen: REGISTRATION
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  async componentDidMount() {
    // check whether user is logged in (jwt) and set this.state.screen - TODO
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.loggedInUser}/notes`)
      const notes = await response.json()
      this.setState({ notes, isLoading: false })
    }
    catch (err) {
      console.error(err)
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

    if (response.status === 200) {
      // store jwt in AsyncStorage - TODO
      let user_id = jwtDecode(body.token).user_id

      this.setState({ loggedInUser: user_id, error: null })
    }
    else {
      this.setState({ error: body })
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
        {this.state.isLoading ?
          <Spinner color='purple' />
          : <View>
              {this.state.screen === NOTE_LIST ? <NoteList notes={this.state.notes} /> : null}
              {this.state.screen === LOGIN || this.state.screen === REGISTRATION ?
                 <LoginOrReg
                    regHandler={this.loginOrRegHandler}
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
