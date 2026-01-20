import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.phone || !form.password) {
      return Alert.alert('Error', 'All fields are required');
    }

    try {
      await axios.post('http://192.168.56.1:5000/api/user/register', form);

      Alert.alert('Success', 'Registered successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert(
        'Registration Failed',
        err.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={v => setForm({ ...form, username: v })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={v => setForm({ ...form, email: v })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        onChangeText={v => setForm({ ...form, phone: v })}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={v => setForm({ ...form, password: v })}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
});
