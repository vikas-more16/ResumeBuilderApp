import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentResume } from '../redux/actions/resume.actions';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const EditLinks = ({ route, navigation }) => {
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

  const links = resume.socialLinks || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social Links</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LinksForm', {
            resumeId,
          })
        }
      >
        {links.length === 0 ? (
          <Text style={styles.empty}>No social links added</Text>
        ) : (
          links.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.network}>{item.network}</Text>
              <Text style={styles.text}>{item.username}</Text>
              <Text style={styles.link}>{item.link}</Text>
            </View>
          ))
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditLinks;

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

  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
  },

  name: { fontSize: 16, fontWeight: '700' },
  job: { fontSize: 14, color: '#2563eb', marginTop: 4 },
  text: { fontSize: 13, color: '#374151', marginTop: 4 },
  summary: { marginTop: 8, fontSize: 13, color: '#4b5563' },
});
