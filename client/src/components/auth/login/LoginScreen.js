import React from 'react'

export default function LoginScreen() {
    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                // value={ lEmail }
                                // onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                // value={ lPassword }
                                // onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
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
