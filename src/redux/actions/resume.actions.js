import axios from 'axios';
import {
  SET_CURRENT_RESUME,
  SAVE_RESUME_REQUEST,
  SAVE_RESUME_SUCCESS,
  SAVE_RESUME_FAILURE,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
  UPDATE_CURRENT_RESUME,
} from '../types/resume.types';

const API_URL = 'http://192.168.56.1:5000/api/resumes';

/* ================= SAVE RESUME ================= */
export const saveResume = () => async (dispatch, getState) => {
  dispatch({ type: SAVE_RESUME_REQUEST });

  try {
    const { token } = getState().auth;
    const { currentResume } = getState().resume;

    if (!token) throw new Error('No token in Redux');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let res;

    if (currentResume._id) {
      res = await axios.put(
        `${API_URL}/update/${currentResume._id}`,
        {
          data: {
            name: currentResume.name,
            email: currentResume.email,
            phone: currentResume.phone,
            location: currentResume.location,
            linkedin: currentResume.linkedin,
            github: currentResume.github,
            summary: currentResume.summary,
          },
        },
        { headers },
      );
    } else {
      res = await axios.post(
        `${API_URL}/create`,
        {
          data: {
            name: currentResume.name,
            email: currentResume.email,
            phone: currentResume.phone,
            location: currentResume.location,
            linkedin: currentResume.linkedin,
            github: currentResume.github,
            summary: currentResume.summary,
          },
        },
        { headers },
      );
    }

    dispatch({
      type: SAVE_RESUME_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('SAVE RESUME ERROR:', error.response?.data || error.message);
    dispatch({
      type: SAVE_RESUME_FAILURE,
      payload: error.response?.data?.message || 'Save failed',
    });
  }
};

/* ================= FETCH RESUMES ================= */
export const fetchResumes = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_RESUMES_REQUEST });

  try {
    const { token } = getState().auth;
    if (!token) throw new Error('No token in Redux');

    const res = await axios.get(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_RESUMES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('FETCH RESUME ERROR:', error.response?.data || error.message);
    dispatch({
      type: FETCH_RESUMES_FAILURE,
      payload: error.response?.data?.message || 'Fetch failed',
    });
  }
};

/* ================= UPDATE CURRENT RESUME ================= */
export const updateResume = payload => ({
  type: UPDATE_CURRENT_RESUME,
  payload,
});

export const setCurrentResume = resume => ({
  type: SET_CURRENT_RESUME,
  payload: {
    _id: resume._id,
    data: resume.data,
  },
});
