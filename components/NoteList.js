import React from 'react'
import { StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Card, CardItem, Badge } from 'native-base'
import styles from '../styles'

function NoteList({ notes, screenChangeHandler }) {
  return (
    <Container>
      <Content contentContainerStyle={[styles.contentContainer, { marginTop: '10%', width: '90%' }]}>
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
            <FlatList
              data={notes}
              keyExtractor={note => note.id.toString()}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text>{item.content}</Text>
                  </CardItem>
                  <CardItem footer>
                    {item.tag_name.map((tag, i) => tag ? <Badge key={i} style={localStyles.tag}><Text>{tag}</Text></Badge> : null)}
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
