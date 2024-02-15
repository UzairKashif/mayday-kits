// src/styles.js
import { StyleSheet } from 'react-native';
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>

</head>

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#FFECD1',
    fontSize: 40,
    fontWeight: 'bold', 
    marginBottom: 20,
    marginTop: -100,
    textAlign: 'center',
},
input: {
  fontFamily: 'Poppins-Regular',
  fontSize:14,
  backgroundColor: '#FFECD1',
  color: '#370617',
  borderRadius: 5, 
  paddingHorizontal: 10,
  paddingVertical: 5,
  
},
loginbutton: {
  backgroundColor: '#370617',
  borderRadius: 5,
  marginLeft: 30,
  marginRight: 30,
  paddingVertical: 10,
  justifyContent: 'center', // Center the text inside the button
  alignItems: 'center', // Center the text horizontally
},
buttonText: {
  color: 'white',
  fontFamily: 'Poppins-Bold',
  // Add font styling here
},
signupbutton: {
  //borderRadius: 10,
  marginLeft: 30,
  marginRight: 30,
  paddingVertical: 10,
  justifyContent: 'center', // Center the text inside the button
  alignItems: 'center', // Center the text horizontally
},
signupbuttontext: {
  fontSize:14,
  color: 'white',
  fontFamily: 'Poppins-Regular',
  // Add font styling here
},

inputContainer: {
  borderBottomWidth: 0, // This is for iOS and for the container in react-native-elements
  borderBottomColor: 'transparent', // Also set the color to transparent
},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  map: {
    flex: 1,
  },
});
