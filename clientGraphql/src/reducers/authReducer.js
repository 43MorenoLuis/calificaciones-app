import { types } from "../types/types";

const initialState = {
    checking: false,
}

export const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: true,
                ...action.payload
            }
        
        case types.authCheckingFinish:
            return {
                ...state,
                checking: true
            }
        
        case types.authLogout:
            return {
                checking: true
            }
        default:
            return state;
    }
}