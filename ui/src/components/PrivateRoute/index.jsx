import React from 'react';
import { AuthContext } from '../../context';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
    const { path, component, exact } = props;
    const auth = React.useContext(AuthContext);

    if (auth.isAuthenticated) {
        return <Route path={path} component={component} exact={exact} />
    }   

    return (
        <Redirect to="/" />
    )
};
