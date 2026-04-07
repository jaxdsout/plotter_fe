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
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROPERTIES_FAIL,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_TASKS_FAIL,
  LOAD_TASKS_SUCCESS,
  LOAD_USER_DATA_FAIL,
  NEW_CARD_FAIL,
  NEW_CARD_SUCCESS,
  NEW_CLIENT_FAIL,
  NEW_CLIENT_SUCCESS,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,
  NEW_TASK_FAIL,
  NEW_TASK_SUCCESS,
  SET_POLYGON,
  SET_POLYGON_FILTER,
  SET_POLYGON_FILTER_FAIL,
  UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_DEAL_FAIL,
  UPDATE_DEAL_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  USER_DATA_UNCHANGED
} from './types';

import axios from 'axios';

export const update_profile = (user, trec, website, phone_number) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const userID = user.id;
    const body = JSON.stringify({ userID, trec, website, phone_number });
    console.log(body)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${user.profile.id}/`, body, config);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_PROFILE_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_PROFILE_FAIL
    });
  }
};

export const load_profile = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/?agent=${userID}`, config);
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_PROFILE_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_PROFILE_FAIL
    });
  }
};

export const update_avatar = (userObj, file) => async dispatch => {
  if (localStorage.getItem('access')) {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('id', userObj.id);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
      };

      const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${userObj.id}/`, formData, config);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_PROFILE_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_PROFILE_FAIL
    });
  }
};


export const new_client = (agent, first_name, last_name, email, phone_number) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ agent, first_name, last_name, email, phone_number });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/`, body, config);
      dispatch({
        type: NEW_CLIENT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NEW_CLIENT_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_CLIENT_FAIL
    });
  }
};


export const delete_client = (clientID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/clients/${clientID}/`, config);
      dispatch({
        type: DELETE_CLIENT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DELETE_CLIENT_FAIL
      });
    }
  } else {
    dispatch({
      type: DELETE_CLIENT_FAIL
    });
  }
};


export const update_client = (clientID, agent, first_name, last_name, email, phone_number) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ agent, first_name, last_name, email, phone_number });
    console.log(body)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/clients/${clientID}/`, body, config);
      dispatch({
        type: UPDATE_CLIENT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_CLIENT_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_CLIENT_FAIL
    });
  }
};


export const load_deal = (dealID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, config);
      dispatch({
        type: LOAD_DEAL_SUCCESS,
        payload: res.data
      });
      console.log("loaded deal")
    } catch (err) {
      dispatch({
        type: LOAD_DEAL_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_DEAL_FAIL
    });
  }
};



export const new_deal = (property, agent, client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = {
      property,
      unit_no,
      move_date,
      lease_term,
      rent: parseInt(rent),
      rate: rate ? parseInt(rate) : null,
      flat_fee: flat_fee ? parseFloat(flat_fee) : null,
      commission,
      agent,
      client
    };
    console.log(body, "body")
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/deals/`, body, config);
      dispatch({
        type: NEW_DEAL_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NEW_DEAL_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_DEAL_FAIL
    });
  }
};

export const delete_deal = (dealID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, config);
      dispatch({
        type: DELETE_DEAL_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DELETE_DEAL_FAIL
      });
    }
  } else {
    dispatch({
      type: DELETE_DEAL_FAIL
    });
  }
};

export const update_deal_status = (dealID, status) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ status })
    console.log(body)
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, body, config);
      dispatch({
        type: UPDATE_STATUS_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_STATUS_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_STATUS_FAIL
    });
  }
};


export const update_deal = (dealID, property, agent, client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };

    const body = {
      property,
      unit_no,
      move_date,
      lease_term,
      rent: rent ? parseInt(rent) : 0,
      rate: rate ? parseInt(rate) : 0,
      flat_fee: flat_fee ? parseFloat(flat_fee) : 0,
      commission: parseFloat(commission) || 0,
      agent,
      client
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, body, config);
      dispatch({
        type: UPDATE_DEAL_SUCCESS,
      });

      dispatch(load_deal(dealID));
    } catch (err) {
      dispatch({
        type: UPDATE_DEAL_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_DEAL_FAIL
    });
  }
};

export const new_guest_card = (property, agent, client, msg, interested, move_by) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ property, agent, client, msg, interested, move_by });
    console.log(body, "guest card body")
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/cards/`, body, config);
      dispatch({
        type: NEW_CARD_SUCCESS,
      });
      return res.data
    } catch (err) {
      dispatch({
        type: NEW_CARD_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_CARD_FAIL
    });
  }
};


export const new_task = (user, description, is_active) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ user, description, is_active });
    console.log(body, 'body before new_task')
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/`, body, config);
      dispatch({
        type: NEW_TASK_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NEW_TASK_FAIL
      });
    }
  } else {
    dispatch({
      type: NEW_TASK_FAIL
    });
  }
};



export const update_task = (taskID, user, is_active) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    const body = JSON.stringify({ taskID, user, is_active });
    console.log(body)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskID}/`, body, config);
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_TASK_FAIL
      });
    }
  } else {
    dispatch({
      type: UPDATE_TASK_FAIL
    });
  }
};


export const load_clients = (userID) => async dispatch => {

  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?agent=${userID}`, config);
      dispatch({
        type: LOAD_CLIENTS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_CLIENTS_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_CLIENTS_FAIL
    });
  }
};

export const load_deals = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/deals/?agent=${userID}`, config);
      dispatch({
        type: LOAD_DEALS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_DEALS_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_DEALS_FAIL
    });
  }
};

export const load_lists = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/?agent=${userID}`, config);
      dispatch({
        type: LOAD_LISTS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_LISTS_FAIL
      });
    }


  } else {
    dispatch({
      type: LOAD_LISTS_FAIL
    });
  }
};


export const load_tasks = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/?user=${userID}`, config);
      dispatch({
        type: LOAD_TASKS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_TASKS_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_TASKS_FAIL
    });
  }
};

export const load_cards = (userID) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/?user=${userID}`, config);
      dispatch({
        type: LOAD_CARDS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_CARDS_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_CARDS_FAIL
    });
  }
};

export const load_properties = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/`, config);
      dispatch({
        type: LOAD_PROPERTIES_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: LOAD_PROPERTIES_FAIL
      });
    }
  } else {
    dispatch({
      type: LOAD_PROPERTIES_FAIL
    });
  }
};

export const load_user_data = (userID, pathName, forceRefresh) => async (dispatch, getState) => {
  let hasFetched = false;
  let state = getState();

  const shouldFetch = (dataKey, lastFetchedKey) => {
    const hasData = state.agent[dataKey]?.length > 0;
    const isStale = Date.now() - (state.agent[lastFetchedKey] || 0) > 5 * 60 * 1000;
    return forceRefresh || !hasData || isStale;
  };

  try {
    switch (pathName) {
      case '/dashboard/home':
        if (shouldFetch('deals', 'lastFetchedDeals')) {
          await dispatch(load_deals(userID));
          hasFetched = true;
        }
        if (shouldFetch('tasks', 'lastFetchedTasks')) {
          await dispatch(load_tasks(userID));
          hasFetched = true;
        }
        break;
      case '/dashboard/clients':
        if (shouldFetch('clients', 'lastFetchedClients')) {
          await dispatch(load_clients(userID));
          hasFetched = true;
        }
        break;
      case '/dashboard/lists':
        if (shouldFetch('lists', 'lastFetchedLists')) {
          await dispatch(load_lists(userID));
          hasFetched = true;
        }
        break;
      case '/dashboard/deals':
        if (shouldFetch('deals', 'lastFetchedDeals')) {
          await dispatch(load_deals(userID));
          hasFetched = true;
        }
        break;
      case '/dashboard/search':
        if (shouldFetch('properties', 'lastFetchedProperties')) {
          await dispatch(load_properties());
          hasFetched = true;
        }
        break;
      case '/dashboard/cards':
        if (shouldFetch('cards', 'lastFetchedCards')) {
          await dispatch(load_cards(userID));
          hasFetched = true;
        }
        break;
      default:
        console.log("Default case: No matching path");
    }

    if (!hasFetched) {
      console.log("Data is unchanged or fresh, skipping API calls.");
      dispatch({ type: USER_DATA_UNCHANGED });
    }

  } catch (error) {
    console.error("Error loading user data", error);
    dispatch({ type: LOAD_USER_DATA_FAIL });
  }
};


export const set_polygon_props = (filteredProps) => dispatch => {
  if (localStorage.getItem('access')) {
    try {
      dispatch({
        type: SET_POLYGON_FILTER,
        payload: filteredProps
      });
      console.log(filteredProps, "filteredProps")
    } catch (err) {
      dispatch({
        type: SET_POLYGON_FILTER_FAIL
      });
    }
  } else {
    dispatch({
      type: SET_POLYGON_FILTER_FAIL
    });
  }
}


export const set_polygon = (userPolygon) => dispatch => {
  if (localStorage.getItem('access')) {
    try {
      console.log(userPolygon, "userPolygon set")
      dispatch({
        type: SET_POLYGON,
        payload: userPolygon
      });
    } catch (err) {
      console.error(err)
    }
  }
}