import {
  SET_CURRENT_RESUME,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
  UPDATE_TITLE_SUCCESS,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
  UPDATE_PERSONAL_INFO_FAILURE,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_REQUEST,
  UPDATE_SOCIAL_LINKS_FAILURE,
  UPDATE_SOCIAL_LINKS_SUCCESS,
  UPDATE_SOCIAL_LINKS_REQUEST,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
  UPDATE_SKILLS_FAILURE,
  UPDATE_SKILLS_SUCCESS,
  UPDATE_SKILLS_REQUEST,
  CREATE_RESUME_FAILURE,
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_REQUEST,
  DELETE_RESUME_FAILURE,
  DELETE_RESUME_SUCCESS,
  DELETE_RESUME_REQUEST,
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
    case CREATE_RESUME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_RESUME_SUCCESS:
      return {
        ...state,
        loading: false,
        savedResumes: [action.payload, ...state.savedResumes],
      };

    case CREATE_RESUME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_CURRENT_RESUME:
      return { ...state, currentResume: action.payload };

    case DELETE_RESUME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_RESUME_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume:
          state.currentResume?._id === action.payload
            ? null
            : state.currentResume,
        savedResumes: state.savedResumes.filter(r => r._id !== action.payload),
      };

    case DELETE_RESUME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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

    case UPDATE_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume: {
          ...state.currentResume,
          personalInfo: action.payload,
        },
        savedResumes: state.savedResumes.map(r =>
          r._id === state.currentResume._id
            ? { ...r, personalInfo: action.payload }
            : r,
        ),
      };

    case UPDATE_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_SOCIAL_LINKS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_SOCIAL_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume: {
          ...state.currentResume,
          socialLinks: action.payload,
        },
        savedResumes: state.savedResumes.map(r =>
          r._id === state.currentResume._id
            ? { ...r, socialLinks: action.payload }
            : r,
        ),
      };

    case UPDATE_SOCIAL_LINKS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume: {
          ...state.currentResume,
          experience: action.payload,
        },
        savedResumes: state.savedResumes.map(r =>
          r._id === state.currentResume._id
            ? { ...r, experience: action.payload }
            : r,
        ),
      };

    case UPDATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentResume: {
          ...state.currentResume,
          skills: action.payload,
        },
        savedResumes: state.savedResumes.map(r =>
          r._id === state.currentResume._id
            ? { ...r, skills: action.payload }
            : r,
        ),
      };

    case UPDATE_SKILLS_FAILURE:
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
