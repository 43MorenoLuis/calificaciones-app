import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';
import { startChecking } from '../actions/auth';

import LoginScreen from '../components/auth/login/LoginScreen';
import RegisterScreen from '../components/auth/register/RegisterScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import HomeScreen from '../components/home/HomeScreen';
import NotFoundScreen from '../components/notFound/NotFoundScreen';

export default function AppRouter() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={ <HomeScreen/> } />
                    <Route path="/login" element={ <LoginScreen/> } />
                    <Route path="/register" element={ <RegisterScreen/> } />
                    <Route path="/calendar" element={ <CalendarScreen/> } />
                    <Route exact path="*" element={ <NotFoundScreen/> } />
                </Routes>
            </div>
        </Router>
    )
}
