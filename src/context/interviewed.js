import React, { createContext, useState, useContext } from 'react';
import { database } from '../firebase-config'
import { ref, set, push, child, get } from "firebase/database";

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
            console.log(databaseInfo);
            console.log(databaseInfo.val());
        } else{
            console.log("Deu merda");
        }

        return databaseInfo;
    }

    return (
        <InterviewedContext.Provider value={{interviewed, registerPositiveInterviewed, registerConfirmedCase, registerCloseContacts, registerMonitoringCloseContacts, getRefFromDataBase}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;