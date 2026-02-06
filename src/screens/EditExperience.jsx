import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentResume } from '../redux/actions/resume.actions';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const EditExperience = ({ route, navigation }) => {
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
        Alert.alert('Error', 'Failed to load experience');
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

  const experience = resume.experience || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Experience</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ExperienceForm', {
              resumeId,
              mode: 'add',
            })
          }
        >
          <Icon name="add" size={26} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {experience.length === 0 ? (
        <Text style={styles.empty}>No experience added yet</Text>
      ) : (
        <FlatList
          data={experience}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ExperienceForm', {
                  resumeId,
                  mode: 'edit',
                  index,
                })
              }
            >
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.company}>
                {item.company} • {item.employmentType}
              </Text>
              <Text style={styles.location}>
                {[item.city, item.country].filter(Boolean).join(', ')}
              </Text>
              <Text style={styles.duration}>
                {item.startDate ? new Date(item.startDate).getFullYear() : ''}
                {item.endDate
                  ? ` - ${new Date(item.endDate).getFullYear()}`
                  : ''}
              </Text>
              {item.description ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EditExperience;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: { fontSize: 18, fontWeight: '600' },

  empty: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 40,
  },

  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  jobTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },

  company: { fontSize: 13, color: '#2563eb', marginTop: 4 },

  location: { fontSize: 12, color: '#374151', marginTop: 4 },

  duration: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  description: { fontSize: 12, color: '#4b5563', marginTop: 6 },
});
