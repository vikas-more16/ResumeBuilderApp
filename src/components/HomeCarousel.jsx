import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  {
    title: 'Build Your Resume',
    subtitle: 'Create professional resumes in minutes',
    bg: '#337cc1',
    navigation: 'Truresume',
  },
  {
    title: 'Check ATS Score',
    subtitle: "Check your resume's ATS compatibility",
    bg: '#875bd3',
    navigation: 'Ats',
  },
  {
    title: 'Find Jobs',
    subtitle: 'Discover opportunities matching your skills.',
    bg: '#23a873',
    navigation: 'Jobs',
  },
  {
    title: 'Find Internships',
    subtitle: 'Discover opportunities matching your skills.',
    bg: '#27a6a6',
    navigation: 'Internship',
  },
  {
    title: 'Your Credentials, Secured and Ready',
    subtitle: 'Store, share and verify your digital credentials seamlessly',
    bg: '#285c74',
    navigation: 'Credentials',
  },
];

const HomeCarousel = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % DATA.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.bg }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(`${item.navigation}`)}
            >
              <Text style={styles.exploreButton}>Explore more</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {DATA.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({
  card: {
    width: 395,
    height: 200,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#e0e7ff',
    fontSize: 14,
    marginTop: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#386ee3',
    width: 18,
  },
  exploreButton: {
    backgroundColor: 'white',
    width: '100',
    height: '25',
    textAlign: 'center',
    paddingTop: '3',
    marginTop: '40',
  },
});
