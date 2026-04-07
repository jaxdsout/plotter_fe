import {
  ACTIVATE_FAIL,
  ACTIVATE_SUCCESS,
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
  PASSWORD_RESET_SUCCESS,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS
} from './types';

import axios from 'axios';
import { Base64 } from 'js-base64';
import { load_user_data } from './agent';



export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/jwt/create/`, body, config);

    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(auth_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.detail || 'Login failed. Please try again.',
    });
  }
};

export const auth_user = (pathName) => async (dispatch) => {
  const access = localStorage.getItem('access');

  if (!access) {
    dispatch({ type: AUTHENTICATE_FAIL });
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`
    },
  };

  const body = JSON.stringify({ token: access });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/jwt/verify/`, body, config);

    dispatch({ type: AUTHENTICATE_SUCCESS });
    dispatch(load_user(pathName));
    console.log("triggering load user")
  } catch (err) {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/jwt/refresh/`, { refresh }, config);

        localStorage.setItem('access', res.data.access);

        dispatch({ type: AUTHENTICATE_SUCCESS });
        dispatch(load_user(pathName));
      } catch (refreshErr) {
        dispatch({ type: AUTHENTICATE_FAIL });
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    } else {
      dispatch({ type: AUTHENTICATE_FAIL });
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }
};

export const load_user = (pathName) => async (dispatch) => {
  const access = localStorage.getItem('access');

  if (!access) {
    dispatch({ type: LOAD_USER_FAIL });
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
    },
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/`, config);
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
    dispatch(load_user_data(res.data.id, pathName));
    console.log("triggering load user data")

  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};


export const refresh_token = () => async dispatch => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) {
    dispatch({ type: REFRESH_TOKEN_FAIL });
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ refresh });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/jwt/refresh/`, body, config);

    localStorage.setItem('access', res.data.access);

    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: res.data.access,
    });
  } catch (err) {
    dispatch({ type: REFRESH_TOKEN_FAIL });
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
};




export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const cap_first_name = capitalize(first_name);
  const cap_last_name = capitalize(last_name);

  const body = JSON.stringify({
    first_name: cap_first_name,
    last_name: cap_last_name,
    email,
    password,
    re_password
  });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/`, body, config);
    console.log('url', process.env.REACT_APP_API_URL)
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL
    });
  }
};


export const activate = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const encodedUid = Base64.encode(uid);
  const body = JSON.stringify({ uid: encodedUid, token });
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/users/activation/`, body, config);

    dispatch({
      type: ACTIVATE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: ACTIVATE_FAIL
    })
  }
}

export const reset_password = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email })

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset_password/`, body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: res.data
    })


  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    })
  }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password })

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset_password_confirm/`, body, config);

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
      payload: res.data
    })


  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    })
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
}

export const lock_out = () => dispatch => {
  dispatch({ type: LOCK_OUT });
  window.location.href = '/login/';
};




