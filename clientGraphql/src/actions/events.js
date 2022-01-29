import Swal from "sweetalert2";
import { fetchYesToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchYesToken('events', event, 'POST');
            const body = await resp.json();

            if( body.ok ){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew( event )); 
            }

        } catch (error) {
            console.log(error);   
        }
    }
}


const eventAddNew = (events) => ({
    type: types.eventAddNew,
    payload: events
});

export const eventStartLoading = () => {
    return async( dispatch ) => {
        
        try {
            const resp = await fetchYesToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.events );
            dispatch( eventLoaded( events ));

        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = ( events ) => ({
    type: types.eventsLoaded,
    payload: events
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = ( event ) => {
    return async( dispatch ) => {

        try {
            const resp = await fetchYesToken(`events/${ event._id }`, event, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventUpdated( event ) );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async( dispatch, getState ) => {

        const { _id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchYesToken(`events/${ _id }`, {}, 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventDeleted() );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = ( event ) => ({
    type: types.eventDeleted
});

export const eventLogout = () => ({
    type: types.eventLogout
})
 