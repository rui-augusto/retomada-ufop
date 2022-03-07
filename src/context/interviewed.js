import React, { createContext, useState, useContext } from 'react';
import { database } from '../firebase-config'
import { ref, set, push, child, get, update } from "firebase/database";

const InterviewedContext = createContext({});

export function InterviewedProvider({children}){
    const [interviewed, setInterviewed] = useState({});
    const [primeiraParte, setPrimeiraParte] = useState({});

    async function receiveFirstData(primeiraParte){
        setPrimeiraParte(primeiraParte);
    }

    const show = () => {
        console.log(primeiraParte);
    }


    //FUNCAO QUE ENVIA OS DADOS DO QUESTIONARIO QUE EH CASO CONFIRMADO
    async function registerPositiveInterviewed(cpf, primeiraParte, segundaParte){
        try{
            set(ref(database, 'RespostasMonitoramentoConfirmados/' + cpf), {
                primeiraParte: primeiraParte,
                segundaParte: segundaParte
            });
        }catch(error){
            console.log(error.message);
        }
    }

    // async function registerCloseContacts(cpf, closedContactsAnswers){
    //     try{
    //         set(ref(database, 'RespostasMonitoramentoConfirmados/' + cpf), {
                
    //         });
    //     }
    // }

    //FUNCAO QUE ENVIA OS DADOS REFERENTES A UM CONTATO PROXIMO
    async function registerCloseContacts(objContatoProximo, dataDeveSerMudada){
        try{
            set(ref(database, 'ContatosProximos/' + dataDeveSerMudada), {
                objetoDados: objContatoProximo
            });
        }catch(error){
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

    async function getRefFromDataBase(){
        const databaseInfo = await get(child(ref(database), `/Confirmados`));
        if (databaseInfo){
            setInterviewed(databaseInfo.val());
            console.log(databaseInfo.val());
            return databaseInfo.val();
        } else{
            console.log("Deu merda");
        }

        return databaseInfo;
    }

    async function addTryConfirmado(cpf){
        const databaseInfo = await update(child(ref(database), `/Confirmados/${cpf}/objetoDados/`));
        var tentativa = databaseInfo.contTentativas + 1;
        child(ref(database), `/Confirmados/${cpf}/objetoDados/`)
            .update({ contTentativas: tentativa});

    }

    return (
        <InterviewedContext.Provider value={{interviewed, registerPositiveInterviewed, registerConfirmedCase, registerCloseContacts, registerMonitoringCloseContacts, getRefFromDataBase, addTryConfirmado}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;