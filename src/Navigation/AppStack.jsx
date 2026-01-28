import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import Notifications from '../screens/Notifications';
import Ats from '../screens/Ats';
import Jobs from '../screens/Jobs';
import Internship from '../screens/Internship';
import Credentials from '../screens/Credentials';
import Truresume from '../screens/Truresume';
import DegreeCertificates from '../screens/DegreeCertificates';
import Badges from '../screens/Badges';
import Transcripts from '../screens/Transcripts';
import WorkCredentials from '../screens/WorkCredentials';
import ResumePreview from '../screens/ResumePreview';
import MyResumes from '../screens/MyResumes';
import EditResume from '../screens/EditResume';
import EditEducation from '../screens/EditEducation';
import EducationForm from '../screens/EducationForm';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen name="Ats" component={Ats} options={{ title: 'Ats' }} />
      <Stack.Screen name="Jobs" component={Jobs} options={{ title: 'Jobs' }} />
      <Stack.Screen
        name="Internship"
        component={Internship}
        options={{ title: 'Internship' }}
      />
      <Stack.Screen
        name="Credentials"
        component={Credentials}
        options={{ title: 'Credentials' }}
      />
      <Stack.Screen
        name="Truresume"
        component={Truresume}
        options={{ title: 'Truresume' }}
      />
      <Stack.Screen
        name="MyResumes"
        component={MyResumes}
        options={{ title: 'MyResumes' }}
      />
      <Stack.Screen
        name="DegreeCertificates"
        component={DegreeCertificates}
        options={{ title: 'DegreeCertificates' }}
      />
      <Stack.Screen
        name="Badges"
        component={Badges}
        options={{ title: 'Badges' }}
      />
      <Stack.Screen
        name="Transcripts"
        component={Transcripts}
        options={{ title: 'Transcripts' }}
      />
      <Stack.Screen
        name="WorkCredentials"
        component={WorkCredentials}
        options={{ title: 'WorkCredentials' }}
      />
      <Stack.Screen
        name="ResumePreview"
        component={ResumePreview}
        options={{ title: 'ResumePreview' }}
      />
      <Stack.Screen
        name="editResume"
        component={EditResume}
        options={{ title: 'editResume' }}
      />
      <Stack.Screen name="EditEducation" component={EditEducation} />
      <Stack.Screen name="EducationForm" component={EducationForm} />
    </Stack.Navigator>
  );
};

export default AppStack;
