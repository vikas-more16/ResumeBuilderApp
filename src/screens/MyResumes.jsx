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
  createResume,
  fetchResumes,
  setCurrentResume,
} from '../redux/actions/resume.actions';

const MyResumes = ({ navigation }) => {
  const dispatch = useDispatch();

  const { savedResumes, loading } = useSelector(state => state.resume);
  const userId = useSelector(state => state.auth.user?._id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchResumes(userId));
    }
  }, [dispatch, userId]);

  const handleNewResumeCreate = async () => {
    if (!userId) return;

    // Create blank resume in backend
    await dispatch(createResume(userId, 'Fusion'));

    navigation.navigate('Truresume');
  };

  const openResume = resume => {
    dispatch(setCurrentResume(resume));
    navigation.navigate('ResumePreview', { resumeId: resume._id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openResume(item)}>
      <Text style={styles.title}>{item.title || 'Untitled Resume'}</Text>

      <Text style={styles.meta}>{item.resumeType || 'Fusion'}</Text>

      <Text style={styles.date}>
        Created:{' '}
        {item.createdAt ? new Date(item.createdAt).toDateString() : 'N/A'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.empty}>Loading resumes...</Text>
        ) : (
          <FlatList
            data={savedResumes}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.empty}>No resumes saved yet</Text>
            }
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

/* ================= STYLES ================= */

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
    color: '#111827',
  },

  meta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: '#9ca3af',
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
