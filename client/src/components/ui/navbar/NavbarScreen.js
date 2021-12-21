import React from 'react'

export default function NavbarScreen() {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                43MorenoLuis
            </span>
            
            <button 
                className="btn btn-outline-danger"
                
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
