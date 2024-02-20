// src/screens/SignupScreen.js
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import { TouchableOpacity } from 'react-native';

const SignupScreen = ({ navigation }) => (
  <ImageBackground source={require('../assets/images/loginbackground.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Register Now</Text>
      <Input 
        placeholder="Email" 
        placeholderTextColor="#370617" 
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent"
      />
      <Input 
        placeholder="Password" 
        secureTextEntry
        placeholderTextColor="#370617"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent"
      />
      <Input 
        placeholder="Confirm Password" 
        secureTextEntry
        placeholderTextColor="#370617"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity style={styles.loginbutton} onPress={() => alert('Signup pressed')}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default SignupScreen;
