
const timeoutWare = (store) => (next) => (action) => {
  if (action.type === 'LOGOUT' || action.type === 'PASSWORD_RESET_SUCCESS' ||
    action.type === 'SIGNUP_SUCCESS' || action.type === 'LOGIN_FAIL' || action.type === 'SIGNUP_FAIL'
    || action.type === 'ACTIVATE_SUCCESS' || action.type === 'ACTIVATE_FAIL'
  ) {
    setTimeout(() => {
      store.dispatch({ type: 'CLEAR_MESSAGE' });
    }, 3000);
  }
  return next(action);
};

export default timeoutWare;