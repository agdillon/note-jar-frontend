import React from 'react'
import { StyleSheet, View, Switch, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base'
import styles from '../styles'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'

export default class LoginOrReg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      dailyNoteOn: false,
      screen: this.props.screen,
      error: this.props.error
    }
  }

  onSubmitForm = () => {
    let { email, password } = this.state
    let formData = { email, password }
    let isNewUser = false

    if (this.state.screen === REGISTRATION) {
      formData.daily_method = this.state.dailyNoteOn ? 'push' : null
      isNewUser = true
    }

    this.props.loginOrRegHandler(formData, isNewUser)

    this.setState({ email: '', password: '', dailyNoteOn: false })
  }

  toggleScreen = () => {
    if (this.state.screen === REGISTRATION) this.setState({ screen: LOGIN, error: null })
    if (this.state.screen === LOGIN) this.setState({ screen: REGISTRATION, error: null })
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Content contentContainerStyle={styles.contentContainer}>
          <Text style={styles.titleText}>
            {this.state.screen === REGISTRATION ? 'Create an Account' : 'Sign in to Your Account'}
          </Text>

          {this.state.error ? <Text style={{color: 'red'}}> {this.state.error.message} </Text> : null}

          <Form>
            <Item regular style={localStyles.formField}>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={this.onSubmitForm}
                textContentType="emailAddress"
                keyboardType="email-address"
                maxLength={254}
                placeholder="Email Address"
                returnKeyType="send"
                autoCapitalize="none"
              />
            </Item>

            <Item regular style={[localStyles.formField, { marginTop: 0 }]}>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this.onSubmitForm}
                secureTextEntry
                textContentType="password"
                placeholder="Password"
                returnKeyType="send"
                autoCapitalize="none"
              />
            </Item>

            {/*minimum feature for daily is going to be push notification at 9 am (device time)
            when on, send to server daily_method = "push"*/}
            {this.state.screen === REGISTRATION ?
              <View style={localStyles.dailyNoteContainer}>
                <Label style={{ flex:3, fontSize: 16 }}>Daily push notification with a random note</Label>
                <Switch
                  value={this.state.dailyNoteOn}
                  onValueChange={dailyNoteOn => this.setState({ dailyNoteOn })}
                  style={{ flex:1 }}
                />
              </View>
              : null}

            {/*phone - add some cool JavaScript to autoformat while typing
            <Input
              style={styles.formField}
              textContentType="telephoneNumber"
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
              secureTextEntry
              placeholder="Phone number"
              onSubmitEditing={this.onSubmitForm}
            />

            daily_method
            radio button (email, text/SMS, push notification, or none)
            can use a picker if necessary

            daily_time
            time input
            */}
            <Button onPress={this.onSubmitForm} title='Submit' style={[styles.button, localStyles.button]}>
              <Text uppercase={false} style={styles.buttonText}>Submit</Text>
            </Button>
          </Form>

          {/*toggle between login and registration screens*/}
          <TouchableNativeFeedback onPress={this.toggleScreen}>
            <Text style={{ color: 'blue', margin: 10 }}>
              {this.state.screen === REGISTRATION ? 'Sign in to your account' : 'Create a new account'}
            </Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.screenChangeHandler('Friend')}>
            <Text style={{ color: 'blue', margin: 5 }}>
            Writing a note for a friend?
            </Text>
          </TouchableNativeFeedback>
        </Content>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  dailyNoteContainer: {
    height: 65,
    width: 220,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formField: {
    height: 40,
    width: 240,
    margin: 5,
    backgroundColor: 'white'
  },
  button: {
    width: 90,
    marginLeft: 70,
    marginTop: 5,
    marginBottom: 15
  }
})
