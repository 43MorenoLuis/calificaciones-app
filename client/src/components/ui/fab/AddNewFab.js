import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../../actions/ui';

export default function AddNewFab() {

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button 
            className='btn btn-primary __fab'
            onClick={ handleOpenModal }
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
