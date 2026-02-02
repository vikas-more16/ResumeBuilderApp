import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updatePersonalInfo } from '../redux/actions/resume.actions';

const ProfileForm = ({ route, navigation }) => {
  const { mode } = route.params || {};
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [form, setForm] = useState({
    photo: null,
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    summary: '',
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    if (mode !== 'edit') return;
    if (!resume?.personalInfo) return;

    setForm({
      firstName: resume.personalInfo.firstName || '',
      lastName: resume.personalInfo.lastName || '',
      jobTitle: resume.personalInfo.jobTitle || '',
      email: resume.personalInfo.email || '',
      phone: resume.personalInfo.phone || '',
      country: resume.personalInfo.country || '',
      city: resume.personalInfo.city || '',
      summary: resume.personalInfo.summary || '',
    });

    if (resume.personalInfo.photo) {
      setPreviewPhoto(resume.personalInfo.photo);
    }
  }, [mode]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      const image = response.assets[0];
      setForm(p => ({ ...p, photo: image }));
      setPreviewPhoto(image.uri);
    });
  };

  const handleSave = () => {
    if (!resume?._id) return;

    const data = new FormData();

    Object.keys(form).forEach(key => {
      if (key !== 'photo' && form[key] !== undefined) {
        data.append(key, form[key]);
      }
    });

    if (form.photo) {
      data.append('photo', {
        uri: form.photo.uri,
        name: form.photo.fileName || 'profile.jpg',
        type: form.photo.type || 'image/jpeg',
      });
    }

    dispatch(updatePersonalInfo(resume._id, data));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          {mode === 'edit' ? 'Edit Profile' : 'Add Profile'}
        </Text>

        <View style={styles.avatarWrapper}>
          {previewPhoto ? (
            <Image source={{ uri: previewPhoto }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>👤</Text>
            </View>
          )}

          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Text style={styles.editIconText}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={t => setForm(p => ({ ...p, firstName: t }))}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={t => setForm(p => ({ ...p, lastName: t }))}
        />

        <TextInput
          style={styles.input}
          placeholder="Job Title"
          value={form.jobTitle}
          onChangeText={t => setForm(p => ({ ...p, jobTitle: t }))}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={t => setForm(p => ({ ...p, email: t }))}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={form.phone}
          onChangeText={t => setForm(p => ({ ...p, phone: t }))}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="City"
            value={form.city}
            onChangeText={t => setForm(p => ({ ...p, city: t }))}
          />

          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Country"
            value={form.country}
            onChangeText={t => setForm(p => ({ ...p, country: t }))}
          />
        </View>

        <TextInput
          style={[styles.input, styles.summary]}
          placeholder="Profile Summary"
          multiline
          value={form.summary}
          onChangeText={t => setForm(p => ({ ...p, summary: t }))}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#111827',
  },

  /* Avatar */
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 24,
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e5e7eb',
  },

  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    fontSize: 48,
  },

  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#2563eb',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  editIconText: {
    color: '#fff',
    fontSize: 16,
  },

  /* Inputs */
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 14,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  summary: {
    height: 110,
    textAlignVertical: 'top',
  },

  /* Save Button */
  saveBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
