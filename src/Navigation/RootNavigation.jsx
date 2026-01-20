import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';

const RootNavigation = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
