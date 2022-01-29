import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Routes
  } from 'react-router-dom';
import { startChecking } from '../actions/auth';

import LoginScreen from '../components/auth/login/LoginScreen';
import RegisterScreen from '../components/auth/register/RegisterScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import HomeScreen from '../components/home/HomeScreen';
import NotFoundScreen from '../components/notFound/NotFoundScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export default function AppRouter() {

    const dispatch = useDispatch();
    const { checking } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);


    console.log( checking )
    if( checking ){
         return (<h1>Wait...</h1>)
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" 
                        element={ 
                            <PublicRoute>
                                <LoginScreen />
                            </PublicRoute>
                        } 
                    />
                    <Route path="/*" 
                        element={ 
                            <PrivateRoute>
                                <CalendarScreen/>
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/register" 
                        element={ 
                            <PrivateRoute>
                                <RegisterScreen/>
                            </PrivateRoute>
                        } 
                    />
                    <Route path='/home' 
                        element={
                            <PrivateRoute>
                                <HomeScreen/>
                            </PrivateRoute>
                        }
                    />
                    <Route exact path="*" element={ <NotFoundScreen/> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
