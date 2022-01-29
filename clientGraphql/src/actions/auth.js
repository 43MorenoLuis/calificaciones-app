import { fetchNoToken, fetchYesToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { eventLogout } from "./events";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../Graphql/Mutations";

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        // const resp = await fetchNoToken( 'auth/signIn', { email, password }, 'POST');
        const [ login, { error } ] = useMutation(SIGN_IN);

        const resp =login({
            variables:{
                input:{
                    email,
                    password
                }
            }
        })

        console.log( resp , '[MUTATION]')

        const body = await resp

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

export const startChecking = () => {
    return async( dispatch ) => {

        // const resp = await fetchYesToken( 'auth/renew' );
        // const body = await resp.json();

        // console.log(body)
        
        // if( body.ok ){
        //     localStorage.setItem('token', body.token );
        //     localStorage.setItem('token-init-date', new Date().getTime() );
            
        //     const { uid, name } = body 

        //     dispatch( login({
        //         uid,
        //         name
        //     }))
        // }else{
        //     dispatch( checkingFinish() );
        // }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.authLogout
})