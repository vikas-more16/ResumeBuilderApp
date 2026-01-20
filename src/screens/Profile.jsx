import { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person" size={80} color="#fff" />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <ProfileItem icon="card" label="User ID" value={user?.userId} />
        <ProfileItem icon="person" label="Username" value={user?.username} />
        <ProfileItem icon="mail" label="Email" value={user?.email} />
        <ProfileItem icon="call" label="Phone" value={user?.phone} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

/* -------------------- Reusable Row -------------------- */
const ProfileItem = ({ icon, label, value }) => (
  <View style={styles.item}>
    <Ionicons name={icon} size={22} color="#2563eb" />
    <View style={styles.itemText}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  header: {
    backgroundColor: '#2563eb',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: '#e0e7ff',
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  itemText: {
    marginLeft: 14,
  },

  label: {
    fontSize: 13,
    color: '#6b7280',
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
