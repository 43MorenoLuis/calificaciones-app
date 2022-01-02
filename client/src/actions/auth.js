import { fetchNoToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchNoToken( 'auth/signIn', { email, password }, 'POST');
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

export const startRegister = ( name, email, password, rol ) => {
    return async( dispatch ) => {
        const resp = await fetchNoToken( 'auth/signUp', { name, email, password, rol }, 'POST');
        const body = await resp.json();
        
        if( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            const { uid, name } = body.user 
            Swal.fire('Good luck', body.msg, 'success');            

            dispatch( login({
                uid,
                name
            }))
        }else{
            Swal.fire('Error', body?.msg ? body.msg : body.errors[0].msg, 'error');
        }

    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});