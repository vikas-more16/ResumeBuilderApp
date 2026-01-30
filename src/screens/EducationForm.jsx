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
import { Picker } from '@react-native-picker/picker';

const SCORE_TYPES = [
  { label: 'Select Score Type', value: '' },
  { label: 'Percentage', value: 'percentage' },
  { label: 'CGPA', value: 'cgpa' },
  { label: 'Grade', value: 'grade' },
  { label: 'Other', value: 'other' },
];

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

        <TextInput
          placeholder="Program"
          value={form.program}
          onChangeText={v => setForm({ ...form, program: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="Specialization"
          value={form.specialization}
          onChangeText={v => setForm({ ...form, specialization: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="Institute"
          value={form.institute}
          onChangeText={v => setForm({ ...form, institute: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="City"
          value={form.city}
          onChangeText={v => setForm({ ...form, city: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="Country"
          value={form.country}
          onChangeText={v => setForm({ ...form, country: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="Start Year (YYYY)"
          keyboardType="numeric"
          value={form.startDate}
          onChangeText={v => setForm({ ...form, startDate: v })}
          style={styles.input}
        />

        <TextInput
          placeholder="End Year (YYYY)"
          keyboardType="numeric"
          value={form.endDate}
          onChangeText={v => setForm({ ...form, endDate: v })}
          style={styles.input}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.scoreType}
            onValueChange={value => setForm({ ...form, scoreType: value })}
          >
            {SCORE_TYPES.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          placeholder="Score"
          value={form.score}
          onChangeText={v => setForm({ ...form, score: v })}
          style={styles.input}
        />

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

  pickerWrapper: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
});
