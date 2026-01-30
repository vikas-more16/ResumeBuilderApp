import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { fusionResumeHTML } from '../utils/fusion.template';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const EditResumeStyle = ({ route }) => {
  const { resumeId } = route.params;

  const [resume, setResume] = useState(null);
  const [resumeCSS, setResumeCSS] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        setResume(res.data.resume);
        setResumeCSS(res.data.resume.resumeCSS || '');
      } catch (error) {
        Alert.alert('Error', 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  const updateFontSize = size => {
    setResumeCSS(prev =>
      prev.replace(
        /h1\s*\{[^}]*\}/,
        `
        h1 {
          font-size: ${size}px;
        }
      `,
      ),
    );
  };

  const saveStyle = async () => {
    try {
      setSaving(true);
      await axios.put(`${API_URL}/${resumeId}/style`, {
        resumeCSS,
      });
      Alert.alert('Success', 'Style saved permanently');
    } catch {
      Alert.alert('Error', 'Failed to save style');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: fusionResumeHTML(resume, resumeCSS) }}
        style={styles.webview}
      />

      <View style={styles.controls}>
        <Text>Header Font Size</Text>

        <Slider
          minimumValue={40}
          maximumValue={90}
          step={1}
          onValueChange={updateFontSize}
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={saveStyle}
          disabled={saving}
        >
          <Text style={styles.saveText}>
            {saving ? 'Saving...' : 'Save Style'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditResumeStyle;

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },

  controls: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  saveBtn: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
