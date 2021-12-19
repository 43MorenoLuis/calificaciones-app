import React from 'react'

export default function RegisterScreen() {
    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                <h3>Registro</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                // value={ rName }
                                // onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                // value={ rEmail }
                                // onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                // value={ rPassword1 }
                                // onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                // value={ rPassword2 }
                                // onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
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
