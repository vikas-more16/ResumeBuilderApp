import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const InterviewStepTwo = ({ navigation }) => {
  const [domain, setDomain] = useState('');
  const [role, setRole] = useState('');
  const [openType, setOpenType] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Gradient Header */}
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
            <Text style={styles.stepText}>STEP 2 OF 3</Text>
            <Text style={styles.title}>
              What role are you{'\n'}interviewing for
            </Text>
          </View>

          <View style={styles.imagePlaceholder} />
        </View>
      </LinearGradient>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Domain */}
        <Text style={styles.label}>Domain<Text style={{color:'#FE6B6B'}}>*</Text></Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            setOpenType(openType === 'domain' ? null : 'domain')
          }
        >
          <Text style={[styles.dropdownText, domain && { color: '#0f172a' }]}>
            {domain || 'Select'}
          </Text>
          <Icon
            name={openType === 'domain' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {openType === 'domain' && (
          <View style={styles.dropdownMenu}>
            {['Software', 'Data Science', 'Design'].map(item => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setDomain(item);
                  setOpenType(null);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Role */}
        <Text style={styles.label}>Role<Text style={{color:'#FE6B6B'}}>*</Text></Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            setOpenType(openType === 'role' ? null : 'role')
          }
        >
          <Text style={[styles.dropdownText, role && { color: '#0f172a' }]}>
            {role || 'Select'}
          </Text>
          <Icon
            name={openType === 'role' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {openType === 'role' && (
          <View style={styles.dropdownMenu}>
            {['Frontend Developer', 'Backend Developer', 'Full Stack'].map(
              item => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setRole(item);
                    setOpenType(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('InterviewStepThree')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InterviewStepTwo;


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
    color: '#FF6652',
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
    marginBottom: 8,
    marginTop: 12,
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
