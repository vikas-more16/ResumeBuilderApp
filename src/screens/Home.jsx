import { StyleSheet, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeCarousel from '../components/HomeCarousel';
import HomeHeader from '../components/HomeHeader';
import HomeCards from '../components/HomeCards';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />

      <FlatList
        data={[]}
        keyExtractor={() => 'key'}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <HomeCarousel navigation={navigation} />
            <View style={styles.ExploreContainer}>
              <Text style={styles.ExploreTitle}>Explore More</Text>
              <Text style={styles.ExploreSubtitle}>
                Showcase your skills and qualifications with ease
              </Text>
            </View>
            <HomeCards navigation={navigation} />
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ExploreContainer: { paddingLeft: 10 },
  ExploreTitle: { fontSize: 24, marginTop: 30 },
  ExploreSubtitle: { color: '#1f1d1d' },
});
