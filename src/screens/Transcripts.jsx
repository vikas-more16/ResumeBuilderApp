import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Transcripts = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>No Transcripts available</Text>
      </View>
    </View>
  );
};

export default Transcripts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 140,
  },
});
