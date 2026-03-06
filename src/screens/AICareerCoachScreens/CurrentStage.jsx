import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CAREER_OPTIONS = [
  {
    id: 'school',
    title: 'School Student\n(Class 8-10)',
    image: require('../../assets/AICareerCoach/SchoolStudent.png'),
    bgColor: '#E5E7FF',
  },
  {
    id: 'senior_school',
    title: 'Senior School\nStudent (Class 11-12)',
    image: require('../../assets/AICareerCoach/School.png'),
    bgColor: '#E0FBE7',
  },
  {
    id: 'college',
    title: 'College\nStudent',
    image: require('../../assets/AICareerCoach/CollegeStudent.png'),
    bgColor: '#FFFAE6',
  },
  {
    id: 'professional',
    title: 'Working\nProfessional',
    image: require('../../assets/AICareerCoach/WorkingProfessional.png'),
    bgColor: '#FFE3FD',
  },
  {
    id: 'exploring',
    title: 'Exploring Career\nChange',
    image: require('../../assets/AICareerCoach/ExploreCarearChange.png'),
    bgColor: '#E9E0FE',
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
        style={[styles.cardOuter, isSelected && styles.selectedCardOuter]}
      >
        <View style={[styles.cardInner, { backgroundColor: option.bgColor }]}>
          <View style={styles.iconWrapper}>
            <Image
              source={option.image}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>{option.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#ECE7FF', '#FFFFFF', '#FFFFFF']}
        locations={[0, 0.35, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.pillContainer}>
              <Text style={styles.stepText}>🌟 Step 1 of 3</Text>
            </View>
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
            </View>

            {/* Cards Grid */}
            <View style={styles.gridContainer}>
              <Text style={styles.subtitleText}>
                Choose the option that best describes you.
              </Text>
              {CAREER_OPTIONS.map(renderOption)}
            </View>
          </ScrollView>

          {/* Bottom Section */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('AboutStage')}
          >
            <LinearGradient
              colors={['#FF6652', '#FF6F61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CurrentStage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECE7FF',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 10,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4A4A4A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 15,
    color: '#6B6B7A',
    textAlign: 'center',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardOuter: {
    width: (width - 55) / 2, // 2 columns, 20 padding each side, 15 space between
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: 'transparent',
    padding: 3, // 2px gap (adjusting slightly so it is more visibly matched to CSS logic)
    backgroundColor: 'transparent',
  },
  selectedCardOuter: {
    borderColor: '#FF6B6B', // The 1px red outer border
    backgroundColor: '#FFFFFF', // The white continuous inner gap
  },
  cardInner: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 13,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonShadowWrapper: {
    shadowColor: '#FF6B6B',
    marginBottom: 30,
    marginHorizontal: 30,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
