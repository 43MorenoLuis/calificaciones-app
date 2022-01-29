import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/es';

import NavbarScreen from '../ui/navbar/NavbarScreen';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import AddNewFab from '../ui/fab/AddNewFab';
import DeleteEventFab from '../ui/fab/DeleteEventFab';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

moment.locale('es');

export default function CalendarScreen() {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [dispatch])

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    return (
        <div className='__calendar-screen'>
            <NavbarScreen />
            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ onSelectSlot }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            { ( activeEvent ) && <DeleteEventFab />}
        
            <CalendarModal />
        </div>
    )
}
