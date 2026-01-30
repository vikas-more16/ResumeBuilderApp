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
import { buildCSS } from '../utils/buildCSS';
import ColorPicker from 'react-native-wheel-color-picker';
import ColorSquare from '../components/ColorSquare';
import Modal from 'react-native-modal';

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
  const [tempColor, setTempColor] = useState('#000000');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [activeColorKey, setActiveColorKey] = useState(null);

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

  const openColorPicker = key => {
    setActiveColorKey(key);
    setTempColor(style[key] || '#000000');
    setColorPickerVisible(true);
  };

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Body Color</Text>
        </View>

        <Text>Photo Size: {style.photoSize}</Text>
        <Slider
          minimumValue={80}
          maximumValue={200}
          step={1}
          value={style.photoSize}
          onValueChange={updatePhotoSize}
        />
        <Text>Photo Radius: {style.photoRadius}</Text>
        <Slider
          minimumValue={0}
          maximumValue={50}
          step={1}
          value={style.photoRadius}
          onValueChange={updatePhotoRadius}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Heading Color</Text>
          <ColorSquare
            color={style.h1Color}
            onPress={() => openColorPicker('h1Color')}
          />
        </View>
        <Slider
          minimumValue={40}
          maximumValue={90}
          step={1}
          value={style.h1Size}
          onValueChange={updateH1FontSize}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Sub Headings Size: {style.subSize}</Text>
          <ColorSquare
            color={style.subColor}
            onPress={() => openColorPicker('subColor')}
          />
        </View>
        <Slider
          minimumValue={20}
          maximumValue={40}
          step={1}
          value={style.subSize}
          onValueChange={updateSubFontSize}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Section Size: {style.sectionSize}</Text>
          <ColorSquare
            color={style.bodyColor}
            onPress={() => openColorPicker('bodyColor')}
          />
        </View>
        <Slider
          minimumValue={30}
          maximumValue={50}
          step={1}
          value={style.sectionSize}
          onValueChange={updateSectionFontSize}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>item Size: {style.itemSize}</Text>
        </View>
        <Slider
          minimumValue={20}
          maximumValue={35}
          step={1}
          value={style.itemSize}
          onValueChange={updateItemFontSize}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>muted Size: {style.mutedSize}</Text>
          <ColorSquare
            color={style.mutedColor}
            onPress={() => openColorPicker('mutedColor')}
          />
        </View>
        <Slider
          minimumValue={20}
          maximumValue={35}
          step={1}
          value={style.mutedSize}
          onValueChange={updateMutedFontSize}
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
      <Modal
        isVisible={colorPickerVisible}
        backdropOpacity={0.5}
        onBackdropPress={() => setColorPickerVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pick a color</Text>

          <View style={styles.colorPickerWrapper}>
            <ColorPicker
              color={tempColor}
              onColorChange={setTempColor}
              thumbSize={30}
              sliderSize={30}
              noSnap={true}
              row={false}
              style={{ flex: 1 }}
            />
          </View>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              if (!activeColorKey) return;
              setStyle(prev => ({
                ...prev,
                [activeColorKey]: tempColor,
              }));
              setColorPickerVisible(false);
            }}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setColorPickerVisible(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'stretch',
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },

  colorPickerWrapper: {
    height: 280,
    justifyContent: 'center',
  },

  doneBtn: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  doneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#9ca3af',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelText: {
    color: '#fff',
    fontSize: 14,
  },
});
