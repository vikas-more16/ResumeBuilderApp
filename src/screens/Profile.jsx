import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const Profile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>This is Profile Screen</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
