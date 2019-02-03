import React from 'react'
import { StyleSheet, Clipboard, View } from 'react-native'
import { Container, Content, Text, Item, Input, Button, Icon } from 'native-base'
import styles from '../styles'

function Invite({ code }) {
  return (
    <View style={localStyles.contentContainer}>
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
  )
}

export default Invite

const localStyles = StyleSheet.create({
  contentContainer: {
    height: 50,
    width: 250,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
