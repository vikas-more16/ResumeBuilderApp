import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Polygon, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

const TAB_OPTIONS = [
  { id: 'personality', title: 'Personality', icon: '🤩' },
  { id: 'streams', title: 'Streams', icon: '📖' },
  { id: 'roadmap', title: 'Roadmap', icon: '🎓' },
  { id: 'protips', title: 'Pro Tips', icon: '💡' },
];

const AssessmentReport = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('personality');

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.darkHeaderBg}>
        {/* Safe Area & Top Nav inside dark bg */}
        <SafeAreaView edges={['top']} />

        {/* Small pill at the top */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            style={{ padding: 5 }}
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.blueprintPill}>
            <Text style={styles.blueprintPillText}>✨ Your Career Blueprint</Text>
          </View>
          <View style={{ width: 34 }} />
        </View>

        <Text style={styles.headerTitle}>
          Tejpratap, Your Creativity is{'\n'}Magic!
        </Text>

        <View style={styles.ghostContainer}>
          {/* Using text emoji for the cute ghost for now */}
          <Text style={styles.ghostEmoji}>👻</Text>
          {/* Mini stars */}
          <Text style={[styles.miniStar, { top: 10, left: '30%' }]}>⭐</Text>
          <Text style={[styles.miniStar, { top: 30, right: '25%' }]}>⭐</Text>
        </View>
      </View>

      {/* Overlapping White Box */}
      <View style={styles.hollandCodeCard}>
        <Text style={styles.hollandTitle}>YOUR HOLLAND CODE</Text>
        <View style={styles.hollandRow}>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>A</Text>
            <Text style={styles.hollandLabel}>Primary</Text>
          </View>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>S</Text>
            <Text style={styles.hollandLabel}>Secondary</Text>
          </View>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>E</Text>
            <Text style={styles.hollandLabel}>Tertiary</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {TAB_OPTIONS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tabButton,
                isActive && styles.tabButtonActive,
              ]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderPersonalityTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.introText}>
        Holland code blends S, A and E indicating that your artistic, social and enterprising strengths move your
        hopes forward!
      </Text>

      <LinearGradient colors={['#7CE1FA', '#D9FAFF']} style={styles.futureSelfBanner}>
        <View style={styles.bannerRow}>
          <View style={styles.futureSelfIcon}><Text style={{ fontSize: 24 }}>🚀</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.futureSelfTitle}>Imagine Your Future Self ✨</Text>
            <Text style={styles.futureSelfSub}>A glimpse into the amazing future you are building.</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#333" />
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Your Personality DNA</Text>

      {/* Spider Chart Mock */}
      <View style={styles.radarContainer}>
        <Svg height="250" width="300" viewBox="0 0 100 100">
          {/* Hexagon outline */}
          <Polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#E2E2E2" strokeWidth="1" />
          <Polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="#E2E2E2" strokeWidth="1" />
          {/* Spokes */}
          <Line x1="50" y1="50" x2="50" y2="10" stroke="#E2E2E2" strokeWidth="1" />
          <Line x1="50" y1="50" x2="90" y2="30" stroke="#E2E2E2" strokeWidth="1" />
          <Line x1="50" y1="50" x2="90" y2="70" stroke="#E2E2E2" strokeWidth="1" />
          <Line x1="50" y1="50" x2="50" y2="90" stroke="#E2E2E2" strokeWidth="1" />
          <Line x1="50" y1="50" x2="10" y2="70" stroke="#E2E2E2" strokeWidth="1" />
          <Line x1="50" y1="50" x2="10" y2="30" stroke="#E2E2E2" strokeWidth="1" />

          {/* Data Polygon */}
          <Polygon points="50,20 80,40 70,60 50,70 20,60 30,30" fill="rgba(169, 91, 255, 0.4)" stroke="#A95BFF" strokeWidth="2" />
        </Svg>
        {/* Labels for radar using absolute pos inside a matching square wrapper */}
        <Text style={[styles.radarLabel, { top: 0, alignSelf: 'center' }]}>Realistic{'\n'}88%</Text>
        <Text style={[styles.radarLabel, { top: '25%', right: 0 }]}>Investigative{'\n'}86%</Text>
        <Text style={[styles.radarLabel, { bottom: '25%', right: 0 }]}>Artistic{'\n'}94%</Text>
        <Text style={[styles.radarLabel, { bottom: 0, alignSelf: 'center' }]}>Social{'\n'}91%</Text>
        <Text style={[styles.radarLabel, { bottom: '25%', left: 0 }]}>Enterprising{'\n'}88%</Text>
        <Text style={[styles.radarLabel, { top: '25%', left: 0 }]}>Conventional{'\n'}86%</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Personality Breakdown</Text>
      <View style={styles.breakdownRow}>
        <View style={[styles.breakdownBox, { backgroundColor: '#EBF4FF' }]}>
          <Text style={{ fontSize: 24 }}>🎨</Text>
          <Text style={[styles.breakdownTitle, { color: '#3B82F6' }]}>Artistic</Text>
          <Text style={styles.breakdownSub}>"The Creator"</Text>
        </View>
        <View style={[styles.breakdownBox, { backgroundColor: '#FFF7ED' }]}>
          <Text style={{ fontSize: 24 }}>🤝</Text>
          <Text style={[styles.breakdownTitle, { color: '#F59E0B' }]}>Social</Text>
          <Text style={styles.breakdownSub}>"The Helper"</Text>
        </View>
        <View style={[styles.breakdownBox, { backgroundColor: '#FCE7F3' }]}>
          <Text style={{ fontSize: 24 }}>🚀</Text>
          <Text style={[styles.breakdownTitle, { color: '#EC4899' }]}>Enterprising</Text>
          <Text style={styles.breakdownSub}>"The Persuader"</Text>
        </View>
      </View>

      <View style={styles.infoCardOutline}>
        <Text style={styles.infoText}>You are a natural trailblazer! Your blend of A/S/E means you shine in leadership and creative spaces.</Text>

        <Text style={styles.sectionTitleSmall}>Role Model For You</Text>
        <View style={styles.roleModelRow}>
          <View style={styles.roleModelAvatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.roleModelName}>Zaha Hadid</Text>
            <Text style={styles.roleModelDesc}>Architect, pushing design boundaries globally.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitleSmall}>Your Traits</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.traitPill}>
            <Text style={styles.traitIcon}>🎯</Text>
            <Text style={styles.traitText}>Visionary & Forward-thinking</Text>
          </View>
          <View style={styles.traitPill}>
            <Text style={styles.traitIcon}>🎯</Text>
            <Text style={styles.traitText}>Empathetic Communicator</Text>
          </View>
        </View>
      </View>

      <View style={styles.funFactBox}>
        <Text style={styles.funFactTitle}>🤩 Fun Fact</Text>
        <Text style={styles.funFactText}>
          Did you know? Those connected heavily with "A" domains generally enjoy building systems from scratch rather than following rules!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Career Clusters</Text>
      {[1, 2, 3].map(i => (
        <View key={i} style={styles.clusterCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.clusterTitle}>Creative Tech Innovators</Text>
            <Text style={styles.clusterDesc}>Dive into a world where creativity meets technology and scale.</Text>
          </View>
          <View style={styles.clusterMatch}><Text style={styles.clusterMatchText}>92%</Text></View>
        </View>
      ))}

      <View style={styles.hiddenJemOuter}>
        <View style={styles.hiddenJemBadge}>
          <Text style={styles.hiddenJemBadgeText}>💎 Hidden Jem</Text>
        </View>
        <View style={styles.hiddenJemInner}>
          <View style={{ alignItems: 'center', marginBottom: 15 }}>
            <Text style={{ fontSize: 28 }}>💼</Text>
            <Text style={styles.jemTitle}>Healthcare Experience Designer</Text>
            <View style={styles.jemPill}><Text style={styles.jemPillText}>🔥 96% FIT</Text></View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <Text style={{ fontSize: 24, marginRight: 10 }}>👨‍💼</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.jemSubTitle}>What they do:</Text>
              <Text style={styles.jemSubDesc}>Design patient-friendly healthcare systems to modernize health.</Text>
            </View>
          </View>

          <View style={styles.whyCoolBox}>
            <Text style={styles.jemSubTitle}>🔥 Why it's cool:</Text>
            <Text style={styles.jemSubDesc}>It merges logic with empathy to solve real world problems.</Text>
          </View>

          <Text style={styles.jemSubTitle}>Path</Text>
          <Text style={styles.jemSubDesc}>Pursue design paths, gain healthcare insights, and specialize in user experiences.</Text>
        </View>
      </View>
    </View>
  );

  const renderStreamsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Recommended Streams</Text>

      {/* Science Stream Card */}
      <View style={styles.streamCard}>
        <View style={styles.streamIconWrapper}><Text style={{ fontSize: 26 }}>🧪</Text></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingLeft: 60 }}>
          <Text style={styles.streamTitle}>Science</Text>
          <View style={styles.fitPill}><Text style={styles.fitPillText}>#1 Fit</Text></View>
        </View>

        <Text style={styles.streamDesc}>
          Science is perfect for your Realistic trait as it combines hands-on experiments with structured learning.
        </Text>

        <Text style={styles.sectionTitleSmall}>SUBJECTS</Text>
        <View style={styles.pillWrap}>
          <View style={styles.subjectPill}><Text style={styles.subjectPillText}>⚛️ Physics</Text></View>
          <View style={styles.subjectPill}><Text style={styles.subjectPillText}>🧪 Chemistry</Text></View>
          <View style={styles.subjectPill}><Text style={styles.subjectPillText}>🧬 Biology</Text></View>
          <View style={styles.subjectPill}><Text style={styles.subjectPillText}>🧮 Mathematics</Text></View>
          <View style={styles.subjectPill}><Text style={styles.subjectPillText}>💻 Computer Science</Text></View>
        </View>

        <Text style={styles.sectionTitleSmall}>A DAY IN THE LIFE</Text>
        <Text style={styles.streamDesc}>
          Every day is a new experiment, a new discovery, and a step closer to understanding the universe!
        </Text>
      </View>

      {/* Commerce Stream Card */}
      <View style={[styles.streamCard, { backgroundColor: '#FAF5FF' }]}>
        <View style={styles.streamIconWrapper}><Text style={{ fontSize: 26 }}>💼</Text></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingLeft: 60 }}>
          <Text style={styles.streamTitle}>Commerce</Text>
          <View style={[styles.fitPill, { backgroundColor: '#F3E8FF' }]}><Text style={[styles.fitPillText, { color: '#9333EA' }]}>#2 Fit</Text></View>
        </View>

        <Text style={styles.streamDesc}>
          Your Conventional trait loves the order and planning that commerce subjects provide, preparing you to structure big systems.
        </Text>

        <Text style={styles.sectionTitleSmall}>SUBJECTS</Text>
        <View style={styles.pillWrap}>
          <View style={[styles.subjectPill, { backgroundColor: '#F3E8FF' }]}><Text style={[styles.subjectPillText, { color: '#7E22CE' }]}>📈 Accountancy</Text></View>
          <View style={[styles.subjectPill, { backgroundColor: '#F3E8FF' }]}><Text style={[styles.subjectPillText, { color: '#7E22CE' }]}>💸 Business Studies</Text></View>
          <View style={[styles.subjectPill, { backgroundColor: '#F3E8FF' }]}><Text style={[styles.subjectPillText, { color: '#7E22CE' }]}>🧮 Mathematics</Text></View>
          <View style={[styles.subjectPill, { backgroundColor: '#F3E8FF' }]}><Text style={[styles.subjectPillText, { color: '#7E22CE' }]}>📊 Economics</Text></View>
        </View>

        <Text style={styles.sectionTitleSmall}>A DAY IN THE LIFE</Text>
        <Text style={styles.streamDesc}>
          Numbers turn into stories as you decode business mysteries, envisioning the market trends!
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: '#F59E0B', fontWeight: '700', fontSize: 14, marginBottom: 5 }}>😝 Career Joke</Text>
        <Text style={{ color: '#6B7280', fontSize: 13, textAlign: 'center' }}>
          Why was the math book sad?{'\n'}Because it had too many problems, just like our exams!
        </Text>
      </View>
    </View>
  );

  const renderRoadmapTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Learning Path</Text>

      {/* B.Des Card */}
      <View style={styles.roadmapCard}>
        <View style={{ flexDirection: 'row', marginBottom: 15, paddingRight: 40 }}>
          <View style={styles.roadmapBadgePrimary}><Text style={{ fontSize: 20 }}>🎓</Text></View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.roadmapCardTitle}>Bachelor of Design (B.Des)</Text>
            <View style={styles.roadmapMiniPill}><Text style={styles.roadmapMiniPillText}>Product Design</Text></View>
          </View>
        </View>

        <Text style={styles.roadmapDesc}>Ideal for honing your Artistic and Conventional talents with hands-on projects.</Text>

        <View style={styles.roadmapGreyBox}>
          <Text style={styles.roadmapGreyText}>Transforming ideas into tangible products through creative design studios.</Text>
        </View>

        <Text style={styles.sectionTitleSmall}>TOP COLLEGES</Text>
        <View style={styles.pillWrap}>
          <View style={styles.collegesPill}><Text style={styles.collegesPillText}>NID Ahmedabad</Text></View>
          <View style={styles.collegesPill}><Text style={styles.collegesPillText}>IIT Delhi</Text></View>
          <View style={styles.collegesPill}><Text style={styles.collegesPillText}>MIT Pune</Text></View>
          <View style={styles.collegesPill}><Text style={styles.collegesPillText}>IDC IIT Bombay</Text></View>
          <View style={styles.collegesPill}><Text style={styles.collegesPillText}>Srishti Bangalore</Text></View>
        </View>

        <Text style={styles.sectionTitleSmall}>ENTRANCE EXAMS</Text>
        <View style={styles.pillWrap}>
          <View style={styles.examPill}><Text style={styles.examPillText}>NID DAT</Text></View>
          <View style={styles.examPill}><Text style={styles.examPillText}>UCEED</Text></View>
          <View style={styles.examPill}><Text style={styles.examPillText}>CEED</Text></View>
        </View>

        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>View Full Pathway  →</Text>
        </TouchableOpacity>
      </View>

      {/* B.Tech Card */}
      <View style={[styles.roadmapCard, { backgroundColor: '#FFFBF0' }]}>
        <View style={{ flexDirection: 'row', marginBottom: 15, paddingRight: 40 }}>
          <View style={[styles.roadmapBadgePrimary, { backgroundColor: '#FDE68A' }]}><Text style={{ fontSize: 20 }}>🎓</Text></View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.roadmapCardTitle}>Bachelor of Technology (B.Tech)</Text>
            <View style={[styles.roadmapMiniPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.roadmapMiniPillText, { color: '#92400E' }]}>Biomedical Engineering</Text></View>
          </View>
        </View>

        <Text style={styles.roadmapDesc}>Perfect for Realistic and Conventional skills, focusing on impactful healthcare solutions.</Text>

        <View style={[styles.roadmapGreyBox, { backgroundColor: '#FDF8F6' }]}>
          <Text style={styles.roadmapGreyText}>Developing medical devices that make a difference in patient lives.</Text>
        </View>

        <Text style={styles.sectionTitleSmall}>TOP COLLEGES</Text>
        <View style={styles.pillWrap}>
          <View style={[styles.collegesPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.collegesPillText, { color: '#92400E' }]}>IIT Bombay</Text></View>
          <View style={[styles.collegesPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.collegesPillText, { color: '#92400E' }]}>VIT Vellore</Text></View>
          <View style={[styles.collegesPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.collegesPillText, { color: '#92400E' }]}>SRM University</Text></View>
        </View>

        <Text style={styles.sectionTitleSmall}>ENTRANCE EXAMS</Text>
        <View style={styles.pillWrap}>
          <View style={styles.examPill}><Text style={styles.examPillText}>JEE Main</Text></View>
          <View style={styles.examPill}><Text style={styles.examPillText}>VITEEE</Text></View>
          <View style={styles.examPill}><Text style={styles.examPillText}>BITSAT</Text></View>
        </View>

        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>View Full Pathway  →</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['#D2FAFC', '#E0F2FE']} style={styles.challengeBox}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ backgroundColor: '#FFFAF2', padding: 8, borderRadius: 20, marginRight: 10 }}><Text style={{ fontSize: 24 }}>🎯</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', color: '#111827' }}>Challenge</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Try this activity to explore your potential.</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: '#374151', marginTop: 15, lineHeight: 18 }}>
          Design a futuristic gadget sketch that could solve a real-world problem. Let your imagination go wild!
        </Text>
      </LinearGradient>
    </View>
  );

  const renderProTipsTab = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Pro Tips for product manager</Text>

      <View style={styles.tipsIllustrationWrapper}>
        <View style={styles.tipsCircleMock}>
          <Text style={{ fontSize: 80 }}>💡</Text>
        </View>
      </View>

      <Text style={styles.tipsSubTitle}>
        Simple tips to help you develop your strengths, explore opportunities, and move closer to your future goals.
      </Text>

      <View style={styles.tipCard}>
        <View style={[styles.tipBorderLine, { backgroundColor: '#3B82F6' }]} />
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text style={styles.tipCardTitle}>Embrace Your Creativity</Text>
          <Text style={styles.tipCardDesc}>Create a mini art project this week that reflects your unique perspective on any topic.</Text>
        </View>
        <View style={styles.tipIconCircle}><Text style={{ fontSize: 24 }}>🎨</Text></View>
      </View>

      <View style={styles.tipCard}>
        <View style={[styles.tipBorderLine, { backgroundColor: '#8B5CF6' }]} />
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text style={styles.tipCardTitle}>Explore New Fields</Text>
          <Text style={styles.tipCardDesc}>Take a free online course in an area you're curious about and expand your horizons.</Text>
        </View>
        <View style={styles.tipIconCircle}><Text style={{ fontSize: 24 }}>🔍</Text></View>
      </View>

      <View style={styles.tipCard}>
        <View style={[styles.tipBorderLine, { backgroundColor: '#F59E0B' }]} />
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text style={styles.tipCardTitle}>Plan Your Path</Text>
          <Text style={styles.tipCardDesc}>Draft a roadmap for the next year with goals and milestones. Start today, not tomorrow!</Text>
        </View>
        <View style={styles.tipIconCircle}><Text style={{ fontSize: 24 }}>📅</Text></View>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}

      <ScrollView
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'personality' && renderPersonalityTab()}
        {activeTab === 'streams' && renderStreamsTab()}
        {activeTab === 'roadmap' && renderRoadmapTab()}
        {activeTab === 'protips' && renderProTipsTab()}

        {/* Global Bottom Actions */}
        {(activeTab === 'personality' || activeTab === 'protips') && (
          <View style={styles.globalBottomSection}>
            {activeTab === 'personality' && (
              <TouchableOpacity style={styles.solidButton}>
                <Text style={styles.solidButtonText}>📥 Download Report</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.outlineActionBtn}>
              <Text style={styles.outlineActionBtnText}>▶ Take A New Test</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AssessmentReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFB',
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 70, // Create space for the overlapping card
  },
  darkHeaderBg: {
    backgroundColor: '#1E1A29', // Dark dramatic background
    paddingHorizontal: 20,
    paddingBottom: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  blueprintPill: {
    backgroundColor: '#352D4D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  blueprintPillText: {
    color: '#F3E8FF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 20,
  },
  ghostContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 80,
  },
  ghostEmoji: {
    fontSize: 60,
  },
  miniStar: {
    position: 'absolute',
    fontSize: 16,
  },
  hollandCodeCard: {
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  hollandTitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  hollandRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hollandItem: {
    alignItems: 'center',
  },
  hollandLetter: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  hollandLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 5,
  },
  tabsWrapper: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  tabsContainer: {
    paddingRight: 40,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#FFF1F2',
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FF6B6B',
    fontWeight: '700',
  },
  scrollArea: {
    paddingBottom: 40,
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 15,
  },
  futureSelfBanner: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  futureSelfIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  futureSelfTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  futureSelfSub: {
    fontSize: 12,
    color: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 15,
  },
  sectionTitleSmall: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 250,
    width: 300,
    alignSelf: 'center',
    marginBottom: 30,
  },
  radarLabel: {
    position: 'absolute',
    fontSize: 11,
    color: '#4B5563',
    textAlign: 'center',
    fontWeight: '500',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  breakdownBox: {
    width: (width - 60) / 3,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  breakdownTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  breakdownSub: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  infoCardOutline: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  roleModelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  roleModelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
  },
  roleModelName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  roleModelDesc: {
    fontSize: 11,
    color: '#6B7280',
  },
  traitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    width: '48%',
  },
  traitIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  traitText: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '500',
  },
  funFactBox: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  funFactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  funFactText: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  clusterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  clusterTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  clusterDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    paddingRight: 10,
  },
  clusterMatch: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clusterMatchText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
  },
  hiddenJemOuter: {
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 2,
    marginTop: 30,
    marginBottom: 20,
  },
  hiddenJemBadge: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  hiddenJemBadgeText: {
    fontWeight: '700',
    color: '#111827',
  },
  hiddenJemInner: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 20,
    paddingTop: 30,
  },
  jemTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
  },
  jemPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  jemPillText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  jemSubTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  jemSubDesc: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  whyCoolBox: {
    backgroundColor: '#FFF7ED',
    borderLeftWidth: 3,
    borderLeftColor: '#F97316',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  streamCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  streamIconWrapper: {
    position: 'absolute',
    top: -15,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  streamTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  fitPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  fitPillText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
  },
  streamDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  subjectPillText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '500',
  },
  roadmapCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  roadmapBadgePrimary: {
    width: 40,
    height: 40,
    backgroundColor: '#BAE6FD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadmapCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  roadmapMiniPill: {
    backgroundColor: '#BAE6FD',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  roadmapMiniPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0284C7',
  },
  roadmapDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 10,
  },
  roadmapGreyBox: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  roadmapGreyText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  collegesPill: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  collegesPillText: {
    fontSize: 11,
    color: '#0369A1',
    fontWeight: '500',
  },
  examPill: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  examPillText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#FFF',
  },
  outlineButtonText: {
    color: '#FF6B6B',
    fontWeight: '700',
    fontSize: 14,
  },
  challengeBox: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipsIllustrationWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tipsCircleMock: {
    width: 150,
    height: 150,
    backgroundColor: '#FEF3C7',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsSubTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    overflow: 'hidden',
  },
  tipBorderLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  tipCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    marginLeft: 10,
  },
  tipCardDesc: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
    marginLeft: 10,
  },
  tipIconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalBottomSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  solidButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 15,
  },
  solidButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  outlineActionBtn: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  outlineActionBtnText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '700',
  },
});