import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import Notifications from '../screens/Notifications';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTab} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default AppStack;
