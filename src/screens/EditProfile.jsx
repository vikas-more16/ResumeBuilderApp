import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentResume } from '../redux/actions/resume.actions';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const EditProfile = ({ route, navigation }) => {
  const { resumeId } = route.params;
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        dispatch(setCurrentResume(res.data.resume));
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, dispatch]);

  if (loading || !resume) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  const p = resume.personalInfo || {};
  const previewPhoto = p.photo;

  const hasProfileDetails = () => {
    const fields = [
      p.firstName,
      p.lastName,
      p.jobTitle,
      p.email,
      p.phone,
      p.city,
      p.country,
      p.summary,
    ];

    return fields.some(
      value => typeof value === 'string' && value.trim() !== '',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* EMPTY STATE */}
      {!hasProfileDetails() ? (
        <View style={styles.emptyState}>
          {previewPhoto && (
            <Image source={{ uri: previewPhoto }} style={styles.photo} />
          )}

          <Text style={styles.emptyTitle}>No profile details yet</Text>
          <Text style={styles.emptyText}>
            Add your personal information to complete your profile.
          </Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('ProfileForm', { mode: 'add' })}
          >
            <Text style={styles.addBtnText}>Add Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* PROFILE CARD */
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileForm', { mode: 'edit' })}
        >
          <View style={styles.card}>
            {previewPhoto && (
              <Image source={{ uri: previewPhoto }} style={styles.photo} />
            )}

            <Text style={styles.name}>
              {p.firstName} {p.lastName}
            </Text>

            <Text style={styles.job}>{p.jobTitle}</Text>

            <Text style={styles.text}>{p.email}</Text>
            <Text style={styles.text}>{p.phone}</Text>

            <Text style={styles.text}>
              {[p.city, p.country].filter(Boolean).join(', ')}
            </Text>

            {p.summary ? <Text style={styles.summary}>{p.summary}</Text> : null}
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  /* EMPTY STATE */
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    color: '#111827',
  },

  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  addBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  addBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  /* PROFILE CARD */
  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
  },

  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  job: {
    fontSize: 14,
    color: '#2563eb',
    textAlign: 'center',
    marginTop: 4,
  },

  text: {
    fontSize: 13,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },

  summary: {
    marginTop: 8,
    fontSize: 13,
    color: '#4b5563',
    textAlign: 'center',
  },
});
