import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  button: {
    backgroundColor: 'powderblue'
  },
  buttonText: {
    color: 'black',
    fontSize: 17
  },
  card: {
    width: '90%'
  },
  cardItemAuthor: {
    fontWeight: 'normal',
    marginBottom: '-1%',
    marginTop: '-7%'
  },
  cardItemBody: {
    width: '100%'
  },
  cardText: {
    width: '100%',
    fontSize: 18
  },
  container: {
    backgroundColor: 'transparent'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tag: {
    backgroundColor: 'cadetblue',
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    marginTop: '-4%'
  },
  tagButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tagButtonSelected: {
    backgroundColor: 'cadetblue',
    margin: 2
  },
  tagButtonUnselected: {
    backgroundColor: 'white',
    margin: 2
  },
  titleText: {
    fontSize: 20,
    letterSpacing: 1,
    marginBottom: 5
  }
})
