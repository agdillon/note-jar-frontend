import React from 'react'
import { StyleSheet, View, Switch, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Text, Form, Input, Label, Button, Item } from 'native-base'

const LOGIN = 'Login'
const REGISTRATION = 'Registration'

export default class LoginOrReg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      dailyNoteOn: false,
      screen: this.props.screen
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
    if (this.state.screen === REGISTRATION) this.setState({ screen: LOGIN })
    if (this.state.screen === LOGIN) this.setState({ screen: REGISTRATION })
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <Text>
            {this.state.screen === REGISTRATION ? 'Create an account' : 'Sign in to your account'}
          </Text>

          {this.props.error ? <Text style={{color: "red"}}> {this.props.error.message} </Text> : null}

          <Form>
            <Item regular style={styles.formField}>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={this.onSubmitForm}
                textContentType="emailAddress"
                keyboardType="email-address"
                maxLength={254}
                placeholder="Email Address"
              />
            </Item>

            <Item regular style={styles.formField}>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this.onSubmitForm}
                secureTextEntry
                textContentType="password"
                placeholder="Password"
              />
            </Item>

            {/*minimum feature for daily is going to be push notification at 9 am (device time)
            when on, send to server daily_method = "push"*/}
            {this.state.screen === REGISTRATION ?
              <View style={styles.dailyNoteContainer}>
                <Label style={{ flex:1 }}>Daily Note</Label>
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
            <Button onPress={this.onSubmitForm} title='Submit' style={styles.button}>
              <Text uppercase={false}>Submit</Text>
            </Button>
          </Form>

          {/*toggle between login and registration screens*/}
          <TouchableNativeFeedback onPress={this.toggleScreen}>
            <View>
              <Text style={{ color: 'blue' }}>
                {this.state.screen === REGISTRATION ? 'Sign in to your account' : 'Create a new account'}
              </Text>
            </View>
          </TouchableNativeFeedback>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyNoteContainer: {
    height: 50,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formField: {
    height: 40,
    width: 200
  },
  button: {
    backgroundColor: 'purple'
  }
})
