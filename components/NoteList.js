import React from 'react'
import { StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function NoteList({ notes, screenChangeHandler }) {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={[styles.contentContainer, localStyles.contentContainer]}>
        <Text style={[styles.titleText, { marginLeft: '-8%' }]}>All Notes</Text>
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
                  { item.author
                    ? (
                      <CardItem header>
                        <Text style={{ fontWeight: 'normal', marginBottom: '-8%', marginTop: '-1%' }}>Author: {item.author}</Text>
                      </CardItem>
                    )
                    : null
                  }
                  <CardItem body style={styles.cardItemBody}>
                    <Text style={styles.cardText}>{item.content}</Text>
                  </CardItem>
                  {item.tag_name.length > 0
                    ? (
                      <CardItem footer>
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
