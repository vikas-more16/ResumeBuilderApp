import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Truresume = () => {
  const [step, setStep] = useState(1);

  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
  });

  const saveResume = async () => {
    try {
      const stored = await AsyncStorage.getItem('@my_resumes');
      const resumes = stored ? JSON.parse(stored) : [];

      const newResume = {
        id: Date.now().toString(),
        title: resume.name || 'Untitled Resume',
        createdAt: new Date().toISOString().split('T')[0],
        data: resume,
      };

      resumes.push(newResume);

      await AsyncStorage.setItem('@my_resumes', JSON.stringify(resumes));
      alert('Resume saved to My Drive');
    } catch (err) {
      alert('Failed to save resume');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* ================= PREVIEW ================= */}
        <View style={styles.preview}>
          <Text style={styles.name}>{resume.name || 'Your Name'}</Text>

          <Text style={styles.subText}>
            {resume.email || 'email@example.com'} • {resume.phone || 'Phone'}
          </Text>

          <Text style={styles.subText}>{resume.location || 'Location'}</Text>

          <Text style={styles.section}>Summary</Text>
          <Text style={styles.text}>
            {resume.summary || 'Your professional summary will appear here'}
          </Text>
        </View>

        {/* ================= STEPS HEADER ================= */}
        <View style={styles.stepHeader}>
          <StepCircle active={step === 1} label="Basic" />
          <StepCircle active={step === 2} label="Summary" />
          <StepCircle active={step === 3} label="Review" />
        </View>

        {/* ================= STEP CONTENT ================= */}
        <View style={styles.builder}>
          {step === 1 && (
            <>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={resume.name}
                onChangeText={text => setResume({ ...resume, name: text })}
              />

              <TextInput
                placeholder="Email"
                style={styles.input}
                value={resume.email}
                onChangeText={text => setResume({ ...resume, email: text })}
              />

              <TextInput
                placeholder="Phone"
                style={styles.input}
                value={resume.phone}
                onChangeText={text => setResume({ ...resume, phone: text })}
              />

              <TextInput
                placeholder="Location"
                style={styles.input}
                value={resume.location}
                onChangeText={text => setResume({ ...resume, location: text })}
              />

              <TextInput
                placeholder="LinkedIn URL"
                style={styles.input}
                value={resume.linkedin}
                onChangeText={text => setResume({ ...resume, linkedin: text })}
              />

              <TextInput
                placeholder="GitHub URL"
                style={styles.input}
                value={resume.github}
                onChangeText={text => setResume({ ...resume, github: text })}
              />
            </>
          )}

          {step === 2 && (
            <TextInput
              placeholder="Professional Summary"
              style={[styles.input, { height: 120 }]}
              multiline
              value={resume.summary}
              onChangeText={text => setResume({ ...resume, summary: text })}
            />
          )}

          {step === 3 && (
            <Text style={styles.reviewText}>Review your resume.</Text>
          )}
        </View>

        {/* ================= NAV BUTTONS ================= */}
        <View style={styles.navButtons}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => setStep(step - 1)}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          )}

          {step < 3 && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setStep(step + 1)}
            >
              <Text style={{ color: '#fff' }}>Next</Text>
            </TouchableOpacity>
          )}
          {step === 3 && (
            <TouchableOpacity style={styles.primaryBtn} onPress={saveResume}>
              <Text style={{ color: '#fff' }}>Save Resume</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Truresume;

/* ================= STEP CIRCLE ================= */
const StepCircle = ({ active, label }) => (
  <View style={styles.stepItem}>
    <View
      style={[
        styles.circle,
        { backgroundColor: active ? '#2563eb' : '#d1d5db' },
      ]}
    />
    <Text style={{ fontSize: 12 }}>{label}</Text>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  content: {
    padding: 16,
  },

  preview: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    marginTop: 4,
  },

  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stepItem: {
    alignItems: 'center',
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 4,
  },

  builder: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },

  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  reviewText: {
    textAlign: 'center',
    fontSize: 14,
  },

  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  secondaryBtn: {
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
});
