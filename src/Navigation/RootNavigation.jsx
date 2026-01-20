import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import BottomTab from './BottomTab';
import { AuthContext } from '../context/AuthContext';

const RootNavigation = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      {userToken ? <BottomTab /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
