import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateResumeTitle } from '../redux/actions/resume.actions';
import ResumePreview from './ResumePreview';

const EditResume = ({ navigation }) => {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Untitled');

  useEffect(() => {
    if (resume?.title) {
      setTitle(resume.title);
    }
  }, [resume]);

  const saveTitle = () => {
    if (!resume?._id) return;
    dispatch(updateResumeTitle(resume._id, title.trim() || 'Untitled'));
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TITLE */}
      <View style={styles.titleContainer}>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.titleRow}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.titleText}>{title}</Text>
            <Icon name="edit" size={18} color="#2563eb" />
          </TouchableOpacity>
        ) : (
          <TextInput
            value={title}
            onChangeText={setTitle}
            autoFocus
            style={styles.titleInput}
            onBlur={saveTitle}
            onSubmitEditing={saveTitle}
          />
        )}
      </View>

      {/* EDUCATION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('EditEducation', {
              resumeId: resume._id,
            })
          }
        >
          <Text style={styles.EditText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.previewBtn}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('ResumePreview', {
            resumeId: resume._id,
          })
        }
      >
        <Text style={styles.previewText}>Preview Resume</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditResume;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  titleContainer: { padding: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 20, fontWeight: '600' },
  titleInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2563eb',
  },
  section: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: { fontSize: 16, fontWeight: '600' },
  card: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  bold: { fontWeight: '600' },
  empty: { color: '#9ca3af' },
  previewBtn: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  previewText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  editBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  EditText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
