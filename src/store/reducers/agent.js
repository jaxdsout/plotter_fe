import {
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_DEAL_FAIL,
  DELETE_DEAL_SUCCESS,
  LOAD_CARDS_FAIL,
  LOAD_CARDS_SUCCESS,
  LOAD_CLIENTS_FAIL,
  LOAD_CLIENTS_SUCCESS,
  LOAD_DEAL_FAIL,
  LOAD_DEAL_SUCCESS,
  LOAD_DEALS_FAIL,
  LOAD_DEALS_SUCCESS,
  LOAD_LISTS_FAIL,
  LOAD_LISTS_SUCCESS,
  LOAD_PROPERTIES_FAIL,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_TASKS_FAIL,
  LOAD_TASKS_SUCCESS,
  LOAD_USER_DATA_FAIL,
  LOGOUT,
  NEW_CLIENT_FAIL,
  NEW_CLIENT_SUCCESS,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,
  NEW_LIST_FAIL,
  NEW_LIST_SUCCESS,
  NEW_TASK_FAIL,
  NEW_TASK_SUCCESS,
  RESET_POLYGON,
  RESET_POLYGON_FILTER,
  SET_POLYGON,
  SET_POLYGON_FILTER,
  UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_SUCCESS
} from '../actions/types';

const initialState = {
  clients: [],
  deals: [],
  lists: [],
  tasks: [],
  properties: [],
  cards: [],
  polygonProps: [],
  userPolygon: {},
  deal: null,
  isLoaded: false
};

export default function agentReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DEAL_SUCCESS:
      return {
        ...state,
        deal: payload
      }
    case LOGOUT:
      return {
        ...state,
        clients: [],
        deals: [],
        lists: [],
        tasks: [],
        properties: [],
        polygonProps: []
      }
    case LOAD_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: payload,
        isLoaded: true
      }
    case LOAD_DEALS_SUCCESS:
      return {
        ...state,
        deals: payload,
        isLoaded: true
      }
    case LOAD_LISTS_SUCCESS:
      return {
        ...state,
        lists: payload,
        isLoaded: true
      }
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
        isLoaded: true
      }
    case LOAD_CARDS_SUCCESS:
      return {
        ...state,
        cards: payload,
        isLoaded: true
      }
    case LOAD_PROPERTIES_SUCCESS:
      return {
        ...state,
        properties: payload,
        isLoaded: true
      }
    case LOAD_USER_DATA_FAIL:
      return {
        ...state,
        isLoaded: false
      }
    case SET_POLYGON_FILTER:
      return {
        ...state,
        polygon: payload
      }
    case RESET_POLYGON_FILTER:
      return {
        ...state,
        polygonProps: []
      }
    case SET_POLYGON:
      return {
        ...state,
        userPolygon: payload
      }
    case RESET_POLYGON:
      return {
        ...state,
        userPolygon: {}
      }
    case LOAD_CLIENTS_FAIL:
    case LOAD_LISTS_FAIL:
    case LOAD_DEALS_FAIL:
    case LOAD_TASKS_FAIL:
    case LOAD_PROPERTIES_FAIL:
    case LOAD_CARDS_FAIL:
    case LOAD_DEAL_FAIL:
    case NEW_CLIENT_SUCCESS:
    case NEW_LIST_SUCCESS:
    case NEW_DEAL_SUCCESS:
    case NEW_CLIENT_FAIL:
    case NEW_LIST_FAIL:
    case NEW_DEAL_FAIL:
    case UPDATE_CLIENT_FAIL:
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_FAIL:
    case DELETE_DEAL_FAIL:
    case DELETE_DEAL_SUCCESS:
    case UPDATE_STATUS_FAIL:
    case UPDATE_STATUS_SUCCESS:
    case DELETE_CLIENT_FAIL:
    case DELETE_CLIENT_SUCCESS:
    case UPDATE_CLIENT_SUCCESS:
    case NEW_TASK_FAIL:
    case NEW_TASK_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}
