import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { fusionResumeHTML } from '../utils/fusion.template';
import { Picker } from '@react-native-picker/picker';
import { buildCSS } from '../utils/buildCSS';

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
  const [style, setStyle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${resumeId}`);
        const resumeData = res.data.resume;

        setResume(resumeData);
        setStyle(resumeData.resumeStyle);
      } catch {
        Alert.alert('Error', 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  const updateH1FontSize = value => {
    setStyle(prev => ({ ...prev, h1Size: value }));
  };

  const updateSubFontSize = value => {
    setStyle(prev => ({ ...prev, subSize: value }));
  };

  const updateSectionFontSize = value => {
    setStyle(prev => ({ ...prev, sectionSize: value }));
  };

  const updateItemFontSize = value => {
    setStyle(prev => ({ ...prev, itemSize: value }));
  };

  const updateMutedFontSize = value => {
    setStyle(prev => ({ ...prev, mutedSize: value }));
  };

  const updateFontFamily = value => {
    setStyle(prev => ({ ...prev, bodyFontFamily: value }));
  };

  const updateBodyColor = value => {
    setStyle(prev => ({ ...prev, bodyColor: value }));
  };

  const updateH1Color = value => {
    setStyle(prev => ({ ...prev, h1Color: value }));
  };

  const updateSubColor = value => {
    setStyle(prev => ({ ...prev, subColor: value }));
  };

  const updateMutedColor = value => {
    setStyle(prev => ({ ...prev, mutedColor: value }));
  };

  const updatePhotoSize = value => {
    setStyle(prev => ({ ...prev, photoSize: value }));
  };

  const updatePhotoRadius = value => {
    setStyle(prev => ({ ...prev, photoRadius: value }));
  };

  const saveStyle = async () => {
    try {
      setSaving(true);
      await axios.patch(`${API_URL}/${resumeId}/style`, {
        resumeStyle: style,
      });
      Alert.alert('Success', 'Style saved');
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
        source={{ html: fusionResumeHTML(resume, buildCSS(style)) }}
        style={styles.webview}
      />

      <View style={styles.controls}>
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
            selectedValue={style.bodyFontFamily}
            onValueChange={updateFontFamily}
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

        <Text>Photo Size: {style.photoSize}</Text>
        <Slider
          minimumValue={80}
          maximumValue={200}
          step={1}
          value={style.photoSize}
          onValueChange={updatePhotoSize}
        />
        <Text>Heading Size: {style.h1Size}</Text>
        <Slider
          minimumValue={40}
          maximumValue={90}
          step={1}
          value={style.h1Size}
          onValueChange={updateH1FontSize}
        />

        <Text>Sub Headings Size: {style.subSize}</Text>
        <Slider
          minimumValue={20}
          maximumValue={40}
          step={1}
          value={style.subSize}
          onValueChange={updateSubFontSize}
        />
        <Text>Section Size: {style.sectionSize}</Text>
        <Slider
          minimumValue={30}
          maximumValue={50}
          step={1}
          value={style.sectionSize}
          onValueChange={updateSectionFontSize}
        />
        <Text>item Size: {style.itemSize}</Text>
        <Slider
          minimumValue={20}
          maximumValue={35}
          step={1}
          value={style.itemSize}
          onValueChange={updateItemFontSize}
        />
        <Text>muted Size: {style.mutedSize}</Text>
        <Slider
          minimumValue={20}
          maximumValue={35}
          step={1}
          value={style.mutedSize}
          onValueChange={updateMutedFontSize}
        />

        {/* <Text>Heading Color</Text>
          <TextInput
            value={style.h1Color}
            onChangeText={updateH1Color}
            placeholder="#000000"
            style={{ borderWidth: 1, padding: 8 }}
          /> */}
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
