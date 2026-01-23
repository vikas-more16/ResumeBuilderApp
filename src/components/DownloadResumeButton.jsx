import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import notifee from '@notifee/react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { resumeHTML } from '../utils/resumeTemplate';

const DownloadResumeButton = ({ data }) => {
  const downloadPDF = async () => {
    try {
      const html = resumeHTML(data);

      const options = {
        html,
        fileName: (data.name || 'resume').replace(/\s+/g, '_'),
        directory: 'Documents',
      };

      const file = await generatePDF(options);

      const fileName = `${data.name || 'resume'}`.replace(/\s+/g, '_');
      const newPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

      await RNFS.copyFile(file.filePath, newPath);

      await notifee.displayNotification({
        title: 'Resume downloaded',
        body: `${fileName}.pdf`,
        android: {
          channelId: 'downloads',
          pressAction: {
            id: 'open-pdf',
          },
        },
        data: {
          filePath: newPath,
        },
      });
    } catch (error) {
      console.log('PDF ERROR:', error);
      alert('Failed to generate PDF');
    }
  };

  return (
    <TouchableOpacity style={styles.downloadBtn} onPress={downloadPDF}>
      <Text style={styles.downloadText}>Download PDF</Text>
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
