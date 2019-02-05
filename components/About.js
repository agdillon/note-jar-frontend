import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text } from 'native-base'
import styles from '../styles'

function About() {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Text style={styles.titleText}>About Note Jar</Text>
        <Text style={localStyles.paragraph}>
          &bull; Write notes to your future self, write notes to your loved ones.
        </Text>
        <Text style={localStyles.paragraph}>
          &bull; Fill your note jar with things that encourage you: reminders of things you are grateful for, things you like about yourself or compliments you&apos;ve received, things to do that make you happy.
        </Text>
        <Text style={localStyles.paragraph}>
          &bull; Invite your friends and family to write you notes too.
        </Text>
        <Text style={localStyles.paragraph}>
          &bull; Then get a daily notification with one of your notes, or get a random one whenever you need a boost.
        </Text>
        <Text style={localStyles.paragraph}>
          &bull; More effective than generic motivations because you know yourself and your friends.
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
