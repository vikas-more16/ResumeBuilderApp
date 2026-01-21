import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
  {
    title: 'Degree / Certificates',
    subtitle: 'Your verified achievements and awards.',
    bg: '#fde8f3',
    icon: 'ribbon-outline',
    screen: 'DegreeCertificates',
  },
  {
    title: 'Badges',
    subtitle: 'Showcase your skills and milestones.',
    bg: '#e6f4ff',
    icon: 'medal-outline',
    screen: 'Badges',
  },
  {
    title: 'Transcripts',
    subtitle: 'Track your academic performance.',
    bg: '#ecffe1',
    icon: 'school-outline',
    screen: 'Transcripts',
  },
  {
    title: 'Work Credentials',
    subtitle: 'Verify your professional experiences.',
    bg: '#efeaff',
    icon: 'briefcase-outline',
    screen: 'WorkCredentials',
  },
];

const Truresume = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Import & Store Your{'\n'}Credentials At One Place{'\n'}Securely.
          </Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.bg }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={28} color="#111827" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Truresume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  banner: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#3446b7',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bannerText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#111827',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff90',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4,
  },
});
