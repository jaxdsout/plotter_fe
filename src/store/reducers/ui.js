import {
  ACTIVATE_FAIL,
  ACTIVATE_SUCCESS,
  CLEAR_MESSAGE,
  CLIENT_FOUND_SOMEWHERE,
  CLIENT_NOT_FOUND,
  LOAD_CARDS_SUCCESS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_DEALS_SUCCESS,
  LOAD_LISTS_SUCCESS,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_TASKS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  RESET_CLIENT_VIEW,
  RESET_DEAL_MODE,
  RESET_LIST_MODE,
  RESET_REORDER_MODE,
  RESET_SEND_MODE,
  SET_ACTIVATE_SUCCESS,
  SET_CLIENT_VIEW,
  SET_DEAL_MODE,
  SET_EDIT_LIST,
  SET_LIST_MODE,
  SET_REORDER_MODE,
  SET_RESET_SUCCESS,
  SET_SEND_MODE,
  SET_SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  WIDGET_CLOSE,
  WIDGET_OPEN,
} from '../actions/types';

const initialState = {
  isClientView: false,
  isSendMode: false,
  isListMode: false,
  resetDealForm: false,
  isReorderMode: false,
  isDealMode: false,
  isEditMode: false,
  signupSuccess: false,
  resetSuccess: false,
  activateSuccess: false,
  message: '',
  error: null,
  clientTaken: false,
  widget: '',
};


export default function uiReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CLIENT_VIEW:
      return {
        ...state,
        isClientView: true
      }
    case SET_SEND_MODE:
      return {
        ...state,
        isListMode: false,
        isSendMode: true,
      }
    case SET_LIST_MODE:
      return {
        ...state,
        isListMode: true,
        isSendMode: false,
      }
    case SET_REORDER_MODE:
      return {
        ...state,
        isReorderMode: true
      }
    case SET_DEAL_MODE:
      return {
        ...state,
        isDealMode: true
      }
    case RESET_CLIENT_VIEW:
      return {
        ...state,
        isClientView: false
      }
    case RESET_LIST_MODE:
      return {
        ...state,
        isListMode: false,
        isEditMode: false
      }
    case RESET_SEND_MODE:
      return {
        ...state,
        isSendMode: false,
      }
    case RESET_REORDER_MODE:
      return {
        ...state,
        isReorderMode: false
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        message: 'Please check provided email address to activate account. Redirecting to login...',
      }
    case SET_SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
      }
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        message: 'An email will be sent to you if address is in our system. Redirecting to login...',
        resetSuccess: true
      }
    case SET_RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: null,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: 'Login successful.',
      }
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        message: 'Account successfully activated. Redirecting to login...',
        activateSuccess: true
      }
    case ACTIVATE_FAIL:
      return {
        ...state,
        error: 'Account already activated',
        activateSuccess: null
      }
    case SET_ACTIVATE_SUCCESS:
      return {
        ...state,
        activateSuccess: null,
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        error: '',
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: 'Invalid signup credentials provided. Please review and adjust.',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: 'Invalid email or password',
      };
    case LOGOUT:
      return {
        ...state,
        message: 'Logout successful.'
      }
    case RESET_DEAL_MODE:
      return {
        ...state,
        isDealMode: false
      }
    case CLIENT_FOUND_SOMEWHERE:
      return {
        ...state,
        clientTaken: true
      }
    case CLIENT_NOT_FOUND:
      return {
        ...state,
        clientTaken: false
      }
    case WIDGET_OPEN:
      return {
        ...state,
        widget: payload
      }
    case WIDGET_CLOSE:
      return {
        ...state,
        widget: ''
      }
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        message: 'Client updated successfully'
      }
    case SET_EDIT_LIST:
      return {
        ...state,
        isEditMode: true
      }
    case LOAD_CLIENTS_SUCCESS:
    case LOAD_DEALS_SUCCESS:
    case LOAD_LISTS_SUCCESS:
    case LOAD_TASKS_SUCCESS:
    case LOAD_PROPERTIES_SUCCESS:
    case LOAD_CARDS_SUCCESS:
      return {
        ...state,
        isClientView: false
      }

    default:
      return state;
  }
}
