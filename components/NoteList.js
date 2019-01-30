import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

function NoteList({ notes }) {
  return (
    <View style={styles.container}>
      <Text>All Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={note => note.note_id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.content}</Text> }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18
  }
})

export default NoteList
