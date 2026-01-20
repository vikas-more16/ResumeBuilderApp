import {StyleSheet, View, SafeAreaView, Text} from 'react-native';

export default function Jobs() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text}>
        <Text>This is a Jobs.jsx</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 140,
  },
});
