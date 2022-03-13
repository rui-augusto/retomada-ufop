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

    // FUNCAO QUE ENVIA OS DADOS REFERENTES AO MONITORAMENTO DE UM CASO CONFIRMADO

    async function registerMonitoringConfirmedCase(objCasoConfirmado, where){
        try{
            set(ref(database, `RespostasMonitoramentoConfirmados/${where}`), {
                objetoDados: objCasoConfirmado
            });
        }catch(error){
            console.log(error.message);
        }
    }

    // FUNCAO QUE ENVIA OS DADOS REFERENTES AO MONITORAMENTO DE UM CONTATO PROXIMO
    async function registerMonitoringCloseContacts(objContatoProximo, where){
        try{
            set(ref(database, 'MonitoramentoContatosProximos/' + where), {
                objetoDados: objContatoProximo
            });
        }catch(error){
            console.log(error.message);
        }
    }

    async function addQtdEntrevistaConfirmado(cpf){
        const entrevistasRealizadasInfo = await getInfoOfConfirmedCase(cpf, "entrevistasRealizadas");
        const entrevistasRealizadas = entrevistasRealizadasInfo + 1;
        const quantidadeEntrevistasInfo = await getInfoOfConfirmedCase(cpf, "quantidadeEntrevistas");
        const quantidadeEntrevistas = quantidadeEntrevistasInfo;
        const frequenciaInfo = await getInfoOfConfirmedCase(cpf, "frequenciaDiasMonitoramento");
        const frequencia = frequenciaInfo;
        const proxEntrevistaInfo = await getInfoOfConfirmedCase(cpf, "dataProximaEntrevista");
        const proxEntrevista = proxEntrevistaInfo;

        const updates = {};
        updates['/Confirmados/' + cpf + '/objetoDados/entrevistasRealizadas'] = entrevistasRealizadas;
        if (entrevistasRealizadas == quantidadeEntrevistas){
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "recuperado";
        }
        updates['/Confirmados/' + cpf + '/objetoDados/dataProximaEntrevista'] = frequencia * 86400 + proxEntrevista;

        // database.ref(`/Confirmados/${cpf}/objetoDados/`).update(alteracao);
        await update(ref(database), updates);
    }

    async function addQtdEntrevistaContatoProximo(id){
        const entrevistasRealizadasInfo = await getInfoOfClosedContact(id, "entrevistasRealizadas");
        const entrevistasRealizadas = entrevistasRealizadasInfo + 1;
        const quantidadeEntrevistasInfo = await getInfoOfClosedContact(id, "quantidadeEntrevistas");
        const quantidadeEntrevistas = quantidadeEntrevistasInfo;
        const proxEntrevistaInfo = await getInfoOfConfirmedCase(id, "dataProximaEntrevista");
        const proxEntrevista = proxEntrevistaInfo;

        const updates = {};
        updates['/ContatosProximos/' + id + '/objetoDados/dataProximaEntrevista'] = proxEntrevista + 172800;
        updates['/ContatosProximos/' + id + '/objetoDados/entrevistasRealizadas'] = entrevistasRealizadas;
        if (entrevistasRealizadas == quantidadeEntrevistas){
            updates['/ContatosProximos/' + id + '/objetoDados/situacao'] = "recuperado";
        }
        await update(ref(database), updates);
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
        await setLstConfirmados(Object.values(objConfirmados));
        setObjContProximos(await getRefFromDataBase("ContatosProximos"));
        await setLstContProximos(Object.values(objContProximos));
    }

    async function addTryIn(where, cpf){
        const databaseInfo = await get(child(ref(database), `/${where}/${cpf}/objetoDados/`));
        const tentativas = databaseInfo.val().contTentativas + 1;

        const updates = {};
        updates['/' + where + '/' + cpf + '/objetoDados/contTentativas'] = tentativas;
        if (tentativas + 1 == "3"){
            updates['/' + where + '/' + cpf + '/objetoDados/situacao'] = "contatoSemSucesso";
        }

        // database.ref(`/Confirmados/${cpf}/objetoDados/`).update(alteracao);
        await update(ref(database), updates);
    }


    async function getInfoOfConfirmedCase(cpf, info){
        const situacaoInfo = await get(child(ref(database), `Confirmados/${cpf}/objetoDados/${info}`));
        return situacaoInfo.val();
    }

    async function getInfoOfClosedContact(id, info){
        const situacaoInfo = await get(child(ref(database), `ContatosProximos/${id}/objetoDados/${info}`));
        return situacaoInfo.val();
    }

    async function changeSituation(cpf){
        const updates = {};
        
        const situacaoInfo = await getInfoOfConfirmedCase(cpf, "situacao");
        if (situacaoInfo == "expirado" || situacaoInfo == "expiradoInterno"){
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "encerrado";
        }
        else{
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "andamento";
        }

        await update(ref(database), updates);
    }

    //funcao pra alterar as datas para timestamp
    async function changeData(updates){
        await update(ref(database), updates);
    }

    async function refusalQuest(cpf, objRecusa){
        try{
            set(ref(database, 'Recusas/' + cpf), {
                objetoDados: objRecusa
            });
        }catch(error){
            console.log(error.message);
        }


        const updates = {};
        updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "recusa";
        await update(ref(database), updates);

    }

    async function refusalQuestCP(id, objRecusa){
        try{
            set(ref(database, 'Recusas/' + id), {
                objetoDados: objRecusa
            });
        }catch(error){
            console.log(error.message);
        }


        const updates = {};
        updates['/ContatosProximos/' + id + '/objetoDados/situacao'] = "recusa";
        await update(ref(database), updates);

    }


    return (
        <InterviewedContext.Provider value={{interviewed, registerPositiveInterviewed, registerConfirmedCase, registerCloseContacts, registerMonitoringCloseContacts, getRefFromDataBase, addTryIn, changeSituation, lstConfirmados, lstContProximos, getInfoFromDatabase, countingCloseContacts, refusalQuest, changeData, registerMonitoringConfirmedCase, addQtdEntrevistaConfirmado, addQtdEntrevistaContatoProximo, getInfoOfClosedContact, refusalQuestCP}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;