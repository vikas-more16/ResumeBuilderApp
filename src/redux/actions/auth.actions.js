import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from '../types/auth.types';

export const loadAuthFromStorage = () => async dispatch => {
  try {
    const stored = await AsyncStorage.getItem('@auth');

    if (!stored) {
      dispatch({ type: AUTH_LOGOUT });
      return;
    }

    const { token, user } = JSON.parse(stored);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    dispatch({ type: AUTH_LOGOUT });
  }
};

export const logoutUser = () => async dispatch => {
  await AsyncStorage.removeItem('@auth');
  dispatch({ type: AUTH_LOGOUT });
};

export const loginUserWithFirebase = firebaseToken => async dispatch => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const res = await axios.post(
      'http://10.0.2.2:5000/api/user/firebase-auth/login',
      {},
      {
        headers: {
          Authorization: `Bearer ${firebaseToken}`,
        },
      },
    );

    const { token, user } = res.data;

    await AsyncStorage.setItem('@auth', JSON.stringify({ token, user }));

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Firebase login failed',
    });
  }
};
