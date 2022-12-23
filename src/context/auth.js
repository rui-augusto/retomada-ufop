import React, { useState, useEffect, createContext, useContext } from 'react';

import { useUser } from "./user";

// import { Register } from "../pages/Register";

const AuthContext = createContext({});

export function AuthProvider({ children }){

    const userContext = useUser();

    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        if(userContext.isUserLogged()){
            console.log("validado");
            setCurrentUser(userContext.isUserLogged);
            setPending(false);
        }
    }, []);

    if(pending){
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value = {{ currentUser }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export default AuthContext;