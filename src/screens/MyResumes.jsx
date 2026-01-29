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
  const userId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchResumes(userId));
    }
  }, [dispatch, userId]);

  const openResume = resume => {
    dispatch(setCurrentResume(resume));
    navigation.navigate('editResume');
  };

  const handleNewResumeCreate = async () => {
    console.log('1');

    if (!userId) return;
    console.log('2', userId);

    const resume = await dispatch(createResume(userId, 'Fusion'));
    console.log('4');
    console.log(resume);

    if (resume?._id) {
      navigation.navigate('editResume', {
        resumeId: resume._id,
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openResume(item)}>
      <Text style={styles.title}>{item.title || 'Untitled Resume'}</Text>
      <Text style={styles.meta}>{item.resumeType || 'Fusion'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={savedResumes}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.newResumeBtn}
        onPress={handleNewResumeCreate}
      >
        <Text style={styles.newResumeText}>Create New Resume</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyResumes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#6b7280' },
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
