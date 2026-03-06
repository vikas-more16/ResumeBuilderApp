import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    title: 'Your Credentials',
    subtitle: 'Store, share and verify your digital credentials seamlessly',
    bg: '#7f9ee0',
    navigation: 'Credentials',
  },
  {
    title: 'Build Your Resume',
    subtitle: 'Create professional resumes in minutes',
    bg: '#e7a2e3',
    navigation: 'MyResumes',
  },
  {
    title: 'Check ATS Score',
    subtitle: "Check your resume's ATS compatibility",
    bg: '#e7adad',
    navigation: 'Ats',
  },
  {
    title: 'Find Jobs',
    subtitle: 'Discover opportunities matching your skills.',
    bg: '#a08add',
    navigation: 'Jobs',
  },
  {
    title: 'AI Interview',
    subtitle: 'Get Interview-Ready with AI',
    bg: '#88d2cc',
    navigation: 'GetStartScreen',
  },
  {
    title: 'AI Career Coach',
    subtitle: 'Get AI Career Coach',
    bg: '#7990e8',
    navigation: 'IntroScreen',
  },
];

const HomeCards = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.bg }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.navigation)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeCards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    marginBottom: 14,
    minHeight: 180,
  },
  title: {
    color: '#3c3a3a',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#3b3c3e',
    marginTop: 10,
    fontSize: 13,
    lineHeight: 16,
  },
});
