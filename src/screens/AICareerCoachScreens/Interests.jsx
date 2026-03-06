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

const INTEREST_OPTIONS = [
  { id: 'tech', title: 'Technology and\nInnovation', emoji: '💻🚀' },
  { id: 'engineering', title: 'Engineering and\nManufacturing', emoji: '⚙️🛠' },
  { id: 'healthcare', title: 'Healthcare and\nMedical Services', emoji: '❤️💊' },
  { id: 'business', title: 'Business Strategy &\nEntrepreneurship', emoji: '💼💡' },
  { id: 'management', title: 'Management and\nOperations', emoji: '📋📚' },
  { id: 'finance', title: 'Finance and\nAccounting', emoji: '💵🪙' },
  { id: 'sales', title: 'Sales, Marketing &\nCommunications', emoji: '🎯📣' },
  { id: 'creative', title: 'Creative Arts &\nDesign', emoji: '🎨🖌' },
  { id: 'media', title: 'Media, Entertainment\n& Performing Arts', emoji: '🎬✨' },
  { id: 'education', title: 'Education and\nTraining', emoji: '🎓📚' },
  { id: 'social', title: 'Social Services &\nCommunity\nDevelopment', emoji: '🤝📋' },
  { id: 'law', title: 'Law, Governance &\nPublic Administration', emoji: '⚖️🏛' },
  { id: 'science', title: 'Science and\nResearch', emoji: '🔬🧑‍🔬' },
  { id: 'environment', title: 'Environment, Agri &\nNatural Resources', emoji: '🌍🌱' },
  { id: 'trade', title: 'Trade, Construction\n& Technical Services', emoji: '🧰🏗' },
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
      return prev; // If already 3, don't add more (unless you want toast notification)
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
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiText}>{option.emoji}</Text>
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
            <Text style={styles.stepText}>🌟 Step 3 of 3</Text>
          </View>

          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              What Interests You The{'\n'}Most?
            </Text>
            <Text style={styles.subtitleText}>
              Select your top 3 interests in order
            </Text>
          </View>

          {/* Grid Layout */}
          <View style={styles.gridContainer}>
            {INTEREST_OPTIONS.map(renderOption)}
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('AssessmentTest')}
           
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8A6E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Test</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Interests;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFBFF', // Matches very light background from the screenshot design
  },
  container: {
    flex: 1,
    backgroundColor: '#FDFBFF',
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
    marginTop: 15,
    marginBottom: 25,
    alignItems: 'center', // Image is centered
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B6B7A',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 55) / 2, // 2 columns, 20px padding left/right, 15px gap
    backgroundColor: '#F8F9FB', // Light card tint
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
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 18,
    flex: 1,
  },
  emojiContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  emojiText: {
    fontSize: 26,
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
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 30,
    paddingTop: 10,
    backgroundColor: '#FDFBFF',
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