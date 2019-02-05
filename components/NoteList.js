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
                  <CardItem body style={styles.cardItem}>
                    <Text style={styles.cardText}>{item.content}</Text>
                  </CardItem>
                  <CardItem footer>
                    {item.tag_name.map((tag, i) => <Badge key={i} style={localStyles.tag}><Text>{tag}</Text></Badge>)}
                  </CardItem>
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
  },
  tag: {
    backgroundColor: 'cadetblue',
    margin: 2
  }
})
