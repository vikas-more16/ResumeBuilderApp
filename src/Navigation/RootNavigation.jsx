import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import AppStack from './AppStack';
import { loadAuthFromStorage } from '../redux/actions/auth.actions';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
