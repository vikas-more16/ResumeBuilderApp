import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      ToastAndroid.show(
        'Please enter username and password',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('http://192.168.56.1:5000/api/user/login', {
        username,
        password,
      });

      await login(res.data.token);
    } catch (err) {
      ToastAndroid.show(
        err.response?.data?.message || 'Invalid credentials',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
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

      <Text style={styles.link} onPress={() => navigation.navigate('register')}>
        Create Account
      </Text>
    </View>
  );
};

export default LoginScreen;

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
