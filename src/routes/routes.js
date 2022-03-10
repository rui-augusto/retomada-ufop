import { useRoutes } from 'react-router-dom';

import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Home } from "../components/Home";
import { Quest } from "../components/questionarios/Quest";
import { Quest2 } from "../components/questionarios/Quest2";
import { Quest3 } from "../components/questionarios/Quest3";

import {TesteQuestionario} from "../components/questionarios/testeQuestionario";
import {RoteiroQ1} from "../components/roteiros/RoteiroQ1";
import {RoteiroQ2} from "../components/roteiros/RoteiroQ2";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '/home/:uid', element: <Home />},
        {path: '/questionario', element: <Quest />},
        {path: 'monitoramentoContatosProximos', element: <Quest2 />},
        {path: 'questionario3', element: <Quest3 />},
        {path: 'roteiroQuestionarioConfirmados', element: <RoteiroQ1 />},
        {path: 'roteiroQuestionarioContatosProximos', element: <RoteiroQ2 />},
        {path: 'teste', element: <RoteiroQ1 />}
    ]);
}