// src/screens/LoginScreen.js
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';

const LoginScreen = ({ navigation }) => (
  <ImageBackground source={require('../assets/images/bg4.webp')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Maydai.ai</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
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
