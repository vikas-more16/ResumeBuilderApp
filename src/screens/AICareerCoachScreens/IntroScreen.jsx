import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ContinuousMarquee = ({ children, duration = 30000 }) => {
  const [contentWidth, setContentWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (contentWidth > 0) {
      translateX.setValue(0);
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -contentWidth,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [contentWidth, translateX, duration]);

  return (
    <View style={{ overflow: 'hidden', width: '100%', marginBottom: 12 }}>
      <Animated.View
        style={{ flexDirection: 'row', transform: [{ translateX }] }}
      >
        <View
          style={{ flexDirection: 'row' }}
          onLayout={e => setContentWidth(e.nativeEvent.layout.width)}
        >
          {children}
        </View>
        {contentWidth > 0 && (
          <>
            <View style={{ flexDirection: 'row' }}>{children}</View>
            <View style={{ flexDirection: 'row' }}>{children}</View>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const IntroScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#ECE7FF', '#ECE7FF', '#FFFFFF']}
        locations={[0, 0.72, 1]}
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
              <Image
                source={require('../../assets/Sparkle.png')}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
              <Text style={styles.pillText}>AI Career Coach</Text>
            </View>
            <View style={{ width: 44 }} />
          </View>
          {/* Main Illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/AICareerCoach/Intro.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.titleText}>
            Find the Career You're{'\n'}Built For
          </Text>

          {/* Floating Tags Section */}
          <View style={styles.tagsWrapper}>
            <ContinuousMarquee duration={25000}>
              <Tag
                text="Full Stack Developer"
                icon="code-braces"
                iconBgColor="#EFE6FF"
              />
              <Tag
                text="Backend Developer"
                icon="server"
                iconBgColor="#EFE6FF"
              />
              <Tag
                text="Blockchain"
                icon="link-variant"
                iconBgColor="#EFE6FF"
              />
            </ContinuousMarquee>
            <ContinuousMarquee duration={35000}>
              <Tag
                text="Web Designer"
                icon="palette-outline"
                iconBgColor="#FFE6E6"
              />
              <Tag
                text="QA Analyst"
                icon="check-circle-outline"
                iconBgColor="#FFE6E6"
              />
              <Tag
                text="UI UX Designer"
                icon="cellphone-link"
                iconBgColor="#E6FAFA"
              />
            </ContinuousMarquee>
            <ContinuousMarquee duration={30000}>
              <Tag
                text="DevOps Engineer"
                icon="infinity"
                iconBgColor="#EEF2FF"
              />
              <Tag
                text="AI Engineer"
                icon="robot-outline"
                iconBgColor="#EEF2FF"
              />
              <Tag text="ML Engineer" icon="brain" iconBgColor="#EEF2FF" />
            </ContinuousMarquee>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonShadowWrapper}
            onPress={() => navigation.navigate('CurrentStage')}
          >
            <LinearGradient
              colors={['#FF6652', '#FF6F61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Assessment</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Take a 5-7 minute test to understand your strengths,{'\n'}interests,
            and ideal careers.
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const Tag = ({ text, icon, iconBgColor }) => (
  <View style={styles.tag}>
    <View style={[styles.iconBg, { backgroundColor: iconBgColor }]}>
      <MaterialCommunityIcons name={icon} size={16} color="#333333" />
    </View>
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    borderColor: '#FFFFFF',
  },
  pillText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    width: width,
    height: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 36,
  },
  tagsWrapper: {
    alignItems: 'flex-start',
    width: width,
    overflow: 'hidden',
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 24,
    marginRight: 10,
  },
  tagIcon: {
    // Removed marginRight
  },
  iconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 30,
    paddingTop: 10,
    backgroundColor: '#F3EFFF',
  },
  buttonShadowWrapper: {
    shadowColor: '#FF6B6B',
    marginTop: 40,
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
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#444446',
    lineHeight: 18,
  },
});

export default IntroScreen;
