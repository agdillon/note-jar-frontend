import jwtDecode from 'jwt-decode'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NoteList from './components/NoteList'
import Login from './components/Login'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
//      isLoading: true,
      loggedInUser: null,
      notes: [],
      error: null
    }
  }

  async componentDidMount() {
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
      // store jwt in AsyncStorage
      let user_id = jwtDecode(body.token).user_id

      this.setState({ loggedInUser: user_id, error: null })
    }
    else {
      this.setState({ error: body })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loggedInUser ? <NoteList notes={this.state.notes} /> : null}
        <Login loginHandler={this.loginHandler} error={this.state.error} />
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
