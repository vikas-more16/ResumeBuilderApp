import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DegreeCertificates = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>No Degree Certificates available</Text>
      </View>
    </View>
  );
};

export default DegreeCertificates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 140,
  },
});
