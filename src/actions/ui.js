import { 
    RESET_CLIENT_VIEW,
    SET_SEND_MODE,
    RESET_SEND_MODE,
    RESET_LIST_MODE,
    SET_LIST_MODE
} from "./types"


export const reset_client_view = () => dispatch => {
    dispatch({
        type: RESET_CLIENT_VIEW
    });
    return Promise.resolve();
};

export const set_send_mode = () => dispatch => {
    dispatch({
        type: SET_SEND_MODE
    });
    return Promise.resolve();
};

export const set_list_mode = () => dispatch => {
    dispatch({
        type: SET_LIST_MODE
    });
    return Promise.resolve();
};

export const reset_send_mode = () => dispatch => {
    dispatch({
        type: RESET_SEND_MODE
    });
    return Promise.resolve();
};

export const reset_list_mode = () => dispatch => {
    dispatch({
        type: RESET_LIST_MODE
    });
    return Promise.resolve();
};

