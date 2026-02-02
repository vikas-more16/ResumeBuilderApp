import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
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
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/google.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

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
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',

    // shadow (Android + iOS)
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
