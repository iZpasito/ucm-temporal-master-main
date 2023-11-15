import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { LoginContext } from '../../App' // Importa tu contexto de Login


const PrivateRoute = ({ children, role, ...rest }) => {
    const [loggedIn, ] = useContext(LoginContext);
    const userRole = sessionStorage.getItem('rol'); // Obtiene el rol del usuario del sessionStorage

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn && userRole === role ? (
                    children
                ) : (
                    <Navigate to="/login" state={{ from: location }} />
                )
            }
        />
    );
};

export default PrivateRoute;