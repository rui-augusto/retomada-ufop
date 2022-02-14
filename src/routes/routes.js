import { useRoutes } from 'react-router-dom';

import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login/>},
        {path: '/register', element: <Register/>}
    ]);
}