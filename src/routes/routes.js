import { useRoutes } from 'react-router-dom';

import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Home } from "../components/Home";
import { Quest } from "../components/questionarios/Quest";
import { Quest2 } from "../components/questionarios/Quest2";
import { Quest3 } from "../components/questionarios/Quest3";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '/home/:uid', element: <Home />},
        {path: '/questionario', element: <Quest />},
        {path: 'questionario2', element: <Quest2 />},
        {path: 'questionario3', element: <Quest3 />}
    ]);
}