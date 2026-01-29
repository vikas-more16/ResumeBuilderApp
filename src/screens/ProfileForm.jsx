import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../redux/actions/resume.actions';

const ProfileForm = ({ route, navigation }) => {
  const { mode } = route.params || {};
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    summary: '',
  });

  useEffect(() => {
    if (mode === 'edit' && resume?.personalInfo) {
      setForm({ ...resume.personalInfo });
    }
  }, [mode, resume]);

  const handleSave = () => {
    if (!resume?._id) return;

    dispatch(updatePersonalInfo(resume._id, form));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          {mode === 'edit' ? 'Edit Profile' : 'Add Profile'}
        </Text>

        <TextInput
          placeholder="First Name"
          value={form.firstName}
          onChangeText={text => setForm(p => ({ ...p, firstName: text }))}
        />
        <TextInput
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={text => setForm(p => ({ ...p, lastName: text }))}
        />
        <TextInput
          placeholder="Job Title"
          value={form.jobTitle}
          onChangeText={text => setForm(p => ({ ...p, jobTitle: text }))}
        />
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={text => setForm(p => ({ ...p, email: text }))}
        />
        <TextInput
          placeholder="Phone"
          value={form.phone}
          onChangeText={text => setForm(p => ({ ...p, phone: text }))}
        />
        <TextInput
          placeholder="City"
          value={form.city}
          onChangeText={text => setForm(p => ({ ...p, city: text }))}
        />
        <TextInput
          placeholder="Country"
          value={form.country}
          onChangeText={text => setForm(p => ({ ...p, country: text }))}
        />
        <TextInput
          placeholder="Profile Summary"
          value={form.summary}
          onChangeText={text => setForm(p => ({ ...p, summary: text }))}
          multiline
          style={{ height: 100 }}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  heading: { fontSize: 18, fontWeight: '600', marginBottom: 16 },

  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveText: { color: '#fff', fontWeight: 'bold' },
});
