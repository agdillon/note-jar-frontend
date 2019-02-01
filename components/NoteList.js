import React from 'react'
import { StyleSheet, Text, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content } from 'native-base'

function NoteList({ notes, screenChangeHandler }) {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text>All Notes</Text>
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
              keyExtractor={note => note.note_id.toString()}
              renderItem={({ item }) => <Text style={styles.item}>{item.content}</Text>}
            />
          )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18
  }
})

export default NoteList
