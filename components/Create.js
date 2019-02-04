import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Form, Textarea, Button } from 'native-base'
import styles from '../styles'

export default class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      type: 'text',
      tags: []
    }
  }

  // situations to handle: you're the user, you're a friend

  // tags <-- collect here via clickable buttons or tags, chips, whatever
  // const tagTypes = ['compliment', 'encouragement', 'gratitude', 'action', 'memory', 'humor']

  onSubmitForm = () => {
    let { content, type, tags } = this.state
    let formData = { content, type, tags }

    this.props.createNoteHandler(formData)

    this.setState({ content: '', tags: [] })
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <Text>Create a Note</Text>
          <Form>
            <Textarea
              rowSpan={5}
              bordered
              value={this.state.content}
              onChangeText={content => this.setState({ content })}
              onSubmitEditing={this.onSubmitForm}
              returnKeyType="send"
              style={localStyles.formField}
            />

            <Button onPress={this.onSubmitForm} title='Submit' style={[styles.button, localStyles.button]}>
              <Text uppercase={false} style={styles.buttonText}>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  formField: {
    width: 240,
    margin: 5
  },
  button: {
    width: 80,
    marginLeft: 80
  }
})
