import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const SCHOOL_OPTIONS = [
  {
    id: '8th',
    title: '8th Standard',
    emoji: '🎒',
    iconBgColor: '#E6EFFF', // Light blue background
  },
  {
    id: '9th',
    title: '9th Standard',
    emoji: '📗',
    iconBgColor: '#E9FFE6', // Light green background
  },
  {
    id: '10th',
    title: '10th Standard',
    emoji: '🎓',
    iconBgColor: '#E6EDFF', // Light purple-blue background
  },
];

const AboutStage = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('9th'); // Default selected from image

  const renderOption = option => {
    const isSelected = selectedOption === option.id;

    return (
      <TouchableOpacity
        key={option.id}
        activeOpacity={0.8}
        onPress={() => setSelectedOption(option.id)}
        style={[styles.card, isSelected && styles.selectedCard]}
      >
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: option.iconBgColor },
            ]}
          >
            {/* Fallback to Emojis since actual illustration assets aren't present yet */}
            <Text style={styles.emojiText}>{option.emoji}</Text>
          </View>
          <Text style={styles.cardTitle}>{option.title}</Text>
        </View>

        <View style={styles.radioContainer}>
          <View
            style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
          >
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={styles.pillContainer}>
            <Text style={styles.stepText}>🌟 Step 2 of 3</Text>
          </View>

          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Tell Us About Your School</Text>
          </View>

          {/* Cards List */}
          <View style={styles.listContainer}>
            {SCHOOL_OPTIONS.map(renderOption)}
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('Interests')}
            
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8A6E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutStage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F4FF', // Consistent light purple background
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F4FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 34,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  selectedCard: {
    borderColor: 'transparent',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emojiText: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FF6B6B',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 30,
    paddingTop: 10,
    backgroundColor: '#F7F4FF',
  },
  buttonShadowWrapper: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 30,
    marginBottom: 10,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
