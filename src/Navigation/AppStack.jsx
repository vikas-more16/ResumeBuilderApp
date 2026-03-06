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
import EditProfile from '../screens/EditProfile';
import ProfileForm from '../screens/ProfileForm';
import EditLinks from '../screens/EditLinks';
import LinksForm from '../screens/LinksForm';
import EditExperience from '../screens/EditExperience';
import ExperienceForm from '../screens/ExperienceForm';
import EditSkills from '../screens/EditSkills';
import SkillsForm from '../screens/SkillsForm';
import EditResumeStyle from '../screens/EditResumeStyle';
import GetStartScreen from '../screens/AIInterviewScreens/GetStartScreen';
import InterviewStepOne from '../screens/AIInterviewScreens/InterviewStepOne';
import InterviewStepTwo from '../screens/AIInterviewScreens/InterviewStepTwo';
import InterviewStepThree from '../screens/AIInterviewScreens/InterviewStepThree';
import PracticeSession from '../screens/AIInterviewScreens/PracticeSession';
import Feedback from '../screens/AIInterviewScreens/Feedback';
import IntroScreen from '../screens/AICareerCoachScreens/IntroScreen';
import CurrentStage from '../screens/AICareerCoachScreens/CurrentStage';
import AboutStage from '../screens/AICareerCoachScreens/AboutStage';
import Interests from '../screens/AICareerCoachScreens/Interests';
import AssessmentTest from '../screens/AICareerCoachScreens/AssessmentTest';
import AssessmentReport from '../screens/AICareerCoachScreens/AssessmentReport';

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
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
      <Stack.Screen name="EditLinks" component={EditLinks} />
      <Stack.Screen name="LinksForm" component={LinksForm} />
      <Stack.Screen name="EditExperience" component={EditExperience} />
      <Stack.Screen name="ExperienceForm" component={ExperienceForm} />
      <Stack.Screen name="EditSkills" component={EditSkills} />
      <Stack.Screen name="SkillsForm" component={SkillsForm} />
      <Stack.Screen name="EditResumeStyle" component={EditResumeStyle} />
      <Stack.Screen
        name="GetStartScreen"
        component={GetStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterviewStepOne"
        component={InterviewStepOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterviewStepTwo"
        component={InterviewStepTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterviewStepThree"
        component={InterviewStepThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PracticeSession"
        component={PracticeSession}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrentStage"
        component={CurrentStage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutStage"
        component={AboutStage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Interests"
        component={Interests}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssessmentTest"
        component={AssessmentTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssessmentReport"
        component={AssessmentReport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
