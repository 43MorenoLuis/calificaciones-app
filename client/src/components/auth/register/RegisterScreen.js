import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';

export default function RegisterScreen() {

    const dispatch = useDispatch();

    const [ formRegisterValues, setFormRegisterValues ] = useForm({
        name: '',
        email: '',
        password1: '',
        password2: '',
        rol: 'USER_ROLE'
    });

    const { name, email, password1, password2, rol } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( password1 !== password2 ){
            return Swal.fire('Error', 'Incorrect password', 'error');
        }
        dispatch( startRegister( name, email, password1, rol ) );
    }

    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                <h3>Register your account</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={ name }
                                onChange={ setFormRegisterValues }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={ email }
                                onChange={ setFormRegisterValues }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="password1"
                                value={ password1 }
                                onChange={ setFormRegisterValues }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password" 
                                name="password2"
                                value={ password2 }
                                onChange={ setFormRegisterValues }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Sign Up" />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login__form-2">
                <h1>Registro al Sistema de Calificaciones</h1>
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
