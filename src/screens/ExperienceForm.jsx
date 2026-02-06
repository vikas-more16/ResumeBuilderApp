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
import { updateExperience } from '../redux/actions/resume.actions';
import { Picker } from '@react-native-picker/picker';

const EMPLOYMENT_TYPES = [
  { label: 'Select Employment Type', value: '' },
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelance', value: 'freelance' },
];

const ExperienceForm = ({ route, navigation }) => {
  const { resumeId, mode = 'add', index } = route.params || {};
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [form, setForm] = useState({
    jobTitle: '',
    employmentType: '',
    company: '',
    city: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  // Prefill on edit
  useEffect(() => {
    if (mode === 'edit' && resume?.experience?.[index]) {
      const exp = resume.experience[index];
      setForm({
        jobTitle: exp.jobTitle || '',
        employmentType: exp.employmentType || '',
        company: exp.company || '',
        city: exp.city || '',
        country: exp.country || '',
        startDate: exp.startDate
          ? new Date(exp.startDate).getFullYear().toString()
          : '',
        endDate: exp.endDate
          ? new Date(exp.endDate).getFullYear().toString()
          : '',
        description: exp.description || '',
      });
    }
  }, [mode, index, resume]);

  const handleSave = () => {
    if (!resume?._id) return;

    const existing = Array.isArray(resume.experience) ? resume.experience : [];

    const newExperience = {
      jobTitle: form.jobTitle,
      employmentType: form.employmentType,
      company: form.company,
      city: form.city,
      country: form.country,
      startDate: form.startDate ? new Date(form.startDate, 0, 1) : null,
      endDate: form.endDate ? new Date(form.endDate, 0, 1) : null,
      description: form.description,
    };

    let updated;

    if (mode === 'edit') {
      updated = existing.map((item, i) => (i === index ? newExperience : item));
    } else {
      updated = [...existing, newExperience];
    }

    dispatch(updateExperience(resume._id, updated));
    navigation.goBack();
  };

  const handleDelete = () => {
    if (mode !== 'edit') return;

    const updated = resume.experience.filter((_, i) => i !== index);
    dispatch(updateExperience(resume._id, updated));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          {mode === 'edit' ? 'Edit Experience' : 'Add Experience'}
        </Text>

        <TextInput
          placeholder="Job Title"
          value={form.jobTitle}
          onChangeText={v => setForm({ ...form, jobTitle: v })}
          style={styles.input}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.employmentType}
            onValueChange={value => setForm({ ...form, employmentType: value })}
          >
            {EMPLOYMENT_TYPES.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          placeholder="Company"
          value={form.company}
          onChangeText={v => setForm({ ...form, company: v })}
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

        <TextInput
          placeholder="Description"
          value={form.description}
          onChangeText={v => setForm({ ...form, description: v })}
          style={[styles.input, styles.textarea]}
          multiline
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

export default ExperienceForm;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 14,
  },

  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },

  saveBtn: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  deleteBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  deleteText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  pickerWrapper: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  pickerWrapper: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
});
