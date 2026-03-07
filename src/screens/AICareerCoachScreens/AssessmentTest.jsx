import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { questions } from '../../utils/CareerCoachQuestions';

const { width } = Dimensions.get('window');

const QUESTIONS = questions.questions.map(q => ({
  id: q.number,
  question: q.question,
  options: [
    {
      id: 'A',
      text: q.options.A.text,
      image: q.options.A.image,
    },
    {
      id: 'B',
      text: q.options.B.text,
      image: q.options.B.image,
    },
  ],
}));

const AssessmentTest = ({ navigation }) => {
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
      <LinearGradient
        colors={['#ECE7FF', '#FFFFFF', '#FFFFFF']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Assessment Test</Text>

            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.quitText}>Quit Test</Text>
            </TouchableOpacity>
          </View>

          {/* Tip Banner */}
          <View style={styles.tipContainer}>
            <Image
              source={require('../../assets/AICareerCoach/tip.png')}
              style={styles.tipImage}
              resizeMode="contain"
            />
          </View>

          {/* Question Card */}
          <View style={styles.mainCard}>
            {/* Badge */}
            <View style={styles.badgeWrapper}>
              <ImageBackground
                source={require('../../assets/AICareerCoach/assesmentquestionsbg.png')}
                style={styles.badgeImage}
                resizeMode="contain"
              >
                <Text style={styles.badgeText}>
                  QUESTION {currentStep + 1} OF {QUESTIONS.length}
                </Text>
              </ImageBackground>
            </View>

            {/* Question */}
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsRow}>
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.85}
                  onPress={() => handleSelectOption(option.id)}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                >
                  {/* Star Badge */}
                  <View style={styles.starBadgeContainer}>
                    <View style={styles.starWhite1} />
                    <View style={styles.starWhite2} />
                    <LinearGradient
                      colors={['#FF879F', '#E82049']}
                      style={styles.star1}
                    />
                    <LinearGradient
                      colors={['#FF879F', '#E82049']}
                      style={styles.star2}
                    />
                    <Text style={styles.starText}>{option.id}</Text>
                  </View>
                  <Image
                    source={{ uri: option.image }}
                    style={styles.optionImage}
                    resizeMode="cover"
                  />

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

          {/* Next / Submit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.buttonShadowWrapper,
              !selectedOption && styles.buttonDisabled,
            ]}
            onPress={selectedOption ? handleNext : null}
          >
            <LinearGradient
              colors={['#FF6652', '#FF6F61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {isLastQuestion ? 'Submit Test' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AssessmentTest;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
  },

  quitButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },

  quitText: {
    color: '#FF5A5F',
    fontSize: 14,
    fontWeight: '500',
  },

  tipContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  tipImage: {
    width: '100%',
    height: 80,
  },

  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginHorizontal: 20,
    marginTop: 60,
    paddingVertical: 45,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#555454',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  badgeWrapper: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
  },

  badgeImage: {
    width: width * 0.75,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 7,
  },

  questionText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
    lineHeight: 32,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
  },

  optionCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 8,
    paddingBottom: 24,
    alignItems: 'center',
  },

  optionCardSelected: {
    borderColor: '#E82049',
    backgroundColor: '#FFF5F7',
  },

  optionImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 16,
  },

  optionText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#212121',
    fontWeight: '500',
    paddingHorizontal: 4,
    lineHeight: 22,
  },

  optionTextSelected: {
    color: '#E82049',
    fontWeight: '600',
  },

  starBadgeContainer: {
    position: 'absolute',
    top: -19,
    alignSelf: 'center',
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  starWhite1: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },

  starWhite2: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
  },

  star1: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 5,
  },

  star2: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },

  starText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    zIndex: 2,
  },

  buttonShadowWrapper: {
    shadowColor: '#FF6B6B',
    marginBottom: 30,
    marginTop: 20,
    marginHorizontal: 20,
  },

  button: {
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  buttonDisabled: {
    opacity: 0.5,
  },
});
