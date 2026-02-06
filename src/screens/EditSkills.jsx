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

const EditSkills = ({ route, navigation }) => {
  const { resumeId } = route.params;
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        dispatch(setCurrentResume(res.data.resume));
      } catch (e) {
        Alert.alert('Error', 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, dispatch]);

  if (loading || !resume) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const skills = resume.skills || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Skills</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SkillsForm', {
              resumeId,
              mode: 'add',
            })
          }
        >
          <Icon name="add" size={26} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {skills.length === 0 ? (
        <Text style={styles.empty}>No skills added</Text>
      ) : (
        <FlatList
          data={skills}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('SkillsForm', {
                  resumeId,
                  mode: 'edit',
                  index,
                })
              }
            >
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.skills}>{item.skills.join(', ')}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EditSkills;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '600' },
  empty: { textAlign: 'center', color: '#9ca3af', marginTop: 40 },
  card: {
    backgroundColor: '#f9fafb',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  category: { fontWeight: '600', fontSize: 15 },
  skills: { marginTop: 6, color: '#374151', fontSize: 13 },
});
