import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Form, Item, Input, Button } from 'native-base'
import styles from '../styles'

export default class Friend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      author: ''
    }
  }

  onSubmitForm = () => {
    let { code, author } = this.state
    let formData = { code, author }

    // do i just need to pass these two values up to app state?
    // and then send them in fetch request when posting note
    this.props.friendSubmitHandler(formData)
    this.props.screenChangeHandler('Create')

    this.setState({ code: '', author: '' })
  }

  // friend logs in on this screen with the friend code and their name (author)
  // then they'll be taken to create component
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
        <Text>Write a Note for a Friend</Text>

        {this.props.error ? <Text style={{ color: "red" }}> {this.props.error.message} </Text> : null}

        <Form>
          <Item regular style={localStyles.formField}>
            <Input
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
              onSubmitEditing={this.onSubmitForm}
              maxLength={7}
              placeholder="Friend code"
              returnKeyType="send"
              autoCapitalize="none"
            />
          </Item>

          <Item regular style={[localStyles.formField, { marginTop: 0 }]}>
            <Input
              value={this.state.author}
              onChangeText={author => this.setState({ author })}
              onSubmitEditing={this.onSubmitForm}
              placeholder="Your name"
              returnKeyType="send"
            />
          </Item>

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
    height: 40,
    width: 240,
    margin: 5
  },
  button: {
    width: 80,
    marginLeft: 80
  }
})
