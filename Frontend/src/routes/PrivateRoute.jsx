import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, allowedRoles }) => {
    const autenticado = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!autenticado) return <Navigate to='/login' />;

    if (allowedRoles && !allowedRoles.includes(rol)) {
        if (rol === 'administrador') return <Navigate to='/dashboard' />;
        if (rol === 'profesor') return <Navigate to='/profesor-dashboard' />;
        return <Navigate to='/login' />;
    }

    return children;
};