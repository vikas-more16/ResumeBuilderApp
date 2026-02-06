import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const InterviewStepOne = ({ navigation }) => {
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('domain');
  const [language, setLanguage] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

        {/* Row wrapper */}
        <View style={styles.headerRow}>
          {/* Left text content */}
          <View style={styles.textContainer}>
            <Text style={styles.stepText}>STEP 1 OF 3</Text>
            <Text style={styles.title}>Tell us your{'\n'}interview target</Text>
          </View>

          {/* Right placeholder (future image) */}
          <View style={styles.imagePlaceholder} />
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        {/* Company Name */}
        <Text style={styles.label}>Company Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#94a3b8"
          value={company}
          onChangeText={setCompany}
        />

        {/* Interview Category */}
        <Text style={styles.label}>Interview Category*</Text>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === 'domain' && styles.categoryActive,
            ]}
            onPress={() => setCategory('domain')}
          >
            <Text style={styles.categoryEmoji}>👨‍💻</Text>
            <Text style={styles.categoryText}>Domain Specific</Text>
            <View style={styles.radioOuter}>
              {category === 'domain' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === 'hr' && styles.categoryActive,
            ]}
            onPress={() => setCategory('hr')}
          >
            <Text style={styles.categoryEmoji}>👩‍💼</Text>
            <Text style={styles.categoryText}>HR Interview</Text>
            <View style={styles.radioOuter}>
              {category === 'hr' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Interview Language */}
        <Text style={styles.label}>Interview Language*</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setOpen(!open)}
        >
          <Text style={[styles.dropdownText, language && { color: '#0f172a' }]}>
            {language || 'Select'}
          </Text>
          <Icon
            name={open ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownMenu}>
            {['English', 'Hindi', 'Marathi'].map(item => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setLanguage(item);
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('InterviewStepTwo')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InterviewStepOne;

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
    marginTop:10,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    fontSize: 14,
  },

  categoryRow: {
    flexDirection: 'row',
    gap: 12,
  },

  categoryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
  },

  categoryActive: {
    borderColor: '#fb7185',
    backgroundColor: '#fff7ed',
  },

  categoryEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 8,
  },

  radioOuter: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#fb7185',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#fb7185',
  },

  dropdown: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginTop: 6,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#0f172a',
  },

  dropdownText: {
    color: '#94a3b8',
    fontSize: 14,
  },

  nextBtn: {
    marginTop: 32,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ff6b57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
