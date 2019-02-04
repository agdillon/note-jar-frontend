import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text } from 'native-base'
import styles from '../styles'

function About() {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text>About Note Jar</Text>
        <Text style={localStyles.paragraph}>
          Write notes to your future self, write notes to your loved ones.
        </Text>
        <Text style={localStyles.paragraph}>
          Fill your note jar with things that encourage you: reminders of things you are grateful for, things you like about yourself or compliments you&apos;ve received, things to do that make you happy.
        </Text>
        <Text style={localStyles.paragraph}>
          Invite your friends and family to write you notes too.
        </Text>
        <Text style={localStyles.paragraph}>
          Then get a daily notification with one of your notes, or get a random one whenever you need a boost.
        </Text>
        <Text style={localStyles.paragraph}>
          More effective than generic motivations because you know yourself and your friends.
        </Text>
      </Content>
    </Container>
  )
}

export default About

const localStyles = StyleSheet.create({
  paragraph: {
    width: '80%'
  }
})
