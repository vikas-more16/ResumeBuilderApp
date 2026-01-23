import {
  UPDATE_CURRENT_RESUME,
  SAVE_RESUME_REQUEST,
  SAVE_RESUME_SUCCESS,
  SAVE_RESUME_FAILURE,
  FETCH_RESUMES_REQUEST,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILURE,
  SET_CURRENT_RESUME,
} from '../types/resume.types';

const initialState = {
  currentResume: {
    _id: null,
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
    case SET_CURRENT_RESUME:
      return {
        ...state,
        currentResume: {
          _id: action.payload._id,
          name: action.payload.data?.name || '',
          email: action.payload.data?.email || '',
          phone: action.payload.data?.phone || '',
          location: action.payload.data?.location || '',
          linkedin: action.payload.data?.linkedin || '',
          github: action.payload.data?.github || '',
          summary: action.payload.data?.summary || '',
        },
      };

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

    case SAVE_RESUME_SUCCESS: {
      const updatedResume = action.payload;

      const existingIndex = state.savedResumes.findIndex(
        r => r._id === updatedResume._id,
      );

      let newResumes;

      if (existingIndex !== -1) {
        newResumes = [...state.savedResumes];
        newResumes[existingIndex] = updatedResume;
      } else {
        newResumes = [updatedResume, ...state.savedResumes];
      }

      return {
        ...state,
        loading: false,
        savedResumes: newResumes,
        currentResume: {
          _id: updatedResume._id,
          ...updatedResume.data,
        },
      };
    }

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
