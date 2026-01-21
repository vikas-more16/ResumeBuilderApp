import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import React from 'react';

const HomeHeader = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={50} color="#111827" />
        </TouchableOpacity>

        <View style={styles.centerText}>
          <Text style={styles.welcome}>Welcome 👋</Text>
          <Text style={styles.username}>{user?.username}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={26} color="#111827" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#e9f0ff',
    elevation: 4,
  },
  leftHeader: {
    width: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centerText: {
    alignItems: 'left',
  },

  welcome: {
    fontSize: 12,
    color: '#6b7280',
  },

  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});
