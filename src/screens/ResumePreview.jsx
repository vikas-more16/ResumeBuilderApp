import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import DownloadResumeButton from '../components/DownloadResumeButton';
import { fusionResumeHTML } from '../utils/fusion.template';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const ResumePreview = ({ route }) => {
  const { resumeId } = route.params;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        setResume(res.data.resume);
      } catch (error) {
        Alert.alert('Error', 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!resume) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== PREVIEW ===== */}
      <WebView
        originWhitelist={['*']}
        source={{ html: fusionResumeHTML(resume) }}
        style={styles.webview}
      />

      {/* ===== DOWNLOAD ===== */}
      <View style={styles.footer}>
        <DownloadResumeButton resumeId={resume._id} />
      </View>
    </SafeAreaView>
  );
};

export default ResumePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  webview: {
    flex: 1,
  },

  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
