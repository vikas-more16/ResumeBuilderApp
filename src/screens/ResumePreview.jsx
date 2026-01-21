import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { resumeHTML } from '../utils/resumeTemplate';

const ResumePreview = ({ route }) => {
  const { resume } = route.params;
  const data = resume.data;

  const downloadPDF = async () => {
    try {
      const html = resumeHTML(data);

      const options = {
        html,
        fileName: (data.name || 'resume').replace(/\s+/g, '_'),
        directory: 'Documents',
      };
      const file = await generatePDF(options);

      const newPath = `${RNFS.DownloadDirectoryPath}/yash.pdf`;
      console.log(newPath);

      await RNFS.copyFile(file.filePath, newPath);

      alert('PDF saved successfully');
    } catch (error) {
      console.log('PDF ERROR:', error);
      alert('Failed to generate PDF');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= PREVIEW CARD ================= */}
      <View style={styles.preview}>
        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.subText}>
          {data.email} • {data.phone}
        </Text>

        <Text style={styles.subText}>{data.location}</Text>

        <Text style={styles.section}>Summary</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      {/* ================= ACTION BUTTON ================= */}
      <TouchableOpacity style={styles.downloadBtn} onPress={downloadPDF}>
        <Text style={styles.downloadText}>Download PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResumePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
  },

  preview: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  subText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  section: {
    marginTop: 12,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 13,
    marginTop: 4,
  },

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
