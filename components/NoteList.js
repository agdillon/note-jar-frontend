import React from 'react'
import { StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function NoteList({ notes, screenChangeHandler }) {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={[styles.contentContainer, localStyles.contentContainer]}>
        <Text style={[styles.titleText, { marginLeft: '-8%' }]}>Your Notes</Text>
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
            <FlatList
              data={notes}
              keyExtractor={note => note.id.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <CardItem body style={styles.cardItemBody}>
                    <Text style={styles.cardText}>{item.content}</Text>
                  </CardItem>
                  {item.author
                    ? (
                      <CardItem>
                        <Text style={styles.cardItemAuthor}>
                          Author: {item.author}
                        </Text>
                      </CardItem>
                    )
                    : null
                  }
                  {item.tag_name.length > 0
                    ? (
                      <CardItem>
                        {item.tag_name.map((tag, i) => <Badge key={i} style={styles.tag}><Text>{tag}</Text></Badge>)}
                      </CardItem>
                    )
                    : null}
                </Card>
              )}
            />
          )}
      </Content>
    </Container>
  )
}

export default NoteList

const localStyles = StyleSheet.create({
  contentContainer: {
    marginTop: '12%',
    marginLeft: '2%',
    width: '104%'
  }
})
