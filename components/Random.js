import React from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text } from 'native-base'
import styles from '../styles'

function Random({ notes, screenChangeHandler }) {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text>Random Note</Text>
        {notes.length === 0
          ? (
            <Text>
              You don&apos;t have any notes yet.
              <TouchableNativeFeedback onPress={() => screenChangeHandler('Create')}>
                <Text style={{ color: 'blue' }}>
                  Write one!
                </Text>
              </TouchableNativeFeedback>
            </Text>
          )
          : <Text>{notes[Math.floor(Math.random() * notes.length)].content}</Text>}
      </Content>
    </Container>
  )
}

export default Random
