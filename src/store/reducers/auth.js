import {
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOCK_OUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS
} from '../actions/types';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case REFRESH_TOKEN_SUCCESS:
      localStorage.setItem('access', payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        isAuthenticated: false
      }
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    case LOGIN_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh')
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case LOCK_OUT:
    case REFRESH_TOKEN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null
      }
    case PASSWORD_RESET_CONFIRM_FAIL:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}
