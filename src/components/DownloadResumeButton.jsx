import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import notifee from '@notifee/react-native';
import axios from 'axios';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { fusionResumeHTML } from '../utils/fusion.template';

/* ================= API ================= */
const API_URL = 'http://10.0.2.2:5000/api/resumes';

const DownloadResumeButton = ({ resumeId }) => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    if (!resumeId) {
      Alert.alert('Error', 'Resume ID missing');
      return;
    }

    try {
      setLoading(true);

      /* ---------- 1. FETCH RESUME ---------- */
      const res = await axios.get(`${API_URL}/${resumeId}`);
      const resume = res.data.resume;

      if (!resume) {
        throw new Error('Resume not found');
      }

      /* ---------- 2. GENERATE HTML ---------- */
      const html = fusionResumeHTML(resume);

      const fileBaseName =
        resume.title?.trim().replace(/\s+/g, '_') || 'resume';

      /* ---------- 3. GENERATE PDF ---------- */
      const options = {
        html,
        fileName: fileBaseName,
        directory: 'Documents',
      };

      const file = await generatePDF(options);

      /* ---------- 4. MOVE TO DOWNLOADS ---------- */
      const newPath = `${RNFS.DownloadDirectoryPath}/${fileBaseName}.pdf`;
      await RNFS.copyFile(file.filePath, newPath);

      /* ---------- 5. NOTIFICATION ---------- */
      await notifee.displayNotification({
        title: 'Resume downloaded',
        body: `${fileBaseName}.pdf`,
        android: {
          channelId: 'downloads',
          pressAction: { id: 'open-pdf' },
        },
        data: { filePath: newPath },
      });
    } catch (error) {
      console.log('PDF ERROR:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.downloadBtn}
      onPress={downloadPDF}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.downloadText}>Download PDF</Text>
      )}
    </TouchableOpacity>
  );
};

export default DownloadResumeButton;

const styles = StyleSheet.create({
  downloadBtn: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
