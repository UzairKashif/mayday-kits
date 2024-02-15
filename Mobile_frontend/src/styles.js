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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
},
input: {
  backgroundColor: '#370617',
  color: 'white',
  borderRadius: 10, 
  paddingHorizontal: 10,
  paddingVertical: 5,
  
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
