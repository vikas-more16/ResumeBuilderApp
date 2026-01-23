import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setCurrentResume } from '../redux/actions/resume.actions';
import { useDispatch } from 'react-redux';
import DownloadResumeButton from '../components/DownloadResumeButton';

const ResumePreview = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { resume } = route.params;
  const data = resume.data;
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
        <Text style={styles.editText}>Edit Resume</Text>
      </TouchableOpacity>
      <DownloadResumeButton data={data} />
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
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
