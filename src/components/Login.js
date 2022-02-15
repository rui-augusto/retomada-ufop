import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai';
import "./style.css"
/*firebase import */
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config'

export const Login = () => {
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    async function loginUser(email, password){
        try {
            const user = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            navigate(`/home`)
          } catch (error) {
            console.log(error.message);
          }
    }

    const handleInput = () => {
        loginUser(loginEmail, loginPassword);
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
                <button onClick = {handleInput} className = "buttonFormat" type = "submit">Login</button>
                <Link to = "/register">Crie seu usuário</Link>
            </div>
        </div>
    );
}   