import React, { createContext, useState, useContext } from 'react';
import { database } from '../firebase-config'
import { ref, set, child, get } from "firebase/database";

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

    async function registerPositiveInterviewed(cpf, primeiraParte, segundaParte, terceiraParte){
        try{
            set(ref(database, 'RespostasMonitoramentoConfirmados/' + cpf), {
                primeiraParte: primeiraParte,
                segundaParte: segundaParte,
                terceiraParte: terceiraParte
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

    async function registerConfirmedCase(objCasoConfirmado, cpf){
        try{
            set(ref(database, 'TesteDosConfirmadosConfirmados/' + cpf), {
                primeiraParte: objCasoConfirmado
            });
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <InterviewedContext.Provider value={{interviewed, registerPositiveInterviewed, registerConfirmedCase}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;