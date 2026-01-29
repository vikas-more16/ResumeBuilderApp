import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills } from '../redux/actions/resume.actions';

const SkillsForm = ({ route, navigation }) => {
  const { resumeId, mode = 'add', index } = route.params || {};
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.currentResume);

  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  /* ===== PREFILL ===== */
  useEffect(() => {
    if (mode === 'edit' && resume?.skills?.[index]) {
      const s = resume.skills[index];
      setCategory(s.category || '');
      setSkills(s.skills || []);
    }
  }, [mode, index, resume]);

  /* ===== SKILL ACTIONS ===== */
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills(prev => [...prev, newSkill.trim()]);
    setNewSkill('');
  };

  const removeSkill = i => {
    setSkills(prev => prev.filter((_, idx) => idx !== i));
  };

  /* ===== SAVE ===== */
  const handleSave = () => {
    if (!resume?._id || !category.trim()) return;

    const existing = Array.isArray(resume.skills) ? resume.skills : [];

    const newBlock = {
      category: category.trim(),
      skills,
    };

    const updated =
      mode === 'edit'
        ? existing.map((item, i) => (i === index ? newBlock : item))
        : [...existing, newBlock];

    dispatch(updateSkills(resume._id, updated));
    navigation.goBack();
  };

  const handleDelete = () => {
    if (mode !== 'edit') return;

    const updated = resume.skills.filter((_, i) => i !== index);
    dispatch(updateSkills(resume._id, updated));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          {mode === 'edit' ? 'Edit Skill Category' : 'Add Skill Category'}
        </Text>

        <TextInput
          placeholder="Category (e.g. Backend)"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />

        {/* SKILLS */}
        {skills.map((s, i) => (
          <View key={i} style={styles.skillRow}>
            <Text style={styles.skill}>{s}</Text>
            <TouchableOpacity onPress={() => removeSkill(i)}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.row}>
          <TextInput
            placeholder="Add skill"
            value={newSkill}
            onChangeText={setNewSkill}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {mode === 'edit' && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SkillsForm;

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },

  heading: { fontSize: 18, fontWeight: '600', marginBottom: 16 },

  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef2ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  skill: { fontSize: 13 },
  remove: { color: '#b91c1c', fontWeight: '700' },

  addBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },

  addText: { color: '#fff', fontWeight: '600' },

  saveBtn: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },

  saveText: { color: '#fff', fontWeight: '600' },

  deleteBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  deleteText: { color: '#b91c1c', fontWeight: '600' },
});
