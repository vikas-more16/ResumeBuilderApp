import {
  SET_CURRENT_RESUME,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
  UPDATE_TITLE_SUCCESS,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
} from '../types/resume.types';

const initialState = {
  currentResume: {
    _id: null,
    title: '',
    resumeType: 'Fusion',

    personalInfo: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      photo: '',
      summary: '',
    },

    education: [],
    experience: [],
    skills: [],
    socialLinks: [],
  },

  savedResumes: [],
  loading: false,
  error: null,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_RESUME:
      return { ...state, currentResume: action.payload };

    case FETCH_RESUMES_REQUEST:
      return { ...state, loading: true };

    case FETCH_RESUMES_SUCCESS:
      return { ...state, loading: false, savedResumes: action.payload };

    case FETCH_RESUMES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_TITLE_SUCCESS:
      return {
        ...state,
        currentResume: action.payload,
        savedResumes: state.savedResumes.map(r =>
          r._id === action.payload._id ? action.payload : r,
        ),
      };
    case UPDATE_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume: {
          ...state.currentResume,
          education: action.payload,
        },
        savedResumes: state.savedResumes.map(r =>
          r._id === state.currentResume._id
            ? { ...r, education: action.payload }
            : r,
        ),
      };

    case UPDATE_EDUCATION_FAILURE:
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
