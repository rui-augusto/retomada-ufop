import React, { createContext, useState, useEffect, useContext } from 'react';
//firebase imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from '../firebase-config'
import { ref, set, child, get } from "firebase/database";
// troquei doc por child

const UserContext = createContext({});

export function UserProvider({children}){

    const [user, setUser] = useState({});
    const [userID, setUserID] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
                console.log(user);
            } else{
                console.log("ninguem conectado");
            }
        });
    }, []);

    async function isUserLogged(){
        onAuthStateChanged(auth, (user) => {
            if (user){
                return user;
            }
            return false;
        })
    }

    async function registerUser(name, email, password, role, navigate){
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password);

            set(ref(database, 'users/' + res.user.uid), {
                name: name,
                email: email,
                role: role 
            });
            console.log(res.user.uid);
            alert("Usuário criado com sucesso!")
            navigate(`../`);
        }catch (error){
            console.log(error.message);
        }
    }


    async function loginUser(email, password, navigate){
        try{
            const res = await signInWithEmailAndPassword(
            auth,
            email,
            password
            );
            getUserInfo(res.user.uid);
            localStorage.setItem("id", res.user.uid);
            navigate(`/home/${res.user.uid}`);
        }catch(error){
            console.log(error.message);
            alert("E-mail ou senha incorreto!");
        }
    }

    async function userLogout(navigate){
        navigate('/');
        signOut(auth);
        // setUser(null);
    }

    async function getUserInfo(userId){
        // setUserId(userId);
        const userInfo = await get(child(ref(database), `users/${userId}`)); /* esta retornando todos os users*/
        if(userInfo){
            setUser(userInfo.val());
            console.log(userInfo.val());
        }else {
            console.log('User was not found!');
        }
    }
    
      return (
        <UserContext.Provider value={
            {user, userID, registerUser, loginUser, userLogout, getUserInfo, isUserLogged}
        }>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const context = useContext(UserContext);
    return context;
}

export default UserContext;