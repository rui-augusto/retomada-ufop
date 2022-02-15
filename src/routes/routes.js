import { useRoutes } from 'react-router-dom';

import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Home } from "../components/Home";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '/home:uid', element: <Home/>}
    ]);
}