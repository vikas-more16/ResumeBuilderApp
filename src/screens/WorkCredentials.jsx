import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const WorkCredentials = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>No Work Credentials available</Text>
      </View>
    </View>
  );
};

export default WorkCredentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 140,
  },
});
