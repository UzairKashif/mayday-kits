// src/screens/LoginScreen.js
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import { TouchableOpacity } from 'react-native';


const LoginScreen = ({ navigation }) => (
  <ImageBackground source={require('../assets/images/loginbackground.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mayday.ai</Text>
      <Input 
        placeholder="Email" 
        placeholderTextColor="#370617" 
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent" // This is for Android's native TextInput component
      />
      <Input 
        placeholder="Password" 
        placeholderTextColor="#370617" 
        secureTextEntry style={styles.input}
        inputContainerStyle={styles.inputContainer}
        underlineColorAndroid="transparent" 
      />
      <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupbutton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupbuttontext}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default LoginScreen;
