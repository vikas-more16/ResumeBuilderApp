import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const ColorSquare = ({ color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginVertical: 6 }}>
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: color || '#000',
        borderWidth: 1,
        borderColor: '#ccc',
      }}
    />
  </TouchableOpacity>
);

export default ColorSquare;
