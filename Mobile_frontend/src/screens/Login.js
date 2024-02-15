// src/screens/LoginScreen.js
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';

const LoginScreen = ({ navigation }) => (
  <ImageBackground source={require('../assets/images/loginbackground.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mayday.ai</Text>
      <Input 
        placeholder="Email" 
        placeholderTextColor="#ffffff" 
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent" // This is for Android's native TextInput component

      />
      <Input 
        placeholder="Password" 
        placeholderTextColor="#ffffff" 
        secureTextEntry style={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent" 
      />
      <Button title="Login" onPress={() => navigation.navigate('Map')} />
      <Button
        title="Don't have an account? Sign Up"
        type="clear"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  </ImageBackground>
);

export default LoginScreen;
