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
            set(ref(database, 'RespostasQuestionario3/' + cpf), {
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

    async function getRefFromDataBase(referencia){
        const databaseInfo = await get(child(ref(database), referencia));
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
        const databaseInfo = await get(child(ref(database), `/Confirmados/${cpf}/objetoDados/`));
        var tentativas = databaseInfo.val().contTentativas;

        const updates = {};
        updates['/Confirmados/' + cpf + '/objetoDados/contTentativas'] = tentativas + 1;
        if (tentativas + 1 == "3"){
            updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = "expirado";
        }

        // database.ref(`/Confirmados/${cpf}/objetoDados/`).update(alteracao);
        await update(ref(database), updates);

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