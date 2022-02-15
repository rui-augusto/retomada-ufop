import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from "../context/user";
import { useNavigate } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai';
import "./style.css"
/*firebase import */
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config'

export const Login = () => {
    const navigate = useNavigate();

    const context = useUser();
    const { userId } = useUser();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    async function loginUser(){
        await context.loginUser(loginEmail, loginPassword, navigate);
    }

    return (
        <div className = "fullscreenArea">
            <div className = "mainContent">
                <AiOutlineUser fontSize = "6em"/><br/>
                <input
                    className = "inputFormat" 
                    type = "e-mail" 
                    placeholder = "E-mail"
                    onChange = {(event) =>{
                        setLoginEmail(event.target.value);
                    }}
                    /><br/>
                <input
                    className = "inputFormat"
                    type = "password"
                    placeholder = "Senha"
                    onChange = {(event) =>{
                        setLoginPassword(event.target.value);
                    }}
                    /><br/>
                <button onClick = {loginUser} className = "buttonFormat" type = "submit">Login</button>
                <Link to = "/register">Crie seu usuário</Link>
            </div>
        </div>
    );
}   