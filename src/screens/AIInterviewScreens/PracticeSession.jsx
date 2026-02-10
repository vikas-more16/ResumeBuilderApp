import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Image, ImageBackground } from 'react-native';

const PracticeSession = ({ navigation }) => {
  const [showHint, setShowHint] = useState(false);
  const TOTAL_STEPS = 5;
  const CURRENT_STEP = 1;
  const [showQuestionImage, setShowQuestionImage] = useState(false);
  const [inputMode, setInputMode] = useState(null);

  const handleSend = () => {
    setShowQuestionImage(true);
    setInputMode('text');
  };

  const handleVoice = () => {
    setShowQuestionImage(true);
    setInputMode('voice');
  };

  const handleRetake = () => {
    setShowQuestionImage(false);
    setShowHint(false);
    setInputMode(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEF8ED', '#FFFFFF']}
        locations={[0, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.topGradient}
      >
        {/* HEADER */}
        <View style={styles.header}>
          {/* Left spacer */}
          <View style={styles.leftSpacer} />

          {/* Center title */}
          <Text style={styles.headerTitle}>Practice Session</Text>

          {/* Right End button */}
          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => navigation.navigate('Feedback')}
          >
            <Icon name="call-end" size={18} color="#fff" />
            <Text style={styles.endText}>End</Text>
          </TouchableOpacity>
        </View>

        {/* SUB HEADER */}
        <View style={styles.subHeader}>
          {/* Company Row */}
          <View style={styles.companyRow}>
            <Icons name="videocam-outline" size={16} color="#FF6652" />
            <Text style={styles.companyText}>
              Amazon - Frontend Development
            </Text>
          </View>

          {/* Progress Info */}
          <View style={styles.progressRow}>
            <View style={styles.questionRow}>
              <Icons
                name="chatbubble-ellipses-outline"
                size={14}
                color="#64748b"
              />
              <Text style={styles.progressText}>Question 01/05</Text>
            </View>

            <Text style={styles.progressText}>04:32 remaining</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.stepBar}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepSegment,
                index < CURRENT_STEP && styles.stepActive,
              ]}
            />
          ))}
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* QUESTION IMAGE / AI QUESTION */}
        <View style={styles.questionImageWrapper}>
          <ImageBackground
            source={
              showQuestionImage
                ? require('../../assets/Question.png')
                : require('../../assets/Waiting1.png')
            }
            style={[
              styles.questionBg,
              { height: showQuestionImage ? 120 : 350 },
            ]}
            imageStyle={styles.questionBgImage}
            resizeMode="contain"
          >
            <View
  style={
    showQuestionImage
      ? styles.questionTextWrapperQuestion
      : styles.questionTextWrapperQuestionImage
  }
>
  <Text style={styles.questionText}>
    Can you start by introducing yourself and briefly talk about
    your professional background?
  </Text>
</View>

          </ImageBackground>
        </View>

        {/* HINT */}
        {!showQuestionImage ? (
          <View style={styles.hintWrapper}>
            <TouchableOpacity
              style={styles.hintHeader}
              onPress={() => setShowHint(!showHint)}
            >
              <View style={styles.hintLeft}>
                <Icon name="lightbulb-outline" size={16} color="#FF6652" />
                <Text style={styles.hintTitle}>Hint</Text>
              </View>
              <Icons
                name={showHint ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#64748b"
              />
            </TouchableOpacity>

            {showHint && (
              <Text style={styles.hintText}>
                Focus on the STAR method (Situation, Task, Action, Result).
                Mention specific tools or strategies.
              </Text>
            )}
          </View>
        ) : (
          <></>
        )}

        {/* USER MESSAGE */}
        {showQuestionImage ? (
          <>
            <View style={styles.userMessageWrapper}>
              <View style={styles.userHeader}>
                <Text style={styles.youText}>You</Text>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={styles.userAvatar}
                />
              </View>

              {inputMode == 'text' ? (
                <View style={styles.userMessageCard}>
                  <Text style={styles.chatText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </View>
              ) : (
                <View style={styles.userMessageCard}>
                  <View style={styles.voiceMessageRow}>
                    {/* Pause Icon */}
                    <View style={styles.voicePauseBtn}>
                      <Icon name="pause" size={40} color="#FF6652" />
                    </View>

                    {/* Waveform (static UI) */}
                    <View style={styles.voiceWaveform}>
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />
                      <View style={styles.waveBar} />
                      <View style={[styles.waveBar, styles.waveBarSmall]} />

                      <View style={styles.waveBar} />
                    </View>
                  </View>

                  {/* Duration */}
                  <Text style={styles.voiceDuration}>00:24 / 00:32</Text>
                </View>
              )}
            </View>

            {/* FEEDBACK CARD */}
            <View style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <View style={styles.feedbackLeft}>
                  <Icon name="lightbulb-outline" size={18} color="#FF6652" />
                  <Text style={styles.feedbackTitle}>Feedback</Text>
                </View>

                <TouchableOpacity style={styles.skipAudio}>
                  <Icon name="play-circle-outline" size={18} color="#FF6652" />
                  <Text style={styles.skipAudioText}>Skip Audio</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.feedbackText}>
                Focus on the <Text style={styles.boldText}>STAR</Text> method
                (Situation, Task, Action, Result). Mention specific tools or
                strategies.
              </Text>

              <View style={styles.feedbackPoint}>
                <Text style={styles.feedbackNumber}>1.</Text>
                <View style={styles.feedbackBody}>
                  <Text style={styles.feedbackHeading}>
                    Understand Accessibility Guidelines
                  </Text>
                  <Text style={styles.feedbackDesc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi congue orci ut varius convallis. Aenean nisi risus,
                    venenatis ac lorem nec, suscipit feugiat nunc.
                  </Text>
                </View>
              </View>

              <View style={styles.feedbackPoint}>
                <Text style={styles.feedbackNumber}>2.</Text>
                <View style={styles.feedbackBody}>
                  <Text style={styles.feedbackHeading}>
                    Understand Accessibility Guidelines
                  </Text>
                  <Text style={styles.feedbackDesc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi congue orci ut varius convallis. Aenean nisi risus,
                    venenatis ac lorem nec, suscipit feugiat nunc.
                  </Text>
                </View>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.actionWrapper}>
              <TouchableOpacity style={styles.finalizeBtn}>
                <Icon name="check-circle-outline" size={18} color="#fff" />
                <Text style={styles.finalizeText}>Finalize Answer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake}>
                <Icon name="refresh" size={18} color="#FF6652" />
                <Text style={styles.retakeText}>Retake</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>

      {/* INPUT AREA */}
      {!showQuestionImage ? (
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type Here..."
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.voiceBtn} onPress={handleVoice}>
            <Icon name="mic" size={16} color="#FF6652" />
            <Text style={styles.voiceText}>Voice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Icon name="send" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PracticeSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topGradient: {
    paddingTop: 8,
    paddingHorizontal: 20,
  },

  header: {
    height: 48,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
  },

  endBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D92121',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  endText: {
    color: '#fff',
    fontSize: 15,
  },

  leftSpacer: {
    width: 60,
  },

  subHeader: {
    paddingHorizontal: 10,
  },

  companyRow: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 6,
  },

  companyText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  progressText: {
    fontSize: 12,
    color: '#64748b',
  },

  stepBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 6,
  },

  stepSegment: {
    flex: 1,
    height: 5,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },

  stepActive: {
    backgroundColor: '#FF6652',
  },

  /* CONTENT */
  content: {
    padding: 20,
    width: '100%',
  },

  questionImageWrapper: {
    width: '100%',
    marginTop: 20,
  },

  questionBg: {
    width: '100%',
    justifyContent: 'center',
  },

  questionBgImage: {
    borderRadius: 18,
  },

  questionTextWrapperQuestionImage: {
    marginTop:150,
    paddingHorizontal:40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 14,
    borderRadius: 14,
  },

  questionTextWrapperQuestion: {
    width:'75%',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 4,
    borderRadius: 14,
  },

  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 20,
    textAlign: 'center',
  },

  questionImage: {
    width: '100%',
  },

  /* HINT */
  hintWrapper: {
    marginTop: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
  },

  hintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hintLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  hintTitle: {
    fontSize: 14,
    fontWeight: '500',
  },

  hintText: {
    marginTop: 12,
    fontSize: 15,
    color: '#475569',
    lineHeight: 18,
  },

  /* AI MESSAGE */
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },

  aiBubble: {
    flex: 1,
    backgroundColor: '#EDE9FE',
    padding: 16,
    borderRadius: 18,
  },

  /* USER MESSAGE */
  userMessageWrapper: {
    width: '100%',
    marginTop: 15,
    alignItems: 'flex-end',
  },

  userHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  youText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginRight: 6,
  },

  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  userMessageCard: {
    width: '80%',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 16,
  },

  chatText: {
    fontSize: 15,
    color: '#1e293b',
    lineHeight: 20,
    textAlign: 'right',
  },

  /* INPUT BAR */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },

  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    fontSize: 14,
  },

  voiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6652',
  },

  voiceText: {
    fontSize: 12,
    color: '#FF6652',
  },

  sendBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#FF6652',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* FEEDBACK CARD */
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 20,
  },

  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  feedbackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  feedbackTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },

  skipAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  skipAudioText: {
    fontSize: 13,
    color: '#FF6652',
    fontWeight: '500',
  },

  feedbackText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },

  boldText: {
    fontWeight: '700',
    color: '#1e293b',
  },

  feedbackPoint: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  feedbackNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
    color: '#1e293b',
  },

  feedbackBody: {
    flex: 1,
  },

  feedbackHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },

  feedbackDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },

  /* ACTION BUTTONS */
  actionWrapper: {
    marginTop: 24,
  },

  finalizeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FF6652',
    paddingVertical: 14,
    borderRadius: 28,
    marginBottom: 14,
  },

  finalizeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  retakeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#FF6652',
    paddingVertical: 14,
    borderRadius: 28,
  },

  retakeText: {
    color: '#FF6652',
    fontSize: 16,
    fontWeight: '600',
  },

  /* VOICE MESSAGE BUBBLE */
  voiceMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  voicePauseBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  voiceWaveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  waveBar: {
    width: 6,
    height: 18,
    backgroundColor: '#FF6652',
    borderRadius: 3,
  },

  waveBarSmall: {
    height: 10,
    opacity: 0.5,
  },

  voiceDuration: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 60,
  },
});
