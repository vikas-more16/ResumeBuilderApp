import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const INTEREST_OPTIONS = [
  {
    id: 'tech',
    title: 'Technology and\nInnovation',
    image: require('../../assets/AICareerCoach/Interests/tech.png'),
  },
  {
    id: 'engineering',
    title: 'Engineering and\nManufacturing',
    image: require('../../assets/AICareerCoach/Interests/engineering.png'),
  },
  {
    id: 'healthcare',
    title: 'Healthcare and\nMedical Services',
    image: require('../../assets/AICareerCoach/Interests/healthcare.png'),
  },
  {
    id: 'business',
    title: 'Business Strategy &\nEntrepreneurship',
    image: require('../../assets/AICareerCoach/Interests/business.png'),
  },
  {
    id: 'management',
    title: 'Management and\nOperations',
    image: require('../../assets/AICareerCoach/Interests/management.png'),
  },
  {
    id: 'finance',
    title: 'Finance and\nAccounting',
    image: require('../../assets/AICareerCoach/Interests/finance.png'),
  },
  {
    id: 'sales',
    title: 'Sales, Marketing &\nCommunications',
    image: require('../../assets/AICareerCoach/Interests/sales.png'),
  },
  {
    id: 'creative',
    title: 'Creative Arts &\nDesign',
    image: require('../../assets/AICareerCoach/Interests/creative.png'),
  },
  {
    id: 'media',
    title: 'Media, Entertainment\n& Performing Arts',
    image: require('../../assets/AICareerCoach/Interests/media.png'),
  },
  {
    id: 'education',
    title: 'Education and\nTraining',
    image: require('../../assets/AICareerCoach/Interests/education.png'),
  },
  {
    id: 'social',
    title: 'Social Services &\nCommunity\nDevelopment',
    image: require('../../assets/AICareerCoach/Interests/social.png'),
  },
  {
    id: 'law',
    title: 'Law, Governance &\nPublic Administration',
    image: require('../../assets/AICareerCoach/Interests/law.png'),
  },
  {
    id: 'science',
    title: 'Science and\nResearch',
    image: require('../../assets/AICareerCoach/Interests/science.png'),
  },
  {
    id: 'environment',
    title: 'Environment, Agri &\nNatural Resources',
    image: require('../../assets/AICareerCoach/Interests/environment.png'),
  },
  {
    id: 'trade',
    title: 'Trade, Construction\n& Technical Services',
    image: require('../../assets/AICareerCoach/Interests/trade.png'),
  },
];

const Interests = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = id => {
    setSelectedInterests(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const renderOption = option => {
    const selectedIndex = selectedInterests.indexOf(option.id);
    const isSelected = selectedIndex !== -1;

    return (
      <TouchableOpacity
        key={option.id}
        activeOpacity={0.8}
        onPress={() => toggleInterest(option.id)}
        style={[styles.card, isSelected && styles.selectedCard]}
      >
        <Text style={styles.cardTitle}>{option.title}</Text>
        <View style={styles.pngContainer}>
          <Image source={option.image} style={styles.pngImage} />
        </View>

        {/* Selected Badge */}
        {isSelected && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedIndex + 1}</Text>
          </View>
        )}
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
              <Text style={styles.stepText}>🌟 Step 3 of 3</Text>
            </View>
          </View>
          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              What Interests You The{'\n'}Most?
            </Text>
          </View>
          {/* Subtitle */}
          <Text style={styles.subtitleText}>
            Select your top 3 interests in order
          </Text>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Grid Layout */}
            <View style={styles.gridContainer}>
              {INTEREST_OPTIONS.map(renderOption)}
            </View>
          </ScrollView>

          {/* Bottom Section */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('AssessmentTest')}
          >
            <LinearGradient
              colors={['#FF6652', '#FF6F61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Test</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Interests;

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
    marginBottom: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B6B7A',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 55) / 2, // 2 columns, 20px padding left/right, 15px gap
    backgroundColor: '#f3f7fe', // Light card tint
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    minHeight: 110,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#FF6B6B', // Selected coral border
    backgroundColor: '#FFF5F5', // Optional sub-hue
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    lineHeight: 18,
    flex: 1,
  },
  pngContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  pngImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
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
