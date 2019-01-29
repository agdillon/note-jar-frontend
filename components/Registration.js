import React from 'react'
import { StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native'

export default class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      dailyNoteOn: false
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
          value={this.state.email}
          textContentType="emailAddress"
          onChangeText={email => this.setState({ email })}
          keyboardType="email-address"
          maxLength={254}
          placeholder="Email Address"
          onSubmitEditing={this.onSubmitForm}
          style={styles.formField}
        />

        <TextInput
          value={this.state.password}
          textContentType="password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry
          placeholder="Password"
          onSubmitEditing={this.onSubmitForm}
          style={styles.formField}
        />

        {/*minimum feature for daily is going to be push notification at 9 am (device time)
        when on, send to server daily_method = "push"*/}
        <Text>Daily Note</Text>
        <Switch
          value={this.state.dailyNoteOn}
          onValueChange={dailyNoteOn => this.setState({ dailyNoteOn })}
        />

        {/*phone - add some cool JavaScript to autoformat while typing
        <TextInput
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
        <Button
          onPress={this.onSubmitForm}
          title="Submit"
          color="#841584"
        />
      </View>
    )
  }
}

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
