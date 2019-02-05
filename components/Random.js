import React from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function Random({ notes, screenChangeHandler }) {
  const randomNote = notes[Math.floor(Math.random() * notes.length)]

  return (
    <Container>
      <Content contentContainerStyle={[styles.contentContainer, { width: '90%' }]}>
        <Text>Random Note</Text>
        {notes.length === 0
          ? (
            <Text>
              You don&apos;t have any notes yet.&nbsp;
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
                  {randomNote.content}
                </Text>
              </CardItem>
              <CardItem footer>
                {randomNote.tag_name.map((tag, i) => <Badge key={i} style={localStyles.tag}><Text>{tag}</Text></Badge>)}
              </CardItem>
            </Card>
          )}
      </Content>
    </Container>
  )
}

export default Random

const localStyles = StyleSheet.create({
  tag: {
    backgroundColor: 'cadetblue',
    margin: 2
  }
})
