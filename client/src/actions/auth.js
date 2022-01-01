import { fetchNoToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchNoToken( 'auth/login', { email, password }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            const { uid, name } = body.user 

            dispatch( login({
                uid,
                name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});