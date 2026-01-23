import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { resumeHTML } from '../utils/resumeTemplate';
import { setCurrentResume } from '../redux/actions/resume.actions';
import { useDispatch } from 'react-redux';

const ResumePreview = ({ route, navigation }) => {
  const dispatch = useDispatch();
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

      const fileName = `${data.name || 'resume'}`.replace(/\s+/g, '_');
      const newPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

      await RNFS.copyFile(file.filePath, newPath);

      alert('PDF saved successfully');
      console.log(newPath);

      try {
        await FileViewer.open(newPath, {
          showOpenWithDialog: true,
          mimeType: 'application/pdf',
        });
      } catch (error) {
        console.log('PDF OPEN ERROR:', error);
        alert(error?.message || 'Unable to open PDF');
      }
    } catch (error) {
      console.log('PDF ERROR:', error);
      alert('Failed to generate PDF');
    }
  };
  const handleEdit = () => {
    dispatch(setCurrentResume(resume));
    navigation.navigate('Truresume');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preview}>
        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.subText}>
          {data.email} • {data.phone}
        </Text>

        <Text style={styles.subText}>{data.location}</Text>

        <Text style={styles.section}>Summary</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>
      <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
        <Text style={styles.downloadText}>Edit Resume</Text>
      </TouchableOpacity>
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
  editBtn: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
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
