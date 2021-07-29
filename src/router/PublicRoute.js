import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...res
}) => {
    return (
        <Route 
            {...res}
            component={ (props) => (
                ( !isAuthenticated )
                ? <Component {...props}/>
                : <Redirect to="/" />
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

