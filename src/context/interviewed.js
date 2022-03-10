import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../firebase-config'
import { ref, set, push, child, get, update } from "firebase/database";
import { useUser } from "../context/user";


const InterviewedContext = createContext({});

export function InterviewedProvider({children}){

    const contextUser = useUser();


    const [interviewed, setInterviewed] = useState({});
    const [primeiraParte, setPrimeiraParte] = useState({});

    const [objConfirmados, setObjConfirmados] = useState({});
    const [objContProximos, setObjContProximos] = useState({});
    const [lstConfirmados, setLstConfirmados] = useState([]);
    const [lstContProximos, setLstContProximos] = useState([]);


    async function receiveFirstData(primeiraParte){
        setPrimeiraParte(primeiraParte);
    }

    const show = () => {
        console.log(primeiraParte);
    }


    useEffect(() => {
        getInfoFromDatabase();
        registerCloseContacts({});
    }, [contextUser.user]);

    //FUNCAO QUE ENVIA OS DADOS DO QUESTIONARIO QUE EH CASO CONFIRMADO
    async function registerPositiveInterviewed(cpf, dadosQuest){
        try{
            set(ref(database, 'RespostasQuestionario3/' + cpf), {
                objetoDados: dadosQuest
            });
        }catch(error){
            console.log(error.message);
        }
    }

    //FUNCAO QUE CONTA A QUANTIDADE DE CADASTRADOS COMO CONTATOS PROXIMOS
    async function countingCloseContacts(){
        const databaseInfo = await getRefFromDataBase("ContatosProximos");
        const lstContatosProximos = Object.values(databaseInfo);
        const tamanhoBanco = lstContatosProximos.length + 1;
        return tamanhoBanco;
    }

    //FUNCAO QUE ENVIA OS DADOS REFERENTES A UM CONTATO PROXIMO
    async function registerCloseContacts(objContatoProximo){
        const databaseInfo = await getRefFromDataBase("ContatosProximos");
        const lstContatosProximos = await Object.values(databaseInfo);
        const tamanhoBanco = lstContatosProximos.length + 1;
        // tentar mudar depois para que a funcao acima seja reutilizada (mesma coisa)
        try{
            set(ref(database, 'ContatosProximos/' + tamanhoBanco), {
                objetoDados: objContatoProximo
            });
            // alert("Contato Próximo cadastrado com sucesso!");
        }catch(error){
            // alert("Ocorreu um erro durante o cadastro. Favor tentar novamente.");
            console.log(error.message);
        }
    }


    // FUNCAO QUE ENVIA OS DADOS REFERENTES A UM CONTATO QUE EH CASO CONFIRMADO
    async function registerConfirmedCase(objCasoConfirmado, cpf){
        try{
            set(ref(database, 'Confirmados/' + cpf), {
                objetoDados: objCasoConfirmado
            });
        }catch(error){
            console.log(error.message);
        }
    }

    // FUNCAO QUE ENVIA OS DADOS REFERENTES AO MONITORAMENTO DE UM CONTATO PROXIMO
    async function registerMonitoringCloseContacts(objContatoProximo, dataDeveSerMudada){
        try{
            set(ref(database, 'MonitoramentoContatosProximos/' + dataDeveSerMudada), {
                objetoDados: objContatoProximo
            });
        }catch(error){
            console.log(error.message);
        }
    }

    async function getRefFromDataBase(referencia){
        const databaseInfo = await get(child(ref(database), referencia));
        if (databaseInfo){
            setInterviewed(databaseInfo.val());
            return databaseInfo.val();
        } else{
            console.log("Deu merda");
        }

        return databaseInfo;
    }

    async function getInfoFromDatabase(){
        setObjConfirmados(await getRefFromDataBase("Confirmados"));
        setLstConfirmados(Object.values(objConfirmados));
        setObjContProximos(await getRefFromDataBase("ContatosProximos"));
        setLstContProximos(Object.values(objContProximos));
    }

    async function addTryIn(where, cpf){
        const databaseInfo = await get(child(ref(database), `/${where}/${cpf}/objetoDados/`));
        var tentativas = databaseInfo.val().contTentativas;

        const updates = {};
        updates['/Confirmados/' + cpf + '/objetoDados/contTentativas'] = tentativas + 1;
        if (tentativas + 1 == "3"){
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "expirado";
        }

        // database.ref(`/Confirmados/${cpf}/objetoDados/`).update(alteracao);
        await update(ref(database), updates);
    }

    async function getInfoOfConfirmedCase(cpf, info){
        const situacaoInfo = await get(child(ref(database), `Confirmados/${cpf}/objetoDados/${info}`));
        return situacaoInfo.val();
    }

    async function changeSituation(cpf){
        const updates = {};
        
        var situacaoInfo = await getInfoOfConfirmedCase(cpf, "situacao");
        if (situacaoInfo == "expirado" || situacaoInfo == "expiradoInterno"){
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "encerrado";
        }
        else{
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "andamento";
        }

        await update(ref(database), updates);
    }

    async function updateConfirmedCase(cpf, updates){
        var contTentativasInfo = getInfoOfConfirmedCase(cpf, "contTentativas");
        // var contTentativas = contTentativasInfo.val() + 1;
        // var entrevistasRealizadasInfo;
        await update(ref(database), updates);
    }


    return (
        <InterviewedContext.Provider value={{interviewed, registerPositiveInterviewed, registerConfirmedCase, registerCloseContacts, registerMonitoringCloseContacts, getRefFromDataBase, addTryIn, changeSituation, lstConfirmados, lstContProximos, getInfoFromDatabase, countingCloseContacts, updateConfirmedCase}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;