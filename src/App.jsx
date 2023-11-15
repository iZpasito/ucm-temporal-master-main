import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Agendar from "./components/paginas/PagAgendar";
import AdmAgendar from "./components/paginas/AdmAgendar";
import Login from "./components/paginas/login";
import PageError from "./components/paginas/page-error";
import AdmInformes from "./components/paginas/AdmInformes";
import ReservasUser from "./components/paginas/MisReservas";
import { createContext, useEffect, useState } from "react";
import PrivateRoute from "./components/utils/privateRoute";

export const LoginContext = createContext({});

export default function App() {
    const [loggedIn, setLoggedIn] = useState(
        sessionStorage.getItem('access') ? true : false
    );

    useEffect(() => {
        const intervalId = setInterval(refreshTokens, 240000); // Actualiza cada 5 minutos

        function refreshTokens() {
            if (sessionStorage.getItem('refresh')) {
                const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/login/user/refresh-token/';
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: sessionStorage.getItem('refresh'),
                    }),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la actualización del token');
                    }
                    return response.json();
                })
                .then((data) => {
                    sessionStorage.setItem('access', data.access);
                    sessionStorage.setItem('refresh', data.refresh);
                    setLoggedIn(true);
                })
                .catch((error) => {
                    console.error('Error al actualizar tokens:', error);
                    // Aquí podrías implementar una lógica adicional para manejar los errores.
                });
            }
        }

        refreshTokens(); // Ejecuta una vez al cargar

        return () => clearInterval(intervalId); // Limpieza del intervalo
    }, []);

    function changeLoggedIn(value) {
        setLoggedIn(value);
        
        if (value === false) {
            sessionStorage.clear();
        }
    }

    const RequireAuth = ({ children, role }) => {
        const location = useLocation();
        const loggedIn = sessionStorage.getItem('access') ? true : false;
        const userRole = sessionStorage.getItem('rol');

        if (!loggedIn || userRole !== role) {
            return <Navigate to="/login" state={{ from: location }} />;
        }

        return children;
    };

    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/user/agendar" element={<RequireAuth role="USUARIO"><Agendar /></RequireAuth>} />
                    <Route path="/user/mis-reservas" element={<RequireAuth role="USUARIO"><ReservasUser /></RequireAuth>} />
                    <Route path="/adm/informes" element={<RequireAuth role="ADMIN"><AdmInformes /></RequireAuth>} />
                    <Route path="/adm/agendar" element={<RequireAuth role="ADMIN"><AdmAgendar /></RequireAuth>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/404" element={<PageError />} />
                    <Route path="/*" element={<PageError />} />
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}