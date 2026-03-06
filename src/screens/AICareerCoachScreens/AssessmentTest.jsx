import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mock data generator for 30 questions
const QUESTIONS = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 1,
  question: 'What type of task do you prefer?',
  options: [
    {
      id: 'A',
      text: 'Write everything properly and keep tidy',
      // Using generic placeholder images from local assets
      image: require('../../assets/AICareerCoach/OptionA.png'),
    },
    {
      id: 'B',
      text: 'Use machines to make or build something',
      image: require('../../assets/AICareerCoach/OptionB.png'),
    },
  ],
}));

const AssessmentTest = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUESTIONS.length - 1;

  const handleSelectOption = optionId => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigation.navigate('AssessmentReport');
    } else {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Top curved background section */}
        <View style={styles.topCurvedBg}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Assessment Test</Text>
            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
            >
              <Text style={styles.quitText}>Quit Test</Text>
            </TouchableOpacity>
          </View>

          {/* Banner Info */}
          <LinearGradient
            colors={['#E5CFF5', '#C5B4FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <View style={styles.bannerIconWrapper}>
              <Text style={styles.bannerIcon}>🎯</Text>
            </View>
            <Text style={styles.bannerText}>
              There are no right or wrong answers.{'\n'}Pick what feels most
              natural.
            </Text>
          </LinearGradient>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Question Badge (floating) */}
          <View style={styles.questionBadgeShadow}>
            <LinearGradient
              colors={['#FFC800', '#FFA900']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.questionBadge}
            >
              <View style={styles.badgeDot} />
              <Text style={styles.questionBadgeText}>
                QUESTION {currentStep + 1} OF {QUESTIONS.length}
              </Text>
              <View style={styles.badgeDot} />
            </LinearGradient>
          </View>

          {/* Question Text */}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Options grid */}
          <View style={styles.optionsRow}>
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.8}
                  onPress={() => handleSelectOption(option.id)}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                >
                  {/* Option Badge (A/B) */}
                  <View style={styles.optionBadgeWrapper}>
                    <View style={styles.optionBadge}>
                      <Text style={styles.optionBadgeText}>{option.id}</Text>
                    </View>
                  </View>

                  <View style={styles.optionImageContainer}>
                    <Image
                      source={option.image}
                      style={styles.optionImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Conditional Next/Finish Button */}
          {selectedOption ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonShadowWrapper}
              onPress={handleNext}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8A6E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {isLastQuestion ? 'View Report' : 'Next Question'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssessmentTest;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 40,
  },
  topCurvedBg: {
    backgroundColor: '#F8F5FF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 10,
    paddingBottom: 60,
    paddingHorizontal: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  quitButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE5E5',
    shadowColor: '#FE6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quitText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
  },
  bannerIconWrapper: {
    marginRight: 10,
  },
  bannerIcon: {
    fontSize: 24,
  },
  bannerText: {
    color: '#3B2A50',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -30, // Overlap the curved bg
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 50, // Space for the floating badge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  questionBadgeShadow: {
    position: 'absolute',
    top: -15, // float halfway out
    alignSelf: 'center',
    shadowColor: '#FFA900',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 20,
  },
  questionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  badgeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFF',
    opacity: 0.7,
  },
  questionBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 40,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  optionCard: {
    width: (width - 80) / 2, // 20px edge margin * 2 = 40, padding inside main card 15*2 = 30, plus gap 10 = 80
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingTop: 25, // provide space for floating A/B badge
    alignItems: 'center',
    position: 'relative',
  },
  optionCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF9F9',
  },
  optionBadgeWrapper: {
    position: 'absolute',
    top: -16,
    alignSelf: 'center',
    zIndex: 10,
  },
  optionBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }], // Diamond shape logic to fake the jagged badge
    borderRadius: 8,
  },
  optionBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    transform: [{ rotate: '-45deg' }], // Counter rotate text
  },
  optionImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 12,
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
  optionText: {
    fontSize: 12,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FF6B6B',
    fontWeight: '700',
  },
  buttonShadowWrapper: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 30,
    marginTop: 10,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPlaceholder: {
    height: 52, // equivalent to the button height, prevents layout jump
    marginTop: 10,
  },
});
