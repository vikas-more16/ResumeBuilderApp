import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

const Feedback = ({ navigation }) => {
  const [openQ, setOpenQ] = useState(1);

  const SIZE = 140;
  const STROKE_WIDTH = 15;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const SCORE = 75;

  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * SCORE) / 100;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={['#F1F8FF', '#FFFFFF']} style={styles.headerBg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <IoniconsIcon name="arrow-back" size={20} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Feedback & Analysis</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* SCORE CARD */}
        <View style={styles.scoreCard}>
          <View style={styles.circleWrapper}>
            <Svg width={SIZE} height={SIZE}>
              {/* Incomplete (25%) */}
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#F7F9FC"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {/* Complete (75%) */}
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#4F7CFF"
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${SIZE / 2}, ${SIZE / 2}`}
              />
            </Svg>

            {/* Center Text */}
            <View style={styles.centerText}>
              <Text style={styles.scoreText}>75%</Text>
              <Text style={styles.scoreSub}>Overall Score</Text>
            </View>
          </View>

          <Text style={styles.excellentText}>Excellent Work!</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <IoniconsIcon name="chatbox-ellipses-outline" size={25} color="#22c55e" />
              <Text style={styles.statTitle}>Intermediate</Text>
              <Text style={styles.statSub}>Response Depth</Text>
            </View>

            <View style={styles.statBox}>
              <IoniconsIcon name="pulse-outline" size={25} color="#ef4444" />
              <Text style={styles.statTitle}>High</Text>
              <Text style={styles.statSub}>Clarity</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* SUMMARY */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.progressRow}>
            <IoniconsIcon name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.progressText}>Progress: Question 5 of 5</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <IoniconsIcon name="sparkles-outline" size={30} color="#ff6b57" />
          <Text style={styles.summaryText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
            augue purus. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus.
          </Text>
        </View>
      </View>

      {/* QUESTION WISE FEEDBACK */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question wise feedback</Text>

        {[1, 2, 3, 4, 5].map(q => (
          <View key={q} style={styles.qaCard}>
            <TouchableOpacity
              style={styles.qaHeader}
              onPress={() => setOpenQ(openQ === q ? null : q)}
            >
              <Text style={styles.qaTitle}>
                Q{q}: Can you introduce yourself?
              </Text>
              <IoniconsIcon
                name={openQ === q ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#64748b"
              />
            </TouchableOpacity>

            {openQ === q && (
              <>
                <Text style={styles.answerLabel}>
                  Your Answer:{' '}
                  <Text style={styles.answerText}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec laoreet condimentum finibus."
                  </Text>
                </Text>

                <View style={styles.feedbackBox}>
                  <Text style={styles.feedbackTitle}>Feedback:</Text>
                  <Text style={styles.feedbackText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla bibendum diam vel felis convallis.
                  </Text>
                </View>

                <View style={styles.badgeRow}>
                  <View style={styles.badge}>
                    <EntypoIcon name="bar-graph" size={20} color="#ff6b57" />
                    <Text style={styles.badgeText}>Score : 8/10</Text>
                  </View>
                  <View style={styles.badge}>
                    <IoniconsIcon name="chatbox-ellipses-outline" size={20} color="#ff6b57" />
                    <Text style={styles.badgeText}>Depth: Advance</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.recoBox}>
          <Text style={styles.recoText}>
            1. Provide more concrete technical examples{'\n'}
            2. Focus on measurable outcomes where possible{'\n'}
            3. Explain how tech tools (like SSR or JWT) were applied
          </Text>
        </View>
      </View>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.downloadBtn}>
        <FeatherIcon name="download" size={18} color="#fff" />
        <Text style={styles.downloadText}>Download Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.newBtn}
        onPress={() => navigation.navigate('PracticeSession')}
      >
        <IoniconsIcon name="refresh-outline" size={18} color="#ff6b57" />
        <Text style={styles.newText}>Start New Interview</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBg: {
    paddingBottom: 16,
  },

  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: 'Manrope',
    fontWeight: '700',
  },

  scoreCard: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },

  circleWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },

  centerText: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [
    { translateX: -35 },
    { translateY: -30 },
  ],
  alignItems: 'center',
},


  circle: {
    height: 140,
    width: 140,
    borderRadius: 80,
    borderWidth: 15,
    borderColor: '#4F7CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 28,
    fontFamily: 'Manrope',
    fontWeight: '700',
  },

  scoreSub: {
    fontSize: 12,
    color: '#64748b',
  },

  excellentText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },

  statTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 6,
  },

  statSub: {
    fontSize: 14,
    color: '#64748b',
  },

  section: {
    paddingHorizontal: 25,
    marginTop: 20,
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  progressText: {
    fontSize: 14,
    color: '#64748b',
  },

  summaryBox: {
    backgroundColor: '#FFF5F4',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },

  summaryText: {
    fontSize: 17,
    lineHeight: 22,
    color: '#374151',
    flex: 1,
  },

  qaCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },

  qaHeader: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },

  qaTitle: {
    fontSize: 18,
    fontWeight: '500',
  },

  answerLabel: {
    marginTop: 8,
    fontSize: 16,
    color: '#ef4444',
  },

  answerText: {
    color: '#475569',
  },

  feedbackBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  feedbackTitle: {
    fontWeight: '600',
    fontSize:16,
    marginBottom: 4,
  },

  feedbackText: {
    fontSize: 16,
    color: '#475569',
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff1f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 14,
  },

  recoBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  recoText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#475569',
  },

  downloadBtn: {
    backgroundColor: '#ff6b57',
    marginHorizontal: 25,
    marginTop: 20,
    borderRadius: 24,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  downloadText: {
    fontFamily: 'Manrope',
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },

  newBtn: {
    marginHorizontal: 25,
    marginTop: 12,
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    borderColor: '#ff6b57',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  newText: {
    fontFamily: 'Manrope',
    fontSize: 18,
    color: '#ff6b57',
    fontWeight: '700',
  },
});
