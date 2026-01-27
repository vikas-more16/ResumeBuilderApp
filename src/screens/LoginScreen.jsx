import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  firebaseGoogleLogin,
  firebaseLogin,
  getFirebaseToken,
} from '../firebase/auth.js';
import { loginUserWithFirebase } from '../redux/actions/auth.actions';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await firebaseGoogleLogin();

      const firebaseToken = await getFirebaseToken();

      dispatch(loginUserWithFirebase(firebaseToken));
    } catch (e) {
      console.error('❌ GOOGLE LOGIN ERROR FULL:', {
        message: e?.message,
        code: e?.code,
        stack: e?.stack,
      });
    }
  };

  const handleLogin = async () => {
    try {
      await firebaseLogin(email, password);

      const firebaseToken = await getFirebaseToken();

      dispatch(loginUserWithFirebase(firebaseToken));
    } catch (e) {
      Alert.alert('Login failed', e.message);
    }
  };
  return (
    <View style={styles.container} pointerEvents="auto">
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        editable={true}
        showSoftInputOnFocus={true}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <Button title="Login with Google" onPress={handleGoogleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('register')}>
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});
