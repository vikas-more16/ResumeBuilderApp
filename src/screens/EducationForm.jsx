import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../redux/actions/resume.actions';

const EducationForm = ({ route, navigation }) => {
  const { mode, education } = route.params || {};
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [form, setForm] = useState({
    program: '',
    specialization: '',
    institute: '',
    city: '',
    country: '',
    startDate: '',
    endDate: '',
    scoreType: '',
    score: '',
  });

  useEffect(() => {
    if (mode === 'edit' && education) {
      setForm({
        program: education.program || '',
        specialization: education.specialization || '',
        institute: education.institute || '',
        city: education.city || '',
        country: education.country || '',
        startDate: education.startDate
          ? new Date(education.startDate).getFullYear().toString()
          : '',
        endDate: education.endDate
          ? new Date(education.endDate).getFullYear().toString()
          : '',
        scoreType: education.scoreType || '',
        score: education.score || '',
      });
    }
  }, [mode, education]);

  const handleSave = () => {
    if (!resume?._id) return;

    const existingEducation = Array.isArray(resume.education)
      ? resume.education
      : [];

    const newEducation = {
      ...education,
      ...form,
      startDate: form.startDate ? new Date(form.startDate, 0, 1) : null,
      endDate: form.endDate ? new Date(form.endDate, 0, 1) : null,
    };

    let updatedEducation = [];

    if (mode === 'edit' && education?._id) {
      updatedEducation = existingEducation.map(e =>
        e._id === education._id ? newEducation : e,
      );
    } else {
      updatedEducation = [...existingEducation, newEducation];
    }

    dispatch(updateEducation(resume._id, updatedEducation));
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!resume?._id || !education?._id) return;

    const existingEducation = Array.isArray(resume.education)
      ? resume.education
      : [];

    const updatedEducation = existingEducation.filter(
      e => e._id !== education._id,
    );

    dispatch(updateEducation(resume._id, updatedEducation));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          {mode === 'edit' ? 'Edit Education' : 'Add Education'}
        </Text>

        {Object.keys(form).map(key => (
          <TextInput
            key={key}
            placeholder={key}
            value={form[key]}
            onChangeText={text => setForm(prev => ({ ...prev, [key]: text }))}
            style={styles.input}
          />
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {mode === 'edit' && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationForm;

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
  deleteBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  deleteText: { color: '#b91c1c', fontWeight: 'bold' },
});
