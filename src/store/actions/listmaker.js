import {
  CLEAR_OPTIONS_FAIL,
  CLEAR_OPTIONS_SUCCESS,
  DELETE_LIST_FAIL,
  DELETE_LIST_SUCCESS,
  DELETE_OPTION_FAIL,
  DELETE_OPTION_SUCCESS,
  LOAD_LIST_FAIL,
  LOAD_LIST_SUCCESS,
  NEW_LIST_FAIL,
  NEW_LIST_SUCCESS,
  NEW_OPTION_FAIL,
  NEW_OPTION_SUCCESS,
  RESET_CLIENT_RESULTS,
  RESET_PROPERTY_RESULTS,
  RETRIEVE_LIST_FAIL,
  RETRIEVE_LIST_SUCCESS,
  SEARCH_CLIENT_FAIL,
  SEARCH_CLIENT_SUCCESS,
  SEARCH_PROPERTY_FAIL,
  SEARCH_PROPERTY_SUCCESS,
  SET_OPTION_ORDER,
  SET_SEARCH_CLIENT_FAIL,
  SET_SEARCH_CLIENT_SUCCESS,
  SET_SEARCH_PROP_FAIL,
  SET_SEARCH_PROP_SUCCESS,
  UPDATE_LIST_OPTIONS_FAIL,
  UPDATE_LIST_OPTIONS_SUCCESS,
  UPDATE_OPTION_FAIL,
  UPDATE_OPTION_SUCCESS
} from "./types";

import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const new_list = (agent, client) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ agent, client });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/lists/`, body, config);
      dispatch({
        type: NEW_LIST_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NEW_LIST_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_LIST_FAIL
    });
  }
};


export const delete_list = (listID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/lists/${listID}/`, config);
      dispatch({
        type: DELETE_LIST_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DELETE_LIST_FAIL
      });
    }
  } else {
    dispatch({
      type: DELETE_LIST_FAIL
    });
  }
};


export const update_list = (agent, client, list, options) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const uuid = list.uuid === null ? uuidv4() : list.uuid;
    const body = JSON.stringify({ agent, client, uuid, options });
    console.log(body, 'body at update_list')
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/lists/${list.id}/`, body, config);
      dispatch({
        type: NEW_LIST_SUCCESS,
        payload: res.data
      });

      dispatch(update_list_options(agent, client, list, options));

    } catch (err) {
      dispatch({
        type: NEW_LIST_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_LIST_FAIL
    });
  }
};


export const update_list_options = (agent, client, list, options) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ agent, client, list, options });
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/lists/${list.id}/update-options/`, body, config);
      dispatch({
        type: UPDATE_LIST_OPTIONS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_LIST_OPTIONS_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_LIST_OPTIONS_FAIL
    });
  }
};



export const retrieve_list = (uuid) => async dispatch => {
  if (uuid) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/client-list/${uuid}/`, config);
      dispatch({
        type: RETRIEVE_LIST_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: RETRIEVE_LIST_FAIL
      });
    }
  } else {
    dispatch({
      type: RETRIEVE_LIST_FAIL
    });
  }
};


export const new_option = (property, list, client) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ property, list, client });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/options/`, body, config);
      dispatch({
        type: NEW_OPTION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NEW_OPTION_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_OPTION_FAIL
    });
  }
};



export const load_list = (listID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${listID}/`, config);
      dispatch({
        type: LOAD_LIST_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOAD_LIST_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_LIST_FAIL
    });
  }
};


export const delete_option = (optionID, list) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/options/${optionID}/`, config);
      dispatch({
        type: DELETE_OPTION_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DELETE_OPTION_FAIL
      });
    }
  } else {
    dispatch({
      type: DELETE_OPTION_FAIL
    });
  }
};



export const update_option = (option, price, unit_number, layout, sq_ft, available, notes, property, list) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ option, property, price, unit_number, layout, sq_ft, available, notes, list });
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/options/${option}/`, body, config);
      dispatch({
        type: UPDATE_OPTION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_OPTION_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_OPTION_FAIL
    });
  }
};

export const clear_options = (listID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/lists/${listID}/clear-options/`, config);
      dispatch({
        type: CLEAR_OPTIONS_SUCCESS,
        payload: { options: [] }
      });
    } catch (err) {
      dispatch({
        type: CLEAR_OPTIONS_FAIL
      });
    }
  } else {
    dispatch({
      type: CLEAR_OPTIONS_FAIL
    });
  }
};

export const set_option_order = (options) => dispatch => {
  dispatch({
    type: SET_OPTION_ORDER,
    payload: options
  });
}


export const search_properties = (query) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/?search=${query}`, config);
      dispatch({
        type: SEARCH_PROPERTY_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SEARCH_PROPERTY_FAIL
      });
    }
  } else {
    dispatch({
      type: SEARCH_PROPERTY_FAIL
    });
  }
};

export const set_search_prop = (property) => dispatch => {
  if (localStorage.getItem('access')) {
    try {
      dispatch({
        type: SET_SEARCH_PROP_SUCCESS,
        payload: property
      });
      console.log(property, "search_prop")
    } catch (err) {
      dispatch({
        type: SET_SEARCH_PROP_FAIL
      });
    }
  } else {
    dispatch({
      type: SET_SEARCH_PROP_FAIL
    });
  }
}


export const reset_prop_results = () => (dispatch) => {
  dispatch({
    type: RESET_PROPERTY_RESULTS,
  });
};


export const search_clients = (query, userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?agent=${userID}&search=${query}`, config);
      dispatch({
        type: SEARCH_CLIENT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SEARCH_CLIENT_FAIL
      });
    }
  } else {
    dispatch({
      type: SEARCH_CLIENT_FAIL
    });
  }
};


export const set_search_client = (id, name, phone_number, email) => dispatch => {
  if (localStorage.getItem('access')) {
    const client = { id, name, phone_number, email };
    try {
      dispatch({
        type: SET_SEARCH_CLIENT_SUCCESS,
        payload: client
      });
    } catch (err) {
      dispatch({
        type: SET_SEARCH_CLIENT_FAIL
      });
    }
  } else {
    dispatch({
      type: SET_SEARCH_CLIENT_FAIL
    });
  }
}

export const reset_client_results = () => (dispatch) => {
  dispatch({
    type: RESET_CLIENT_RESULTS,
  });
};


