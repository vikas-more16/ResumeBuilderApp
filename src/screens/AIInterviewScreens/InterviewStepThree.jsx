import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const InterviewStepThree = ({ navigation }) => {
  const [category, setCategory] = useState('skill');
  const [skills, setSkills] = useState([
    'Communication',
    'Writing',
    'Management',
    'Problem Solving',
  ]);
  const [jobDesc, setJobDesc] = useState('');

  const availableSkills = [
    'Communication',
    'Coding',
    'Design',
    'Leadership',
    'Analysis',
  ];

  const toggleSkill = skill => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FEF8ED', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.topGradient}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View style={styles.textContainer}>
            <Text style={styles.stepText}>STEP 3 OF 3</Text>
            <Text style={styles.title}>
              How should we{'\n'}generate your{'\n'}interview?
            </Text>
          </View>
          <View style={styles.imagePlaceholder} />
        </View>
      </LinearGradient>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Interview Category */}
        <Text style={styles.label}>Interview Category*</Text>

        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setCategory('skill')}
          >
            <View style={styles.radioOuter}>
              {category === 'skill' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>Skill-Based</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setCategory('jd')}
          >
            <View style={styles.radioOuter}>
              {category === 'jd' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>Job Description</Text>
          </TouchableOpacity>
        </View>

        {/* ================= CONDITIONAL CONTENT ================= */}

        {category === 'skill' ? (
          <>
            {/* Search */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search Here..."
              placeholderTextColor="#94a3b8"
            />

            {/* Selected Skills */}
            <View style={styles.chipsContainer}>
              {skills.map(skill => (
                <View key={skill} style={styles.selectedChip}>
                  <Text style={styles.chipText}>{skill}</Text>
                  <TouchableOpacity onPress={() => toggleSkill(skill)}>
                    <Icon name="close" size={14} color="#475569" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Select Skills */}
            <Text style={styles.subLabel}>Select Skills</Text>

            <View style={styles.chipsContainer}>
              {availableSkills.map(skill => (
                <TouchableOpacity
                  key={skill}
                  style={styles.addChip}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text style={styles.addChipText}>{skill}</Text>
                  <Icon name="add" size={14} color="#475569" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Job Description */}
            <TextInput
              style={styles.jdInput}
              placeholder="Add Job Description Here"
              placeholderTextColor="#94a3b8"
              multiline
              maxLength={500}
              value={jobDesc}
              onChangeText={setJobDesc}
            />

            <Text style={styles.counterText}>
              {jobDesc.length}/500
            </Text>
          </>
        )}

        {/* Button */}
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextText}>
            {category === 'jd' ? 'Start Interview' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InterviewStepThree;




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },

  topGradient: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
jdInput: {
  height: 120,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  padding: 16,
  textAlignVertical: 'top',
},



counterText: {
  fontSize: 12,
  color: '#94a3b8',
  textAlign: 'right',
  marginBottom: 24,
},

  textContainer: {
    flex: 1,
  },

  imagePlaceholder: {
    width: 170,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },

  backBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  stepText: {
    color: '#fb7185',
    fontSize: 15,
    marginBottom: 6,
  },

  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0f172a',
    lineHeight: 32,
    marginTop: 10,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 12,
  },

  radioRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },

  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  radioOuter: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#fb7185',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#fb7185',
  },

  radioText: {
    fontSize: 14,
    color: '#0f172a',
  },

  jdInput: {
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    textAlignVertical: 'top',
  },

  counterText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 24,
  },

  nextBtn: {
    height: 48,
    borderRadius: 24,
    marginTop:20,
    backgroundColor: '#ff6b57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  searchInput: {
  height: 44,
  borderRadius: 22,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  paddingHorizontal: 16,
  marginBottom: 14,
},

chipsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
},

selectedChip: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  paddingVertical: 6,
  paddingHorizontal: 10,
  backgroundColor: '#f1f5f9',
  borderRadius: 20,
},

chipText: {
  fontSize: 13,
  color: '#0f172a',
},

subLabel: {
  fontSize: 13,
  color: '#64748b',
  marginBottom: 10,
  marginTop: 16,
},

addChip: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#e5e7eb',
},

addChipText: {
  fontSize: 13,
  color: '#0f172a',
},

});
