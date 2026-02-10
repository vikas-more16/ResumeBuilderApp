import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/Ionicons';

const GradientIcon = ({ name, size = 18 }) => {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <View
          style={{
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={name} size={size} color="black" />
        </View>
      }
    >
      <LinearGradient
        colors={['#FA71CD', '#6A3199']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: size, height: size }}
      />
    </MaskedView>
  );
};

const GetStartScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backBtn}>
          <Icon name="arrow-back" size={20} color="#000" />
        </View>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            <GradientIcon name="sparkles" size={18} />
            AI Interview Preparation
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={['rgba(255,255,255,0)', '#ffffff', 'rgba(255,255,255,0.7)']}
        style={styles.bottomContainer}
      >
        <View style={styles.bottomInnerContainer}>
          <Text style={styles.title}>Get Interview-Ready with AI</Text>

          <Text style={styles.subtitle}>
            Practice real interview questions & get instant feedback
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('InterviewStepOne')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Start Your Prep</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default GetStartScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#CFDBFF',
  },

  header: {
    height: 50,
    marginTop: 40,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    top: 38,
    left: 20,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tag: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 13,
  },

  bottomContainer: {
    marginTop: 'auto',
    height: 488,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },

  bottomInnerContainer: {
    width: 300,
  },

  title: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'center',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 10,
    fontFamily: 'Manrope',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
    textAlign: 'center',
    color: '#475569',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#ff6b57',
    paddingVertical: 14,
    borderRadius: 30,
    width: 350,
  },

  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
