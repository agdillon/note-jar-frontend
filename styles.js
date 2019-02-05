import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  button: {
    backgroundColor: 'powderblue'
  },
  buttonText: {
    color: 'black',
    fontSize: 16
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tagSelected: {
    backgroundColor: 'cadetblue',
    margin: 2
  },
  tagUnselected: {
    backgroundColor: 'white',
    margin: 2
  },
  titleText: {
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 5
  }
})
