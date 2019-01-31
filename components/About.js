import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text } from 'native-base'

function About() {
  console.log('about')

  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text>About Note Jar</Text>
        <Text>
          Write notes to your future self, write notes to your loved ones.
        </Text>
        <Text>
          Fill your note jar with things that encourage you: reminders of things you are grateful for, things you like about yourself or compliments you&apos;ve received, things to do that make you happy.
        </Text>
        <Text>
          More effective than generic motivations because you know yourself and your friends
        </Text>
      </Content>
    </Container>
  )
}

export default About

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
