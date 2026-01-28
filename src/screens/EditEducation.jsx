import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const EditEducation = ({ route, navigation }) => {
  const { resumeId } = route.params;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        setResume(res.data.resume);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!resume) return null;

  const educationList = resume.education;
  console.log(resume, educationList);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.title}>Education</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EducationForm', {
              mode: 'add',
              resumeId,
            })
          }
        >
          <Icon name="add" size={26} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* ===== LIST ===== */}
      {educationList.length === 0 ? (
        <Text style={styles.emptyText}>
          No education added yet. Tap + to add.
        </Text>
      ) : (
        <FlatList
          data={educationList}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('EducationForm', {
                  mode: 'edit',
                  education: item,
                  resumeId,
                })
              }
            >
              <View style={styles.card}>
                <Text style={styles.program}>
                  {item.program}
                  {item.specialization ? ` • ${item.specialization}` : ''}
                </Text>

                <Text style={styles.institute}>
                  {item.institute}
                  {(item.city || item.country) &&
                    ` • ${[item.city, item.country]
                      .filter(Boolean)
                      .join(', ')}`}
                </Text>

                <Text style={styles.duration}>
                  {item.startDate ? new Date(item.startDate).getFullYear() : ''}
                  {item.endDate
                    ? ` - ${new Date(item.endDate).getFullYear()}`
                    : ''}
                </Text>

                {item.score && (
                  <Text style={styles.score}>
                    {item.scoreType?.toUpperCase()} : {item.score}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EditEducation;

/* ================= STYLES ================= */

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  card: {
    backgroundColor: '#f9fafb',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  program: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  institute: {
    fontSize: 13,
    color: '#374151',
    marginTop: 4,
  },

  duration: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },

  score: {
    fontSize: 12,
    color: '#2563eb',
    marginTop: 6,
    fontWeight: '500',
  },

  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
