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
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCurrentResume,
  updatePersonalInfo,
} from '../redux/actions/resume.actions';

const Truresume = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const resume = useSelector(state => state.resume.currentResume);
  const loading = useSelector(state => state.resume.loading);

  const personal = resume.personalInfo || {};

  /* ================= HANDLERS ================= */

  const updateField = (field, value) => {
    dispatch(
      updateCurrentResume({
        personalInfo: {
          ...personal,
          [field]: value,
        },
      }),
    );
  };

  const savePersonalInfo = () => {
    if (!resume._id) return;

    dispatch(updatePersonalInfo(resume._id, personal));
  };

  /* ================= RENDER ================= */

  const fullName = `${personal.firstName || ''} ${
    personal.lastName || ''
  }`.trim();
  const location = [personal.city, personal.country].filter(Boolean).join(', ');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* ================= PREVIEW ================= */}
        <View style={styles.preview}>
          <Text style={styles.name}>{fullName || 'Your Name'}</Text>

          <Text style={styles.subText}>
            {personal.email || 'email@example.com'}
            {personal.phone ? ` • ${personal.phone}` : ''}
          </Text>

          {location ? <Text style={styles.subText}>{location}</Text> : null}

          {personal.summary ? (
            <>
              <Text style={styles.section}>Summary</Text>
              <Text style={styles.text}>{personal.summary}</Text>
            </>
          ) : null}
        </View>

        {/* ================= STEPS ================= */}
        <View style={styles.stepHeader}>
          <StepCircle active={step === 1} label="Basic" />
          <StepCircle active={step === 2} label="Summary" />
          <StepCircle active={step === 3} label="Review" />
        </View>

        {/* ================= FORM ================= */}
        <View style={styles.builder}>
          {step === 1 && (
            <>
              <TextInput
                placeholder="First Name"
                style={styles.input}
                value={personal.firstName}
                onChangeText={text => updateField('firstName', text)}
              />

              <TextInput
                placeholder="Last Name"
                style={styles.input}
                value={personal.lastName}
                onChangeText={text => updateField('lastName', text)}
              />

              <TextInput
                placeholder="Job Title"
                style={styles.input}
                value={personal.jobTitle}
                onChangeText={text => updateField('jobTitle', text)}
              />

              <TextInput
                placeholder="Email"
                style={styles.input}
                value={personal.email}
                onChangeText={text => updateField('email', text)}
              />

              <TextInput
                placeholder="Phone"
                style={styles.input}
                value={personal.phone}
                onChangeText={text => updateField('phone', text)}
              />

              <TextInput
                placeholder="City"
                style={styles.input}
                value={personal.city}
                onChangeText={text => updateField('city', text)}
              />

              <TextInput
                placeholder="Country"
                style={styles.input}
                value={personal.country}
                onChangeText={text => updateField('country', text)}
              />
            </>
          )}

          {step === 2 && (
            <TextInput
              placeholder="Professional Summary"
              style={[styles.input, { height: 120 }]}
              multiline
              value={personal.summary}
              onChangeText={text => updateField('summary', text)}
            />
          )}

          {step === 3 && (
            <Text style={styles.reviewText}>
              Review your resume. Your changes are saved automatically.
            </Text>
          )}
        </View>

        {/* ================= NAV ================= */}
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
              onPress={() => {
                savePersonalInfo();
                setStep(step + 1);
              }}
            >
              <Text style={{ color: '#fff' }}>Next</Text>
            </TouchableOpacity>
          )}

          {step === 3 && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => {
                savePersonalInfo();
                navigation.goBack();
              }}
              disabled={loading}
            >
              <Text style={{ color: '#fff' }}>
                {loading ? 'Saving...' : 'Done'}
              </Text>
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
    color: '#111827',
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
    color: '#374151',
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
