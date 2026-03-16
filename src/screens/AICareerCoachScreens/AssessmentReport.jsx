import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polygon, Line } from 'react-native-svg';
import { Report } from '../../utils/CareerCoachReport';

const { width } = Dimensions.get('window');

const TAB_OPTIONS = [
  { id: 'personality', title: 'Personality', icon: '🤩' },
  { id: 'streams', title: 'Streams', icon: '📖' },
  { id: 'roadmap', title: 'Roadmap', icon: '🎓' },
  { id: 'protips', title: 'Pro Tips', icon: '💡' },
];

const AssessmentReport = ({ navigation }) => {
  const [expandedFuture, setExpandedFuture] = useState(false);
  const [activeTab, setActiveTab] = useState('personality');
  const [activePersonalityTab, setActivePersonalityTab] = useState(0);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require('../../assets/AICareerCoach/ReportScreenEmoji.png')}
        style={styles.darkHeaderBg}
        resizeMode="cover"
      >
        {/* Safe Area & Top Nav inside dark bg */}
        <SafeAreaView edges={['top']} />

        {/* Small pill at the top */}
        <View style={styles.topBar}>
          <View style={styles.blueprintPill}>
            <Image
              source={require('../../assets/Sparkle.png')}
              style={{ width: 14, height: 14, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.blueprintPillText}>Your Career Blueprint</Text>
          </View>
          <View style={{ width: 34 }} />
        </View>

        <Text style={styles.headerTitle}>
          {Report.student_name} , {Report.hero_subtitle}
        </Text>
      </ImageBackground>

      {/* Overlapping White Box */}
      <View style={styles.hollandCodeCard}>
        <Text style={styles.hollandTitle}>YOUR HOLLAND CODE</Text>
        <View style={styles.hollandRow}>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>
              {Report.riasec_code.charAt(0)}
            </Text>
            <Text style={styles.hollandLabel}>Primary</Text>
          </View>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>
              {Report.riasec_code.charAt(1)}
            </Text>
            <Text style={styles.hollandLabel}>Secondary</Text>
          </View>
          <View style={styles.hollandItem}>
            <Text style={styles.hollandLetter}>
              {Report.riasec_code.charAt(2)}
            </Text>
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
        {TAB_OPTIONS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
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
      <Text style={styles.introText}>{Report.hype_intro}</Text>

      <LinearGradient
        colors={['#7CE1FA', '#D9FAFF']}
        style={styles.futureSelfBanner}
      >
        <View style={styles.bannerRow}>
          {/* PNG Icon */}
          <Image
            source={require('../../assets/AICareerCoach/future_visualization.png')}
            style={styles.futureIcon}
            resizeMode="contain"
          />

          {/* Text Content */}
          <View style={{ flex: 1 }}>
            <Text style={styles.futureSelfTitle}>
              Imagine Your Future Self ✨
            </Text>

            <Text
              style={styles.futureSelfSub}
              numberOfLines={expandedFuture ? undefined : 2}
            >
              {Report.future_visualization}
            </Text>
          </View>

          {/* Expand Button */}
          <TouchableOpacity
            onPress={() => setExpandedFuture(!expandedFuture)}
            style={styles.arrowButton}
          >
            <Icon
              name={expandedFuture ? 'chevron-up' : 'arrow-forward'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Your Personality DNA</Text>

      {/* Spider Chart Mock */}
      <View style={styles.radarContainer}>
        <Svg height="250" width="300" viewBox="0 0 100 100">
          {/* Hexagon outline */}
          <Polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Polygon
            points="50,25 75,40 75,60 50,75 25,60 25,40"
            fill="none"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          {/* Spokes */}
          <Line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="50"
            x2="90"
            y2="30"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="50"
            x2="90"
            y2="70"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="50"
            x2="50"
            y2="90"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="50"
            x2="10"
            y2="70"
            stroke="#E2E2E2"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="50"
            x2="10"
            y2="30"
            stroke="#E2E2E2"
            strokeWidth="1"
          />

          {/* Data Polygon */}
          <Polygon
            points="50,20 80,40 70,60 50,70 20,60 30,30"
            fill="rgba(169, 91, 255, 0.4)"
            stroke="#A95BFF"
            strokeWidth="2"
          />
        </Svg>
        {/* Labels for radar using absolute pos inside a matching square wrapper */}
        <Text style={[styles.radarLabel, { top: 0, alignSelf: 'center' }]}>
          Realistic{'\n'}88%
        </Text>
        <Text style={[styles.radarLabel, { top: '25%', right: 0 }]}>
          Investigative{'\n'}86%
        </Text>
        <Text style={[styles.radarLabel, { bottom: '25%', right: 0 }]}>
          Artistic{'\n'}94%
        </Text>
        <Text style={[styles.radarLabel, { bottom: 0, alignSelf: 'center' }]}>
          Social{'\n'}91%
        </Text>
        <Text style={[styles.radarLabel, { bottom: '25%', left: 0 }]}>
          Enterprising{'\n'}88%
        </Text>
        <Text style={[styles.radarLabel, { top: '25%', left: 0 }]}>
          Conventional{'\n'}86%
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Your Personality Breakdown</Text>
      <View style={styles.breakdownRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActivePersonalityTab(0)}
          style={styles.breakdownBoxArtistic}
        >
          <Text style={{ fontSize: 24 }}>
            {Report.top_3_riasec_explanations[0].emoji}
          </Text>
          <Text style={[styles.breakdownTitle]}>
            {Report.top_3_riasec_explanations[0].name}
          </Text>
          <Text
            style={[
              styles.breakdownSub,
              {
                color: '#3B82F6',
              },
            ]}
          >
            "{Report.top_3_riasec_explanations[0].vibe}"
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActivePersonalityTab(1)}
          style={styles.breakdownBoxSocial}
        >
          <Text style={{ fontSize: 24 }}>
            {Report.top_3_riasec_explanations[1].emoji}
          </Text>
          <Text style={[styles.breakdownTitle]}>
            {Report.top_3_riasec_explanations[1].name}
          </Text>
          <Text
            style={[
              styles.breakdownSub,
              {
                color: '#F59E0B',
              },
            ]}
          >
            "{Report.top_3_riasec_explanations[1].vibe}"
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActivePersonalityTab(2)}
          style={styles.breakdownBoxEnterprising}
        >
          <Text style={{ fontSize: 24 }}>
            {Report.top_3_riasec_explanations[2].emoji}
          </Text>
          <Text style={styles.breakdownTitle}>
            {Report.top_3_riasec_explanations[2].name}
          </Text>
          <Text
            style={[
              styles.breakdownSub,
              {
                color: '#8B5CF6',
              },
            ]}
          >
            "{Report.top_3_riasec_explanations[2].vibe}"
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.infoCardOutline,
          {
            backgroundColor:
              activePersonalityTab === 0
                ? '#E9F0FF'
                : activePersonalityTab === 1
                ? '#FFF8EA'
                : '#F4E6FF',
          },
        ]}
      >
        <View
          style={[
            styles.triangleIndicator,
            {
              left:
                activePersonalityTab === 0
                  ? '15%'
                  : activePersonalityTab === 1
                  ? '52%'
                  : '90%',
              borderBottomColor:
                activePersonalityTab === 0
                  ? '#E9F0FF'
                  : activePersonalityTab === 1
                  ? '#FFF8EA'
                  : '#F4E6FF',
            },
          ]}
        />

        <Text style={styles.personalityMeaningText}>
          {Report.top_3_riasec_explanations[activePersonalityTab].meaning}
        </Text>

        <Text style={styles.personalitySubhead}>Legends like you</Text>
        <View style={styles.legendCard}>
          <Image
            source={
              Report.top_3_riasec_explanations[activePersonalityTab]
                .role_models[0].image_url
            }
            style={styles.legendAvatar}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.legendName}>
              {
                Report.top_3_riasec_explanations[activePersonalityTab]
                  .role_models[0].name
              }
            </Text>
            <Text style={styles.legendDesc} numberOfLines={2}>
              {
                Report.top_3_riasec_explanations[activePersonalityTab]
                  .role_models[0].achievement
              }
            </Text>
          </View>
        </View>

        <Text style={styles.personalitySubhead}>Your Traits</Text>
        <View style={styles.traitsCardsRow}>
          <View style={styles.traitCard}>
            <View style={styles.traitMedalCircle}>
              <Image
                source={require('../../assets/AICareerCoach/medal.png')}
                resizeMode="cover"
                style={styles.traitMedalEmoji}
              />
            </View>
            <Text style={styles.traitCardText}>
              "
              {Report.top_3_riasec_explanations[activePersonalityTab].traits[0]}
              "
            </Text>
          </View>
          <View style={styles.traitCard}>
            <View style={styles.traitMedalCircle}>
              <Image
                source={require('../../assets/AICareerCoach/medal.png')}
                resizeMode="cover"
                style={styles.traitMedalEmoji}
              />
            </View>
            <Text style={styles.traitCardText}>
              "
              {Report.top_3_riasec_explanations[activePersonalityTab].traits[1]}
              "
            </Text>
          </View>
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "
            {
              Report.top_3_riasec_explanations[activePersonalityTab]
                .inspiration_quote.quote
            }
            "
          </Text>
          <Text style={styles.quoteBy}>
            —{' '}
            {
              Report.top_3_riasec_explanations[activePersonalityTab]
                .inspiration_quote.by
            }
          </Text>
        </View>
      </View>

      <View style={styles.funFactContainer}>
        <View style={styles.funFactBoxNewInner}>
          <View style={styles.funFactHeaderRow}>
            <Image
              source={require('../../assets/AICareerCoach/FunFact.png')}
              style={styles.funFactEmoji}
              resizeMode="contain"
            />
            <Text style={styles.funFactTitleNew}>Fun Fact</Text>
          </View>
          <Text style={styles.funFactTextNew}>
            {Report.inspiration_corner.fun_fact}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Career Clusters</Text>
      {[1, 2, 3].map(i => (
        <LinearGradient
          key={i}
          colors={['#E9F0FF', '#E9F0FF', '#F9FBFF']}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.clusterCard}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.clusterTitle}>Creative Tech Innovators</Text>
            <Text style={styles.clusterDesc}>
              Dive into a world where creativity meets technology and society.
            </Text>
          </View>
          <View style={styles.clusterRightCol}>
            <View style={styles.clusterMatch}>
              <Text style={styles.clusterMatchText}>85%</Text>
            </View>
            <Image
              source={require('../../assets/AICareerCoach/CareerClusters.png')}
              style={styles.clusterImage}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      ))}

      <View style={styles.hiddenJemOuter}>
        <View style={styles.hiddenJemBadge}>
          <Text style={{ fontSize: 20 }}>💎</Text>
          <Text style={styles.hiddenJemBadgeText}>Hidden Jem</Text>
        </View>

        <View style={{ position: 'relative' }}>
          {/* Stack Decorations */}
          <View style={styles.hiddenJemStackBottom0} />
          <View style={styles.hiddenJemStackBottom1} />
          <View style={styles.hiddenJemStackBottom2} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ zIndex: 5 }}
            snapToInterval={width - 25}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 25 }}
          >
            {Report.hidden_gem_careers.map((gem, index) => (
              <View
                key={index}
                style={[
                  styles.hiddenJemInner,
                  { width: width - 40, marginRight: 15 },
                ]}
              >
                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                  <View style={styles.jemIconCircle}>
                    <Text style={{ fontSize: 24 }}>💼</Text>
                  </View>
                  <Text style={styles.jemTitle}>{gem.title}</Text>
                  <View style={styles.jemPill}>
                    <Text style={styles.jemPillText}>
                      💰 {gem.salary_potential}
                    </Text>
                  </View>
                </View>

                <View style={styles.jemWhatRow}>
                  <Image
                    source={require('../../assets/AICareerCoach/whattheydo.png')}
                    style={styles.jemWhatImage}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.jemSubTitle, { marginBottom: 2 }]}>
                      What they do:
                    </Text>
                    <Text style={[styles.jemSubDesc, { color: '#6B7280' }]}>
                      {gem.what_they_do}
                    </Text>
                  </View>
                </View>

                <LinearGradient
                  colors={['#FFF2E5', '#FFFFFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.whyCoolBox}
                >
                  <Text
                    style={[
                      styles.jemSubTitle,
                      { color: '#F59E0B', marginBottom: 4 },
                    ]}
                  >
                    🔥 Why it's cool:
                  </Text>
                  <Text style={[styles.jemSubDesc, { color: '#111827' }]}>
                    {gem.why_its_cool}
                  </Text>
                </LinearGradient>

                <Text style={styles.jemSubTitle}>Path:</Text>
                <Text style={[styles.jemSubDesc, { color: '#6B7280' }]}>
                  {gem.how_to_get_there}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  const renderStreamsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Recommended Streams</Text>

      {/* First Stream Card */}
      <View style={styles.streamCard}>
        <View style={styles.streamIconWrapper}>
          <Text style={{ fontSize: 40 }}>
            {Report.subject_stream_recommendations[0].stream_emoji}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingLeft: 70,
            paddingTop: 5,
          }}
        >
          <Text style={styles.streamTitle}>
            {Report.subject_stream_recommendations[0].stream_name}
          </Text>
          <View style={styles.fitPill}>
            <Text style={styles.fitPillText}>#1 Fit</Text>
          </View>
        </View>

        <Text style={styles.streamDesc}>
          {Report.subject_stream_recommendations[0].why_suitable}
        </Text>

        <Text style={styles.sectionTitleSmall}>SUBJECTS</Text>

        <View style={styles.pillWrap}>
          {Report.subject_stream_recommendations[0].subjects.map(
            (subject, index) => (
              <View key={index} style={styles.subjectPill}>
                <Text style={styles.subjectPillText}>{subject}</Text>
              </View>
            ),
          )}
        </View>

        <Text style={styles.sectionTitleSmall}>A DAY IN THE LIFE</Text>
        <Text style={styles.streamDesc}>
          {Report.subject_stream_recommendations[0].day_in_the_life}
        </Text>
      </View>

      {/* Second Stream Card */}
      <View style={[styles.streamCard, { backgroundColor: '#F3EDFA' }]}>
        <View style={styles.streamIconWrapper}>
          <Text style={{ fontSize: 40 }}>
            {Report.subject_stream_recommendations[1].stream_emoji}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingLeft: 70,
            paddingTop: 5,
          }}
        >
          <Text style={styles.streamTitle}>
            {Report.subject_stream_recommendations[1].stream_name}
          </Text>
          <View style={[styles.fitPill, { backgroundColor: '#FFF' }]}>
            <Text style={[styles.fitPillText, { color: '#9333EA' }]}>
              #2 Fit
            </Text>
          </View>
        </View>

        <Text style={styles.streamDesc}>
          {Report.subject_stream_recommendations[1].why_suitable}
        </Text>

        <Text style={styles.sectionTitleSmall}>SUBJECTS</Text>
        <View style={styles.pillWrap}>
          {Report.subject_stream_recommendations[1].subjects.map(
            (subject, index) => (
              <View
                key={index}
                style={[styles.subjectPill, { backgroundColor: '#EBE0FF' }]}
              >
                <Text style={[styles.subjectPillText, { color: '#111827' }]}>
                  {subject}
                </Text>
              </View>
            ),
          )}
        </View>

        <Text style={styles.sectionTitleSmall}>A DAY IN THE LIFE</Text>
        <Text style={styles.streamDesc}>
          {Report.subject_stream_recommendations[1].day_in_the_life}
        </Text>
      </View>

      <View style={styles.careerJokeContainer}>
        <Text style={styles.careerJokeTitle}>😝 Career Joke</Text>
        <Text style={{ color: '#6B7280', fontSize: 13, textAlign: 'center' }}>
          {Report.inspiration_corner.career_joke}
        </Text>
      </View>
    </View>
  );

  const renderRoadmapTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Learning Path</Text>

      {Report.academic_suggestions.map((suggestion, index) => {
        const isAlternate = index % 2 !== 0;

        const cardBg = '#FFFFFF';
        const headerBg = isAlternate ? '#FFF8EA' : '#DDEEFF';
        const starBg = isAlternate ? '#FEE8BC' : '#9CCCFF';
        const miniPillBg = isAlternate ? '#FEE8BC' : '#9CCCFF';
        const miniPillTextColor = '#333333';
        const greyBoxBg = '#F7F9FC';
        const pillBg = isAlternate ? '#FFF8EA' : '#DDEEFF';
        const pillTextColor = '#212121';

        return (
          <View
            key={index}
            style={[styles.roadmapCard, { backgroundColor: cardBg }]}
          >
            <View style={[styles.roadmapHeader, { backgroundColor: headerBg }]}>
              <View style={styles.roadmapBadgePrimary}>
                <View style={[styles.starLayer, { backgroundColor: starBg }]} />
                <View
                  style={[
                    styles.starLayer,
                    {
                      backgroundColor: starBg,
                      transform: [{ rotate: '30deg' }],
                    },
                  ]}
                />
                <View
                  style={[
                    styles.starLayer,
                    {
                      backgroundColor: starBg,
                      transform: [{ rotate: '60deg' }],
                    },
                  ]}
                />
                <Text style={{ fontSize: 22, zIndex: 10 }}>🎓</Text>
              </View>
              <View
                style={{ marginLeft: 15, flex: 1, justifyContent: 'center' }}
              >
                <Text style={styles.roadmapCardTitle}>
                  {suggestion.degree_name}
                </Text>
                <View
                  style={[
                    styles.roadmapMiniPill,
                    { backgroundColor: miniPillBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.roadmapMiniPillText,
                      { color: miniPillTextColor },
                    ]}
                  >
                    {suggestion.specialization}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.roadmapBody}>
              <Text style={styles.roadmapDesc}>
                {suggestion.why_recommended}
              </Text>

              <View
                style={[styles.roadmapGreyBox, { backgroundColor: greyBoxBg }]}
              >
                <Text style={styles.roadmapGreyText}>
                  {suggestion.what_youll_love}
                </Text>
              </View>

              <Text style={[styles.sectionTitleSmall, { fontSize: 13 }]}>
                TOP COLLEGES
              </Text>

              <View style={styles.pillWrap}>
                {suggestion.top_colleges.map((college, cIndex) => (
                  <View
                    key={cIndex}
                    style={[styles.collegesPill, { backgroundColor: pillBg }]}
                  >
                    <Text
                      style={[
                        styles.collegesPillText,
                        { color: pillTextColor },
                      ]}
                    >
                      {college}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.roadmapDivider} />

              <Text style={[styles.sectionTitleSmall, { fontSize: 13 }]}>
                ENTRANCE EXAMS
              </Text>

              <View style={styles.pillWrap}>
                {suggestion.entrance_exams.map((exam, eIndex) => (
                  <View key={eIndex} style={styles.examPill}>
                    <Text style={styles.examPillText}>{exam}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>
                  View Full Pathway →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <ImageBackground
        source={require('../../assets/AICareerCoach/ChallengeBackground.png')}
        style={styles.challengeBox}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#FFFAF2',
              padding: 8,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 24 }}>🎯</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', color: '#111827' }}>
              Challenge
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Try this activity to explore your potential.
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: '#374151',
            marginTop: 15,
            lineHeight: 18,
          }}
        >
          {Report.inspiration_corner.challenge_of_the_week}
        </Text>
      </ImageBackground>
    </View>
  );

  const renderProTipsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Pro Tips for product manager</Text>
      <View style={styles.tipsIllustrationWrapper}>
        <Image
          style={styles.tipspng}
          source={require('../../assets/AICareerCoach/tips.png')}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.tipsSubTitle}>
        Simple tips to help you develop your strengths, explore opportunities,
        and move closer to your future goals.
      </Text>
      import Icon from 'react-native-vector-icons/Ionicons';
      {Report.advice_notes.map((note, index) => (
        <LinearGradient
          key={index}
          colors={['#FBFCFF', '#D7E9FF']}
          locations={[0.1, 0.9]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.tipCard}
        >
          <View style={styles.tipBorderLine} />

          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text style={styles.tipCardTitle}>{note.title}</Text>
            <Text style={styles.tipCardDesc}>{note.message}</Text>
          </View>

          <View style={styles.tipIconWrapper}>
            <Text style={{ fontSize: 28 }}>🎨</Text>
          </View>
        </LinearGradient>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        bounces={false}
      >
        {renderHeader()}
        {renderTabs()}

        {activeTab === 'personality' && renderPersonalityTab()}
        {activeTab === 'streams' && renderStreamsTab()}
        {activeTab === 'roadmap' && renderRoadmapTab()}
        {activeTab === 'protips' && renderProTipsTab()}

        {/* Global Bottom Actions */}
        {(activeTab === 'personality' || activeTab === 'protips') && (
          <View style={styles.globalBottomSection}>
            {activeTab === 'personality' && (
              <TouchableOpacity style={styles.solidButton}>
                <Text style={styles.solidButtonText}>
                  {' '}
                  <Icon name="download" size={20} color="#FFFFFF" /> Download
                  Report
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.outlineActionBtn}>
              <View style={styles.redSquareIcon}>
                <Icon name="arrow-back-outline" size={14} color="#FF6B6B" />
              </View>
              <Text style={styles.outlineActionBtnText}>Take A New Test</Text>
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
    height: 320, // controls the header height
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  blueprintPill: {
    backgroundColor: '#FFFFFFCC',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginTop: 10,
    paddingHorizontal: 16,
    marginLeft: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  blueprintPillText: {
    color: '#212121',
    fontSize: 13,
    fontWeight: '5  00',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 10,
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
    backgroundColor: '#FAFAFB',
    paddingTop: 10,
    paddingLeft: 20,
    zIndex: 10,
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
  },

  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },

  futureIcon: {
    width: 100,
    height: 100,
    marginRight: 1,
  },

  futureSelfTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  futureSelfSub: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },

  arrowButton: {
    paddingLeft: 10,
  },
  personalityBreakdown: {
    marginTop: 1,
    fontSize: 22,
    color: '#6B7280',
    marginBottom: 30,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '500',
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
    marginBottom: 20,
  },
  breakdownBoxArtistic: {
    width: (width - 60) / 3,
    backgroundColor: '#E9F0FF',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  breakdownBoxSocial: {
    width: (width - 60) / 3,
    backgroundColor: '#FFF8EA',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  breakdownBoxEnterprising: {
    width: (width - 60) / 3,
    backgroundColor: '#F4E6FF',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  breakdownBoxActiveBlue: {
    backgroundColor: '#FFFFFF',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  breakdownBoxActiveAmber: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  breakdownBoxActivePurple: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  activeBreakdownBoxSocial: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFF',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  activeBreakdownBoxEnterprising: {
    borderColor: '#8B5CF6',
    backgroundColor: '#FFF',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  triangleIndicator: {
    position: 'absolute',
    top: -20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: -10,
  },
  infoText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  personalityMeaningText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#68738B',
    lineHeight: 18,
    marginBottom: 12,
  },
  personalitySubhead: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 10,
    marginBottom: 20,
  },
  legendCard: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  legendAvatar: {
    width: 55,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
    top: -30,
  },
  legendName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  legendDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#68738B',
    lineHeight: 15,
  },
  traitsCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  traitCard: {
    width: '48%',
    backgroundColor: '#D6E3FF',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#D6E3FF',
    position: 'relative',
  },
  traitMedalCircle: {
    marginTop: 20,
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitMedalEmoji: {
    width: 25,
    height: 25,
  },
  traitCardText: {
    fontSize: 14,
    color: '#11111',
    lineHeight: 20,
    textAlign: 'center',
  },
  quoteBox: {
    marginTop: 12,
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  quoteText: {
    fontSize: 18,
    color: '#4B5563',
    lineHeight: 15,
    textAlign: 'center',
  },
  quoteBy: {
    marginTop: 8,
    fontSize: 16,
    color: '#2563EB',
    textAlign: 'center',
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
  roleModelAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
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
  roleModelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  roleModelPortrait: {
    width: 80,
    height: 110,
    borderRadius: 18,
    marginRight: 12,
  },
  roleModelContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  roleModelPill: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    marginBottom: 4,
  },
  traitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  traitIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  traitIcon: {
    fontSize: 14,
  },
  traitText: {
    fontSize: 10,
    color: '#111827',
    fontWeight: '600',
    flex: 1,
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
  funFactContainer: {
    backgroundColor: '#F7F9FC',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingVertical: 35,
    marginBottom: 30,
  },
  funFactBoxNewInner: {
    borderLeftWidth: 2,
    borderLeftColor: '#3B82F6',
    paddingLeft: 16,
  },
  funFactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  funFactEmoji: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  funFactTitleNew: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
  funFactTextNew: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  clusterCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  clusterTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
  },
  clusterDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  clusterRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  clusterMatch: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  clusterMatchText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  clusterImage: {
    width: 79,
    height: 42,
  },
  hiddenJemOuter: {
    backgroundColor: '#FFF8EB', // Very light creamy yellow background
    paddingVertical: 30,
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: -20, // Stretch to the edge of the tab content
  },
  hiddenJemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  hiddenJemBadgeText: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 20,
    marginLeft: 6,
  },
  hiddenJemStackBottom0: {
    position: 'absolute',
    bottom: -3,
    left: 40,
    right: 40,
    height: 50,
    backgroundColor: '#ffffffbc',
    borderRadius: 18,
    zIndex: 0,
    elevation: 1,
  },
  hiddenJemStackBottom1: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    height: 40,
    backgroundColor: '#ffffffd4',
    borderRadius: 18,
    zIndex: 1,
    elevation: 1,
  },
  hiddenJemStackBottom2: {
    position: 'absolute',
    bottom: 2,
    left: 60,
    right: 60,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 18,
    opacity: 0.5,
    zIndex: 0,
    elevation: 0,
  },
  hiddenJemInner: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    paddingTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  jemIconCircle: {
    backgroundColor: '#FFF7EB',
    width: 40,
    height: 40,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  jemTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  jemPill: {
    marginTop: 8,
    backgroundColor: '#FFF7EB',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  jemPillText: {
    textAlign: 'center',
    color: '#F0AB45',
    fontSize: 12,
    fontWeight: '700',
  },
  jemSubTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  jemSubDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  whyCoolBox: {
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  streamCard: {
    backgroundColor: '#F0F8FF', // Light blue
    borderRadius: 16,
    padding: 24,
    marginTop: 35,
    marginBottom: 20,
  },
  streamIconWrapper: {
    position: 'absolute',
    top: -20,
    left: 20,
    width: 65,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  streamTitle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  fitPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  fitPillText: {
    color: '#3B82F6',
    fontSize: 11,
    fontWeight: '700',
  },
  streamDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 8,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectPill: {
    backgroundColor: '#E5F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  subjectPillText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '600',
  },
  careerJokeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: -20,
    backgroundColor: '#f3f4fb',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  careerJokeTitle: {
    color: '#F59E0B',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  roadmapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  roadmapHeader: {
    flexDirection: 'row',
    backgroundColor: '#E5F0FF',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  roadmapBody: {
    padding: 20,
  },
  roadmapDivider: {
    height: 1.5,
    backgroundColor: '#E2E8F0',
    marginVertical: 15,
  },
  roadmapBadgePrimary: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starLayer: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  roadmapCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  roadmapMiniPill: {
    backgroundColor: '#93C5FD',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  roadmapMiniPillText: {
    fontSize: 12,
    color: '#1E3A8A',
  },
  roadmapDesc: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 15,
  },
  roadmapGreyBox: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 8,
  },
  roadmapGreyText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  collegesPill: {
    backgroundColor: '#E5F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  collegesPillText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  examPill: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  examPillText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#FF735C',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#FFF',
  },
  outlineButtonText: {
    color: '#FF735C',
    fontWeight: '600',
    fontSize: 18,
  },
  challengeBox: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipsIllustrationWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  tipspng: {
    width: 250,
    height: 250,
  },
  tipsSubTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
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
    backgroundColor: '#3B82F6',
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
    color: '#6B7280',
    lineHeight: 18,
    marginLeft: 10,
  },
  tipIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalBottomSection: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  solidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: '#FF6F61',
  },
  solidButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineActionBtn: {
    borderWidth: 2,
    borderColor: '#FF6F61',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outlineActionBtnText: {
    color: '#FF6F61',
    fontSize: 14,
    fontWeight: '700',
  },
  redSquareIcon: {
    borderWidth: 2,
    borderColor: '#FF6F61',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  traitBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 6,
    marginTop: 4,
  },
  traitBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readMoreLine: {
    height: 1,
    backgroundColor: '#D1D5DB',
    width: 60,
    marginHorizontal: 10,
  },
  readMoreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  jemWhatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  jemWhatImage: {
    width: 75,
    height: 75,
    marginRight: 15,
  },
});
