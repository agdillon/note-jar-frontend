import React from 'react'
import { StyleSheet, Text, FlatList, TouchableNativeFeedback } from 'react-native'
import { Container, Content } from 'native-base'
import styles from '../styles'

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
              keyExtractor={note => note.id.toString()}
              renderItem={({ item }) => <Text style={localStyles.item}>{item.content}</Text>}
            />
          )}
      </Content>
    </Container>
  )
}

const localStyles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18
  }
})

export default NoteList
