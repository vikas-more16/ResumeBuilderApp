import {
  UPDATE_CURRENT_RESUME,
  SAVE_RESUME_REQUEST,
  SAVE_RESUME_SUCCESS,
  SAVE_RESUME_FAILURE,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
} from '../types/resume.types';

const initialState = {
  currentResume: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  savedResumes: [],
  loading: false,
  error: null,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_RESUME:
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          ...action.payload,
        },
      };

    case SAVE_RESUME_REQUEST:
    case FETCH_RESUMES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SAVE_RESUME_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FETCH_RESUMES_SUCCESS:
      return {
        ...state,
        loading: false,
        savedResumes: action.payload,
      };

    case SAVE_RESUME_FAILURE:
    case FETCH_RESUMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default resumeReducer;
