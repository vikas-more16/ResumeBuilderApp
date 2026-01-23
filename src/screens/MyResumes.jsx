import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveResume,
  fetchResumes,
  setCurrentResume,
} from '../redux/actions/resume.actions';

const MyResumes = ({ navigation }) => {
  const dispatch = useDispatch();

  const { savedResumes, loading } = useSelector(state => state.resume);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const handleNewResumeCreate = async () => {
    dispatch(
      setCurrentResume({
        _id: null,
        data: {
          name: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          summary: '',
        },
      }),
    );
    await dispatch(saveResume());
    dispatch(fetchResumes());
    navigation.navigate('Truresume');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.empty}>Loading resumes...</Text>
        ) : (
          <FlatList
            data={savedResumes}
            keyExtractor={item => item._id || item.id}
            ListEmptyComponent={
              <Text style={styles.empty}>No resumes saved yet</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ResumePreview', {
                    resume: item,
                  })
                }
              >
                <Text style={styles.title}>
                  {item.title || item.name || 'Untitled Resume'}
                </Text>

                <Text style={styles.date}>
                  Created on{' '}
                  {item.createdAt
                    ? new Date(item.createdAt).toDateString()
                    : 'N/A'}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
        <TouchableOpacity
          style={styles.newResumeBtn}
          onPress={handleNewResumeCreate}
        >
          <Text style={styles.newResumeText}>Create New Resume</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyResumes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9ca3af',
  },
  newResumeBtn: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  newResumeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
