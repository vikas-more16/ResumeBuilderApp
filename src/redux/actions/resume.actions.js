import axios from 'axios';
import {
  SET_CURRENT_RESUME,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
  UPDATE_TITLE_REQUEST,
  UPDATE_TITLE_SUCCESS,
  UPDATE_TITLE_FAILURE,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
} from '../types/resume.types';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

export const setCurrentResume = resume => ({
  type: SET_CURRENT_RESUME,
  payload: resume,
});

export const fetchResumes = userId => async dispatch => {
  dispatch({ type: FETCH_RESUMES_REQUEST });

  try {
    const res = await axios.get(`${API_URL}/user/${userId}`);
    dispatch({
      type: FETCH_RESUMES_SUCCESS,
      payload: res.data.resumes,
    });
  } catch (err) {
    dispatch({
      type: FETCH_RESUMES_FAILURE,
      payload: err.message,
    });
  }
};

export const updateResumeTitle = (resumeId, title) => async dispatch => {
  dispatch({ type: UPDATE_TITLE_REQUEST });

  try {
    const res = await axios.patch(`${API_URL}/${resumeId}/title`, { title });
    dispatch({
      type: UPDATE_TITLE_SUCCESS,
      payload: res.data.resume,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_TITLE_FAILURE,
      payload: err.message,
    });
  }
};

export const updateEducation = (resumeId, education) => async dispatch => {
  dispatch({ type: UPDATE_EDUCATION_REQUEST });

  try {
    const res = await axios.patch(`${API_URL}/${resumeId}/education`, {
      education,
    });

    dispatch({
      type: UPDATE_EDUCATION_SUCCESS,
      payload: res.data.education,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EDUCATION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
