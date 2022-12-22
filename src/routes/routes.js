import { useRoutes } from 'react-router-dom';

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Cadastro } from "../pages/Cadastro";

import { QuestionarioConfirmados } from "../components/questionarios/Confirmados";
import { QuestionarioContatosProximos } from "../components/questionarios/ContatosProximos";
import { QuestionarioMonitorandoConfirmados } from "../components/questionarios/MonitoramentoConfirmados";

import {RoteiroConfirmados} from "../components/roteiros/inicio/RoteiroQ1";
import {RoteiroContatosProximos} from "../components/roteiros/RoteiroQ2";
import {RoteiroMonitoramentoConfirmados} from "../components/roteiros/RoteiroQ3";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '/home/:uid', element: <Home />},
        {path: '/questionario/:cpf/:nome', element: <QuestionarioConfirmados />},
        {path: 'monitoramentoContatosProximos/:id', element: <QuestionarioContatosProximos />},
        {path: 'questionario3/:cpf', element: <QuestionarioMonitorandoConfirmados />},
        {path: 'roteiroQuestionarioConfirmados/:cpf/:nome', element: <RoteiroConfirmados />},
        {path: 'roteiroQuestionarioContatosProximos/:id', element: <RoteiroContatosProximos />},
        {path: 'roteiroQuestionarioMonitoramentoConfirmados/:cpf', element: <RoteiroMonitoramentoConfirmados />},
        {path: 'cadastro', element: <Cadastro />}
        // TODO: create new route that redirect to register pages when a not existing route is given
    ]);
}