import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const SCHOOL_OPTIONS = [
  {
    id: '8th',
    title: '8th Standard',
    image: require('../../assets/AICareerCoach/8Standard.png'),
  },
  {
    id: '9th',
    title: '9th Standard',
    image: require('../../assets/AICareerCoach/9Standard.png'),
  },
  {
    id: '10th',
    title: '10th Standard',
    image: require('../../assets/AICareerCoach/10Standard.png'),
  },
];

const AboutStage = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('9th');

  const renderOption = option => {
    const isSelected = selectedOption === option.id;

    return (
      <TouchableOpacity
        key={option.id}
        activeOpacity={0.8}
        onPress={() => setSelectedOption(option.id)}
        style={[styles.cardOuter, isSelected && styles.selectedCardOuter]}
      >
        <View style={styles.cardInner}>
          <Image
            source={option.image}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>{option.title}</Text>
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
              <Text style={styles.stepText}>🌟 Step 2 of 3</Text>
            </View>
          </View>

          {/* KEEPING SCROLLVIEW EXACTLY SAME */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Tell Us About Your School</Text>
            </View>

            <View style={styles.listContainer}>
              {SCHOOL_OPTIONS.map(renderOption)}
            </View>
          </ScrollView>

          {/* Bottom Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('Interests')}
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

export default AboutStage;

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
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    marginBottom: 30,
    alignItems: 'center',
  },

  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  listContainer: {
    marginTop: 10,
  },

  cardOuter: {
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#EBEEF3',
    backgroundColor: '#FFFFFF',
    padding: 3,
  },

  selectedCardOuter: {
    borderColor: '#FF6B6B',
    borderWidth: 1.5,
  },

  cardInner: {
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  cardImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },

  cardTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: 30,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: '#FF6B6B',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
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
