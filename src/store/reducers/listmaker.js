import {
  CLEAR_OPTIONS_FAIL,
  CLEAR_OPTIONS_SUCCESS,
  DELETE_OPTION_FAIL,
  DELETE_OPTION_SUCCESS,
  LOAD_LIST_FAIL,
  LOAD_LIST_SUCCESS,
  LOGOUT,
  NEW_CARD_FAIL,
  NEW_CARD_SUCCESS,
  NEW_DEAL_SUCCESS,
  NEW_LIST_FAIL,
  NEW_LIST_SUCCESS,
  NEW_OPTION_FAIL,
  NEW_OPTION_SUCCESS,
  RESET_CARD_FORM,
  RESET_CLIENT_RESULTS,
  RESET_COMMISSION_SEARCH,
  RESET_DEAL_FORM,
  RESET_EDIT_LIST,
  RESET_LIST_MODE,
  RESET_PROPERTY_RESULTS,
  RETRIEVE_LIST_FAIL,
  RETRIEVE_LIST_SUCCESS,
  SEARCH_CLIENT_FAIL,
  SEARCH_CLIENT_SUCCESS,
  SEARCH_PROPERTY_FAIL,
  SEARCH_PROPERTY_SUCCESS,
  SET_LIST_FOR_EDIT,
  SET_OPTION_ORDER,
  SET_SEARCH_CLIENT_FAIL,
  SET_SEARCH_CLIENT_SUCCESS,
  SET_SEARCH_PROP_FAIL,
  SET_SEARCH_PROP_SUCCESS,
  TAB_SWITCH_CLEAR,
  UPDATE_LIST_OPTIONS_FAIL,
  UPDATE_LIST_OPTIONS_SUCCESS,
  UPDATE_OPTION_FAIL,
  UPDATE_OPTION_SUCCESS
} from '../actions/types';

const initialState = {
  client: null,
  list: null,
  options: [],
  property: null,
  client_results: [],
  prop_results: [],
  retrlist: null,
};

export default function listmakerReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_CLIENT_SUCCESS:
      return {
        ...state,
        client_results: payload
      }
    case RESET_CLIENT_RESULTS:
      return {
        ...state,
        client_results: [],
      }
    case RESET_PROPERTY_RESULTS:
      return {
        ...state,
        prop_results: [],
      }
    case SET_SEARCH_CLIENT_SUCCESS:
      return {
        ...state,
        client: payload
      }
    case RETRIEVE_LIST_SUCCESS:
      return {
        ...state,
        retrlist: payload,
      }
    case RESET_EDIT_LIST:
      return {
        ...state,
        options: null,
        list: null,
        client: null
      }
    case SEARCH_PROPERTY_SUCCESS:
      return {
        ...state,
        prop_results: payload
      }
    case SET_SEARCH_PROP_SUCCESS:
      return {
        ...state,
        property: payload,
      }
    case NEW_OPTION_SUCCESS:
      return {
        ...state,
        property: null,
        prop_results: []
      }
    case SET_LIST_FOR_EDIT:
    case CLEAR_OPTIONS_SUCCESS:
      return {
        ...state,
        list: payload,
      }
    case NEW_LIST_SUCCESS:
    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        list: payload,
        options: payload.options
      }
    case UPDATE_LIST_OPTIONS_SUCCESS:
      return {
        ...state,
        options: payload
      }
    case SET_OPTION_ORDER:
      return {
        ...state,
        options: payload
      }
    case NEW_CARD_SUCCESS:
    case NEW_CARD_FAIL:
      return {
        ...state,
        property: null,
        client: null
      }
    case RESET_DEAL_FORM:
    case TAB_SWITCH_CLEAR:
    case RESET_CARD_FORM:
    case RESET_LIST_MODE:
      return {
        ...state,
        property: null,
        client: null,
        prop_results: [],
        client_results: []
      }

    case RESET_COMMISSION_SEARCH:
      return {
        ...state,
        property: null
      }
    case LOGOUT:
      return {
        ...state,
        client_results: [],
        client: null,
        list: null,
        options: [],
        property: null,
        prop_results: [],
        retrlist: null,
      }
    case NEW_DEAL_SUCCESS:
      return {
        ...state,
        client: null,
        property: null
      }
    case NEW_OPTION_FAIL:
    case NEW_LIST_FAIL:
    case UPDATE_OPTION_FAIL:
    case UPDATE_OPTION_SUCCESS:
    case DELETE_OPTION_FAIL:
    case DELETE_OPTION_SUCCESS:
    case SEARCH_CLIENT_FAIL:
    case SEARCH_PROPERTY_FAIL:
    case LOAD_LIST_FAIL:
    case CLEAR_OPTIONS_FAIL:
    case SET_SEARCH_CLIENT_FAIL:
    case SET_SEARCH_PROP_FAIL:
    case RETRIEVE_LIST_FAIL:
    case UPDATE_LIST_OPTIONS_FAIL:
      return {
        ...state
      }
    default:
      return state;
  }
}
