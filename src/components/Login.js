import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./style.css"
import { AiOutlineUser } from 'react-icons/ai';
import { useUser } from '../contexts/user'


export const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const context = useUser();

    async function LoginUser(){
        context.loginUser(loginEmail, loginPassword)
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
                <button onClick = {LoginUser} className = "buttonFormat" type = "submit">Login</button>
                <Link to = "/register">Crie seu usuário</Link>
            </div>
        </div>
    );
}