import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text } from 'native-base'

function Create() {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        {/* situations to handle: you're the user, you're a friend */}
        <Text>Create a Note</Text>
      </Content>
    </Container>
  )
}

export default Create

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
