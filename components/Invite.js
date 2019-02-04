import React from 'react'
import { StyleSheet, Clipboard, View } from 'react-native'
import { Container, Content, Text, Item, Input, Button, Icon } from 'native-base'
import styles from '../styles'

function Invite({ code }) {
  return (
    <View style={localStyles.contentContainer}>
      <Text style={{ marginTop: 10 }}>
        This is your friend code.  Copy and paste it to your friends so they can write you notes too!
      </Text>

      <View style={localStyles.codeContainer}>
        <Item regular style={{ height: 50, width: 205 }}>
          <Input editable={false} value={code} />
        </Item>

        <Button
          onPress={() => { Clipboard.setString(code) }}
          title='Copy to clipboard'
          style={[styles.button, { height: 50, width: 45 }]}
          iconLeft
        >
          <Icon type='FontAwesome' name='copy' style={[styles.buttonText, { fontSize: 24, marginLeft: 10 }]} />
        </Button>
      </View>
    </View>
  )
}

export default Invite

const localStyles = StyleSheet.create({
  contentContainer: {
    width: 250
  },
  codeContainer: {
    height: 50,
    width: 250,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
