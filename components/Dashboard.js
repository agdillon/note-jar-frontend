import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import styles from '../styles'

function Dashboard({ screenChangeHandler, logoutHandler }) {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <Button onPress={() => screenChangeHandler('Random')} title='Get a random note' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>Get a random note</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('NoteList')} title='View all notes' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>View all notes</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('Create')} title='Create a note' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>Create a note</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('Friend')} title='Invite a friend' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>Invite a friend</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('About')} title='About this app' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>About this app</Text>
        </Button>

        <Button onPress={logoutHandler} title='Sign out' style={[styles.button, localStyles.button]}>
          <Text uppercase={false}>Sign out</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default Dashboard

const localStyles = StyleSheet.create({
  button: {
    width: 250,
    margin: 10
  }
})
