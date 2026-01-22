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
import { fetchResumes } from '../redux/actions/resume.actions';

const Mydrive = ({ navigation }) => {
  const dispatch = useDispatch();

  const { savedResumes, loading } = useSelector(state => state.resume);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

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
      </View>
    </SafeAreaView>
  );
};

export default Mydrive;

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
});
