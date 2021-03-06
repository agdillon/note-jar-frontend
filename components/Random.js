import React from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function Random({ notes, screenChangeHandler }) {
  const randomNote = notes[Math.floor(Math.random() * notes.length)]

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text style={styles.titleText}>Random Note</Text>
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
            <Card style={styles.card}>
              <CardItem body style={styles.cardItemBody}>
                <Text style={styles.cardText}>
                  {randomNote.content}
                </Text>
              </CardItem>
              {randomNote.author
                ? (
                  <CardItem>
                    <Text style={styles.cardItemAuthor}>
                      Author: {randomNote.author}
                    </Text>
                  </CardItem>
                )
                : null
              }
              {randomNote.tag_name.length > 0
                ? <CardItem>
                  {randomNote.tag_name.map((tag, i) => <Badge key={i} style={styles.tag}><Text>{tag}</Text></Badge>)}
                </CardItem>
                : null}
            </Card>
          )}
      </Content>
    </Container>
  )
}

export default Random
