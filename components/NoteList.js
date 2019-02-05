import React from 'react'
import { StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function NoteList({ notes, screenChangeHandler }) {
  return (
    <Container style={{ backgroundColor: 'transparent' }}>
      <Content contentContainerStyle={[styles.contentContainer, { marginTop: '10%', width: '90%' }]}>
        <Text style={styles.titleText}>All Notes</Text>
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
                <Card>
                  <CardItem>
                    <Text>{item.content}</Text>
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
  tag: {
    backgroundColor: 'cadetblue',
    margin: 2
  }
})
