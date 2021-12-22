import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/es';

import NavbarScreen from '../ui/navbar/NavbarScreen';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [{
    title: 'Cumpleaños de Yu',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
        _id: '123',
        name: '43MorenoLuis'
    }
}];

moment.locale('es');

export default function CalendarScreen() {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
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
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    return (
        <div className='__calendar-screen'>
            <NavbarScreen />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal/>
        </div>
    )
}
