import React from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem } from 'native-base'
import styles from '../styles'

function Random({ notes, screenChangeHandler }) {
  return (
    <Container>
      <Content contentContainerStyle={[styles.contentContainer, { width: '90%' }]}>
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
          : (
            <Card>
              <CardItem>
                <Text>
                  {notes[Math.floor(Math.random() * notes.length)].content}
                </Text>
              </CardItem>
            </Card>
          )}
      </Content>
    </Container>
  )
}

export default Random
