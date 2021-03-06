import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import Invite from './Invite'
import styles from '../styles'

function Dashboard({ screenChangeHandler, logoutHandler, code }) {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Button onPress={() => screenChangeHandler('Random')} title='Get a random note' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>Get a random note</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('NoteList')} title='View all notes' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>View all notes</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('Create')} title='Create a note' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>Create a note</Text>
        </Button>

        <Invite code={code} />

        <Button onPress={() => screenChangeHandler('Profile')} title='Edit your profile' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>Edit your profile</Text>
        </Button>

        <Button onPress={() => screenChangeHandler('About')} title='About this app' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>About this app</Text>
        </Button>

        <Button onPress={logoutHandler} title='Sign out' style={[styles.button, localStyles.button]}>
          <Text uppercase={false} style={[styles.buttonText, localStyles.buttonText]}>Sign out</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default Dashboard

const localStyles = StyleSheet.create({
  button: {
    height: '8%',
    width: '100%',
    margin: '1%'
  },
  buttonText: {
    marginTop: 5,
    // fontSize: 18,
    // letterSpacing: 0.5
  }
})
