import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: 'powderblue'
  },
  buttonText: {
    color: 'black'
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
  }
})
