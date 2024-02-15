// src/screens/SignupScreen.js
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';

const SignupScreen = () => (
  <ImageBackground source={require('../assets/images/bg.webp')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Input placeholder="Confirm Password" secureTextEntry />
      <Button title="Signup" onPress={() => alert('Signup pressed')} />
    </View>
  </ImageBackground>
);

export default SignupScreen;
