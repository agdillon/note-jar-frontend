import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmitForm = () => {
    let { email, password } = this.state

    this.props.loginHandler({ email, password })

    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <View style={styles.container}>
      {this.props.error ? <Text style={{color: "red"}}> {this.props.error.message} </Text> : null}
        <TextInput
          style={styles.formField}
          textContentType="emailAddress"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType="email-address"
          maxLength={254}
          placeholder="Email Address"
          onSubmitEditing={this.onSubmitForm}
        />
        <TextInput
          style={styles.formField}
          textContentType="password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          placeholder="Password"
          onSubmitEditing={this.onSubmitForm}
        />
        <Button
          onPress={this.onSubmitForm}
          title="Submit"
          color="#841584"
        />
      </View>
    )
  }
}

// link to registration form screen in case they are in the wrong place

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
