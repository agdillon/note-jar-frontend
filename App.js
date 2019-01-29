import jwtDecode from 'jwt-decode'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NoteList from './components/NoteList'
import Login from './components/Login'
import Registration from './components/Registration'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'
const NOTE_LIST = 'NoteList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
//      isLoading: true,
      loggedInUser: null,
      notes: [],
      error: null,
      screen: REGISTRATION
    }
  }

  async componentDidMount() {
    // check whether user is logged in (jwt) and set this.state.screen
    try {
      const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.loggedInUser}/notes`)
      const notes = await response.json()
      this.setState({ notes })
    }
    catch (err) {
      console.error(err)
    }
  }

  loginHandler = async (formData) => {
    let response = await fetch(`http://note-jar.herokuapp.com/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    let body = await response.json()
    console.log(body)

    if (response.status === 200) {
      // store jwt in AsyncStorage - TODO
      let user_id = jwtDecode(body.token).user_id

      this.setState({ loggedInUser: user_id, error: null })
    }
    else {
      this.setState({ error: body })
    }
  }

  regHandler = async (formData) => {
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.screen === NOTE_LIST ? <NoteList notes={this.state.notes} /> : null}
        {this.state.screen === LOGIN ?
          <Login loginHandler={this.loginHandler} error={this.state.error} />
          : null}
        {this.state.screen === REGISTRATION ?
          <Registration regHandler={this.regHandler} error={this.state.error} />
          : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
