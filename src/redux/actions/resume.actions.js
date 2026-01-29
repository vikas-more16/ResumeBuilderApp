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
  UPDATE_PERSONAL_INFO_REQUEST,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_FAILURE,
  UPDATE_SOCIAL_LINKS_REQUEST,
  UPDATE_SOCIAL_LINKS_SUCCESS,
  UPDATE_SOCIAL_LINKS_FAILURE,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
  UPDATE_SKILLS_FAILURE,
  UPDATE_SKILLS_SUCCESS,
  UPDATE_SKILLS_REQUEST,
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_REQUEST,
  CREATE_RESUME_FAILURE,
  DELETE_RESUME_REQUEST,
  DELETE_RESUME_SUCCESS,
  DELETE_RESUME_FAILURE,
} from '../types/resume.types';

const API_URL = 'http://10.0.2.2:5000/api/resumes';

export const createResume = (userId, resumeType) => async dispatch => {
  dispatch({ type: CREATE_RESUME_REQUEST });

  try {
    const res = await axios.post(`${API_URL}/create`, {
      userId,
      resumeType,
    });

    const resume = res.data.resume;
    dispatch({
      type: SET_CURRENT_RESUME,
      payload: resume,
    });

    dispatch({
      type: CREATE_RESUME_SUCCESS,
      payload: resume,
    });

    return resume;
  } catch (error) {
    dispatch({
      type: CREATE_RESUME_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteResume = resumeId => async dispatch => {
  dispatch({ type: DELETE_RESUME_REQUEST });

  try {
    await axios.delete(`${API_URL}/${resumeId}`);

    dispatch({
      type: DELETE_RESUME_SUCCESS,
      payload: resumeId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESUME_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

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

export const updatePersonalInfo =
  (resumeId, personalInfo) => async dispatch => {
    dispatch({ type: UPDATE_PERSONAL_INFO_REQUEST });

    try {
      const res = await axios.patch(
        `${API_URL}/${resumeId}/personal-info`,
        personalInfo,
      );

      dispatch({
        type: UPDATE_PERSONAL_INFO_SUCCESS,
        payload: res.data.personalInfo,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PERSONAL_INFO_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const updateSocialLinks = (resumeId, socialLinks) => async dispatch => {
  dispatch({ type: UPDATE_SOCIAL_LINKS_REQUEST });

  try {
    const res = await axios.patch(`${API_URL}/${resumeId}/social-links`, {
      socialLinks,
    });

    dispatch({
      type: UPDATE_SOCIAL_LINKS_SUCCESS,
      payload: res.data.socialLinks,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SOCIAL_LINKS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateExperience = (resumeId, experience) => async dispatch => {
  dispatch({ type: UPDATE_EXPERIENCE_REQUEST });

  try {
    const res = await axios.patch(`${API_URL}/${resumeId}/experience`, {
      experience,
    });

    dispatch({
      type: UPDATE_EXPERIENCE_SUCCESS,
      payload: res.data.experience,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPERIENCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateSkills = (resumeId, skills) => async dispatch => {
  dispatch({ type: UPDATE_SKILLS_REQUEST });

  try {
    const res = await axios.patch(`${API_URL}/${resumeId}/skills`, { skills });

    dispatch({
      type: UPDATE_SKILLS_SUCCESS,
      payload: res.data.skills,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SKILLS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
