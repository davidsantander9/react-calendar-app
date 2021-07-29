import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startCheckin } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector( state => state.auth );
    const uidCheck = uid === undefined ? null : uid

    useEffect(() => {
        dispatch( startCheckin() );
    }, [dispatch]);

    if ( checking ) {
        return (<h5>Wait...</h5>)
    } 

    return (
        <Router>
            <div>
            <Switch>
                    <PublicRoute
                        exact 
                        path='/login' 
                        component={ LoginScreen }
                        isAuthenticated={ !!uidCheck }
                        />
                    <PrivateRoute 
                        exact 
                        isAuthenticated={ !!uidCheck }
                        path='/' 
                        component={ CalendarScreen }/>
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
