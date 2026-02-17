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
import { buildCSS } from '../utils/buildCSS';
import QRCode from 'react-native-qrcode-svg';

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

      // STEP 1: Fetch Resume Data FIRST
      const res = await axios.get(`${API_URL}/${resumeId}`);
      const resume = res.data.resume;

      if (!resume) {
        throw new Error('Resume not found');
      }

      // STEP 2: Send resumeData to finalize API
      const finalizeRes = await axios.post(
        `${API_URL}/${resumeId}/finalize`,
        resume, // 🔥 THIS WAS MISSING
      );
      const { resumeId: verifiedId, qrBase64 } = finalizeRes.data;


      const style = resume.resumeStyle;
      // Verification URL
      const verifyURL = `https://resumebuilderappbakend.onrender.com/api/resumes/verify/${verifiedId}`;
     const html = fusionResumeHTML(
       resume,
       buildCSS(style),
       qrBase64,
       verifiedId,
     );

      console.log('12');

      const fileBaseName =
        resume.title?.trim().replace(/\s+/g, '_') || 'resume';

      const options = {
        html,
        fileName: fileBaseName,
        directory: 'Documents',
      };
      console.log('13');

      const file = await generatePDF(options);
      console.log('14');
      const newPath = `${RNFS.DownloadDirectoryPath}/${fileBaseName}.pdf`;
      await RNFS.copyFile(file.filePath, newPath);

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
