import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Badges = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>No Badges available</Text>
      </View>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 140,
  },
});
