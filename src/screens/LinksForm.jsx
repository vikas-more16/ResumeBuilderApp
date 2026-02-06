import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocialLinks } from '../redux/actions/resume.actions';

const LinksForm = ({ route, navigation }) => {
  const { resumeId } = route.params;
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(resume?.socialLinks || []);
  }, [resume]);

  const updateField = (index, key, value) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [key]: value };
    setLinks(updated);
  };

  const addLink = () => {
    setLinks([...links, { network: '', username: '', link: '' }]);
  };

  const removeLink = index => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    dispatch(updateSocialLinks(resumeId, links));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Social Links</Text>

        {links.map((item, index) => (
          <React.Fragment key={index}>
            <TextInput
              style={styles.input}
              placeholder="Network (GitHub, LinkedIn)"
              value={item.network}
              onChangeText={t => updateField(index, 'network', t)}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={item.username}
              onChangeText={t => updateField(index, 'username', t)}
            />
            <TextInput
              style={styles.input}
              placeholder="Profile Link"
              value={item.link}
              onChangeText={t => updateField(index, 'link', t)}
            />

            <TouchableOpacity onPress={() => removeLink(index)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        <TouchableOpacity onPress={addLink}>
          <Text style={styles.add}>+ Add Link</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LinksForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },

  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#111827',
  },

  add: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 12,
  },

  remove: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
    alignSelf: 'flex-end',
  },

  saveBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  saveText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
