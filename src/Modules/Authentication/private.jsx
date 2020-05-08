import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authenticationService } from '../../components/authorization';

export default function PrivateRoute({ component: Component, ...otherProps }) {
    return (
        <Route {...otherProps} render={(props) => {
            const currentUser = authenticationService.user();
            if (!currentUser)
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            return <Component {...otherProps} />
        }}>

        </Route>
    )
}