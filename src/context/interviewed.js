import React, { createContext, useState, useContext } from 'react';
import { database } from '../firebase-config'
import { ref, set, child, get } from "firebase/database";

const InterviewedContext = createContext({});

export function InterviewedProvider({children}){
    const [interviewed, setInterviewed] = useState({});

    async function registerInterviewed(name, primeiraParte, segundaParte, terceiraParte){
        console.log(segundaParte);
        try{
            set(ref(database, 'entrevistados/' + name), {
                primeiraParte: primeiraParte,
                segundaParte: segundaParte,
                terceiraParte: terceiraParte
            });
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <InterviewedContext.Provider value={{interviewed, registerInterviewed}}>
            {children}
        </InterviewedContext.Provider>
    )
}

export function useInterviewed(){
    const context = useContext(InterviewedContext);
    return context;
}

export default InterviewedContext;