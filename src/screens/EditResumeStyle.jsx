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
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

const FONT_FAMILIES = [
  {
    label: 'Arial',
    value: 'Arial, Helvetica, sans-serif',
  },
  {
    label: 'Times New Roman',
    value: '"Times New Roman", Times, serif',
  },
  {
    label: 'Georgia',
    value: 'Georgia, serif',
  },
  {
    label: 'Verdana',
    value: 'Verdana, Geneva, sans-serif',
  },
  {
    label: 'Courier New',
    value: '"Courier New", Courier, monospace',
  },
];

const EditResumeStyle = ({ route }) => {
  const { resumeId } = route.params;

  const [resume, setResume] = useState(null);
  const [resumeCSS, setResumeCSS] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bodyFontFamily, setBodyFontFamily] = useState(
    'Arial, Helvetica, sans-serif',
  );
  const [h1Size, setH1Size] = useState(70);

  const readBodyFontFamily = (
    css,
    fallback = 'Arial, Helvetica, sans-serif',
  ) => {
    if (!css) return fallback;

    const match = css.match(/body\s*\{[^}]*font-family\s*:\s*([^;]+);/i);

    return match ? match[1].trim() : fallback;
  };

  const readH1FontSize = (css, fallback = 70) => {
    if (!css) return fallback;

    const match = css.match(/h1\s*\{[^}]*font-size\s*:\s*(\d+)px/i);
    return match ? parseInt(match[1], 10) : fallback;
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        const resumeData = res.data.resume;

        setResume(resumeData);
        setResumeCSS(resumeData.resumeCSS || '');
        setBodyFontFamily(
          readBodyFontFamily(
            resumeData.resumeCSS,
            'Arial, Helvetica, sans-serif',
          ),
        );
        setH1Size(readH1FontSize(resumeData.resumeCSS, 70));
      } catch (error) {
        Alert.alert('Error', 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  const updateBodyFontFamily = fontFamily => {
    setBodyFontFamily(fontFamily);

    setResumeCSS(prev =>
      prev.replace(
        /body\s*\{[^}]*\}/,
        prev.match(/body\s*\{[^}]*\}/i)
          ? prev.replace(
              /font-family\s*:\s*[^;]+;/i,
              `font-family: ${fontFamily};`,
            )
          : `body { font-family: ${fontFamily}; }`,
      ),
    );
  };

  const updateH1FontSize = size => {
    setH1Size(size);

    setResumeCSS(prev =>
      prev.replace(/h1\s*\{[^}]*\}/, `h1 { font-size: ${size}px; }`),
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
        <Text>Name Font Size : {h1Size}</Text>

        <Slider
          minimumValue={40}
          maximumValue={90}
          step={1}
          value={h1Size}
          onValueChange={updateH1FontSize}
        />
        <Text style={{ marginTop: 12 }}>Body Font Family</Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            marginTop: 6,
          }}
        >
          <Picker
            selectedValue={bodyFontFamily}
            onValueChange={updateBodyFontFamily}
          >
            {FONT_FAMILIES.map(font => (
              <Picker.Item
                key={font.value}
                label={font.label}
                value={font.value}
              />
            ))}
          </Picker>
        </View>

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
