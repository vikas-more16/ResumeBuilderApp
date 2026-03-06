import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CAREER_OPTIONS = [
  {
    id: 'school',
    title: 'School Student\n(Class 8-10)',
    emoji: '🎒',
    bgColor: '#EEEEFF',
    iconBgColor: '#DEE0FF',
  },
  {
    id: 'senior_school',
    title: 'Senior School\nStudent (Class 11-12)',
    emoji: '🏫',
    bgColor: '#E6F9EC',
    iconBgColor: '#BCE8CC',
  },
  {
    id: 'college',
    title: 'College\nStudent',
    emoji: '👩‍🎓',
    bgColor: '#FFFBE6',
    iconBgColor: '#F5EDB2',
  },
  {
    id: 'professional',
    title: 'Working\nProfessional',
    emoji: '👩‍💻',
    bgColor: '#FCEBFF',
    iconBgColor: '#F2C6F9',
  },
  {
    id: 'exploring',
    title: 'Exploring Career\nChange',
    emoji: '💼',
    bgColor: '#EEEEFF',
    iconBgColor: '#DEE0FF',
  },
];

const CurrentStage = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('school'); // Default selected as per image

  const renderOption = option => {
    const isSelected = selectedOption === option.id;

    return (
      <TouchableOpacity
        key={option.id}
        activeOpacity={0.8}
        onPress={() => setSelectedOption(option.id)}
        style={[
          styles.card,
          { backgroundColor: option.bgColor },
          isSelected && styles.selectedCard,
        ]}
      >
        <View
          style={[styles.iconWrapper, { backgroundColor: option.iconBgColor }]}
        >
          <Text style={styles.emojiText}>{option.emoji}</Text>
        </View>
        <Text style={styles.cardTitle}>{option.title}</Text>
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
            <Text style={styles.stepText}>🌟 Step 1 of 3</Text>
          </View>

          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Title & Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              Where Are You In Your{'\n'}Career Journey?
            </Text>
            <Text style={styles.subtitleText}>
              Choose the option that best describes you.
            </Text>
          </View>

          {/* Cards Grid */}
          <View style={styles.gridContainer}>
            {CAREER_OPTIONS.map(renderOption)}
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('AboutStage')}
            
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8A6E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CurrentStage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F4FF', // Light purple-ish background similar to the image
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
    marginBottom: 30,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 15,
    color: '#6B6B7A',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 55) / 2, // 2 columns, 20 padding each side, 15 space between
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#FF6B6B', // The orange/red selection border
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20, // To give it an organic squircle/blob feel
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emojiText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 20,
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