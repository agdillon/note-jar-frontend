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

  onSubmitForm = () => {
    let { content, type, tags } = this.state
    let formData = { content, type, tags }

    this.props.createNoteHandler(formData)

    this.setState({ content: '', tags: [] })
  }

  toggleTag(tagClicked) {
    // if this.state.tags already contains tag clicked, then remove it
    if (this.state.tags.includes(tagClicked)) {
      this.setState(prevState => {
        const tagIndex = prevState.tags.indexOf(tagClicked)
        return { tags: prevState.tags.slice(0, tagIndex).concat(prevState.tags.slice(tagIndex + 1)) }
      })
    }
    // if it doesn't contain it, add it
    else {
      this.setState(prevState => ({ tags: [...prevState.tags, tagClicked] }))
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.contentContainer}>
          <Form style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.titleText}>Create a Note</Text>
            <Textarea
              rowSpan={5}
              bordered
              value={this.state.content}
              placeholder='Write your note here'
              onChangeText={content => this.setState({ content })}
              returnKeyType="send"
              style={localStyles.formField}
            />

            {/* {this.props.tagTypes.map((tag, i) => (
                {i % 2 === 1 ? <View style={styles.tagContainer}> : null}
                <Button
                  small
                  style={this.state.tags.includes(tag) ? styles.tagButtonSelected : styles.tagButtonUnselected}
                  onPress={() => this.toggleTag(tag)}
                >
                  <Text uppercase={false}>{tag}</Text>
                </Button>
                {i % 2 === 0 ? </View> : null}
            ))} */}

            <View style={[styles.tagButtonContainer, { marginTop: 5 }]}>
              <Button
                small
                style={this.state.tags.includes('encouragement') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('encouragement')}
              >
                <Text uppercase={false} style={this.state.tags.includes('encouragement') ? null : { color: 'black' }}>encouragement</Text>
              </Button>
              <Button
                small
                style={this.state.tags.includes('memory') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('memory')}
              >
                <Text uppercase={false} style={this.state.tags.includes('memory') ? null : { color: 'black' }}>memory</Text>
              </Button>
            </View>
            <View style={styles.tagButtonContainer}>
              <Button
                small
                style={this.state.tags.includes('gratitude') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('gratitude')}
              >
                <Text uppercase={false} style={this.state.tags.includes('gratitude') ? null : { color: 'black' }}>gratitude</Text>
              </Button>
              <Button
                small
                style={this.state.tags.includes('action') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('action')}
              >
                <Text uppercase={false} style={this.state.tags.includes('action') ? null : { color: 'black' }}>action</Text>
              </Button>
            </View>
            <View style={styles.tagButtonContainer}>
              <Button
                small
                style={this.state.tags.includes('compliment') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('compliment')}
              >
                <Text uppercase={false} style={this.state.tags.includes('compliment') ? null : { color: 'black' }}>compliment</Text>
              </Button>
              <Button
                small
                style={this.state.tags.includes('humor') ? styles.tagButtonSelected : styles.tagButtonUnselected}
                onPress={() => this.toggleTag('humor')}
              >
                <Text uppercase={false} style={this.state.tags.includes('humor') ? null : { color: 'black' }}>humor</Text>
              </Button>
            </View>

            <Button onPress={this.onSubmitForm} title='Submit' style={[styles.button, localStyles.submitButton]}>
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
    margin: 5,
    padding: 8,
    backgroundColor: 'white'
  },
  submitButton: {
    width: 90,
    marginLeft: 75,
    marginTop: 12
  }
})
