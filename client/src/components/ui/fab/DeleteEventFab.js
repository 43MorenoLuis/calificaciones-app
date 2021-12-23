import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../../actions/events';

export default function DeleteEventFab() {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( eventDeleted() );
    }

    return (
        <button 
            className='btn btn-danger __fab-danger'
            onClick={ handleDelete }
        >
            <i className='fas fa-trash'> Borrar evento</i>
        </button>
    )
}
