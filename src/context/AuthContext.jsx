import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async data => {
    try {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          userId: data.UserId,
          username: data.username,
          email: data.emial,
          phone: data.phone,
        }),
      );

      setUserToken(data.token);
      setUser({
        userId: data.UserId,
        username: data.username,
        email: data.emial,
        phone: data.phone,
      });
    } catch (e) {
      console.log('Login storage error', e);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUserToken(null);
    setUser(null);
  };

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');

      if (token && userData) {
        setUserToken(token);
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.log('Check login error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
