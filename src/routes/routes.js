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
import {RoteiroQ3} from "../components/roteiros/RoteiroQ3";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '/home/:uid', element: <Home />},
        {path: '/questionario/:cpf/:nome', element: <Quest />},
        {path: 'monitoramentoContatosProximos/:id', element: <Quest2 />},
        {path: 'questionario3/:cpf', element: <Quest3 />},
        {path: 'roteiroQuestionarioConfirmados/:cpf/:nome', element: <RoteiroQ1 />},
        {path: 'roteiroQuestionarioContatosProximos/:id', element: <RoteiroQ2 />},
        {path: 'roteiroQuestionarioMonitoramentoConfirmados/:cpf', element: <RoteiroQ3 />},
        {path: 'teste', element: <TesteQuestionario />}
    ]);
}