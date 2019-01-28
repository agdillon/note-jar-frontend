import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NoteList from './components/NoteList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: 1,
      notes: []
    }
  }

  async componentDidMount() {
    const response = await fetch(`http://note-jar.herokuapp.com/users/${this.state.loggedInUser}/notes`)
    const notes = await response.json()
    this.setState({ notes })
  }

  render() {
    return (
      <View style={styles.container}>
        <NoteList notes={this.state.notes} />
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
