import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';

export default function LoginScreen() {

    const dispatch = useDispatch();

    const [ formLoginValues, setFormLoginValues ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin( email, password ) );
    }

    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                    <h3>Sign in to your account</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={ email }
                                onChange={ setFormLoginValues }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={ password }
                                onChange={ setFormLoginValues }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Sign In" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login__form-2">
                    <h1>Login Sistema de Calificaciones</h1>
                    <span>
                        Commodo cupidatat Lorem amet eiusmod tempor enim ut enim dolor. 
                        Lorem velit fugiat enim amet voluptate Lorem ea irure fugiat proident aute. 
                        Velit consectetur exercitation nisi minim veniam consequat eu laboris et in nulla enim aute. 
                        Ut incididunt aute velit est nisi id incididunt nostrud dolore sunt. 
                        Dolor incididunt cupidatat anim commodo nostrud cillum elit minim labore in anim amet id.
                    </span>
                </div>
            </div>
        </div>
    )
}
