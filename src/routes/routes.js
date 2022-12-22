import { useRoutes } from 'react-router-dom';

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Cadastro } from "../pages/Cadastro";

import { Quest } from "../components/questionarios/Quest";
import { Quest2 } from "../components/questionarios/Quest2";
import { Quest3 } from "../components/questionarios/Quest3";

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
        {path: 'teste', element: <Quest />},
        {path: 'cadastro', element: <Cadastro />}
        // {path: '*', element: <Register />}
    ]);
}