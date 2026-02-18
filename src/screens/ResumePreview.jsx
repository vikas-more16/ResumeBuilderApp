import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import DownloadResumeButton from '../components/DownloadResumeButton';
import { fusionResumeHTML } from '../utils/fusion.template';
import { buildCSS } from '../utils/buildCSS';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const ResumePreview = ({ route }) => {
  const A4_RATIO = 1.414;
  const previewWidth = width; // margin
  const previewHeight = previewWidth * A4_RATIO;

  const { resumeId } = route.params;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState(null);
  const [qrBase64, setQrBase64] = useState(null);
  const [verifiedId, setVerifiedId] = useState(null);
  const [barcodeBase64, setbarcodeBase64] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        // 1️⃣ Fetch draft resume
        const res = await axios.get(`${API_URL}/${resumeId}`);
        const resumeData = res.data.resume;

        setResume(resumeData);
        setStyle(resumeData.resumeStyle);

        // 2️⃣ Check if already finalized
        const checkRes = await axios.get(
          `${API_URL}/${resumeId}/check-finalized`,
        );

        if (checkRes.data.finalized) {
          setQrBase64(checkRes.data.qrBase64);
          setVerifiedId(checkRes.data.resumeId);
          setbarcodeBase64(checkRes.data.barcodeBase64);
        } else {
          // 3️⃣ Finalize once
          const finalizeRes = await axios.post(
            `${API_URL}/${resumeId}/finalize`,
            resumeData,
          );

          setQrBase64(finalizeRes.data.qrBase64);
          setVerifiedId(finalizeRes.data.resumeId);
          setbarcodeBase64(finalizeRes.data.barcodeBase64);
        }
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

  function calculateGrid(defaultText, fontSize) {
    const A4_WIDTH = 411.4;
    const A4_HEIGHT = 627.8;

    const PX_TO_PREVIEW = 0.4534;

    const lineHeightPx = fontSize * 1.065;
    const lineHeightPreview = lineHeightPx * PX_TO_PREVIEW;

    const rows = Math.floor(A4_HEIGHT / lineHeightPreview);

    const approxCharWidthPx = fontSize * 0.4;

    const textWidthPreview =
      approxCharWidthPx * defaultText.length * PX_TO_PREVIEW;

    const horizontalSpacingPreview = fontSize * 2 * PX_TO_PREVIEW;

    const totalBlockWidth = textWidthPreview + horizontalSpacingPreview;

    const columns = Math.floor(A4_WIDTH / totalBlockWidth);

    return { rows, columns, lineHeightPx, horizontalSpacingPreview };
  }

  const defaultText = 'UTKAL UNIVERSITY';
  const fontSize = 40;

  const { rows, columns, lineHeightPx, horizontalSpacingPreview } =
    calculateGrid(defaultText, fontSize);

  console.log('====================================');
  console.log(rows, columns);
  console.log('====================================');
  const watermartSytle = {
    fontSize: fontSize,
    lineHeightPx: lineHeightPx,
    horizontalSpacingPreview: horizontalSpacingPreview,
  };
  const watermarkConfig = {
    defaultText,
    fontSize,
    rows,
    columns,

    rowOverrides: [
      { index: 15, text: resume.personalInfo?.firstName || 'STUDENT_NAME' },
      { index: 25, text: resume.education?.[0]?.program || 'COURSE_NAME' },
      { index: 40, text: resume.personalInfo?.phone || 'PHONE_NO' },
    ],

    colOverrides: [],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== PREVIEW ===== */}
      <WebView
        originWhitelist={['*']}
        source={{
          html: fusionResumeHTML(
            resume,
            buildCSS(style, watermartSytle),
            qrBase64,
            verifiedId,
            barcodeBase64,
            watermarkConfig,
          ),
        }}
        style={{
          width: '21cm', // A4 width
          height: '29.7cm', // A4 height
          backgroundColor: '#fff',
        }}
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
