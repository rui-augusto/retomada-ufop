import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import "./style.css"

import { useUser } from '../contexts/user'


export const Register = () => {
    
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [samePassword, setSamePassword] = useState(false)

    useEffect(() => {
        comparePasswords();
    }, [password, rePassword])

    const comparePasswords = () => {
        if (rePassword != password){
            console.log("Senhas diferentes");
        }
        else{
            setSamePassword(true);
        }        
    } 
    return (
        <div className = "fullscreenArea">
            <div className = "mainContent">
                <input 
                    className = "inputFormat" 
                    type = "text" 
                    placeholder = "Nome"
                    /><br/>
                <input 
                    className = "inputFormat" 
                    type = "text" 
                    placeholder = "E-mail"
                    /><br/>
                <input 
                    className = "inputFormat" 
                    type = "password" 
                    placeholder = "Senha"
                    onChange = {(event) => {
                        setPassword(event.target.value);
                    }}
                    /><br/>
                <input
                    className = "inputFormat"
                    type = "password"
                    placeholder = "Confirme sua senha"
                    onChange = {(event) => {
                        setRePassword(event.target.value);
                    }}
                    /><br/>
                <select className = "inputFormat">
                    <option selected value = "entrevistador">Entrevistador</option>
                    <option value="analise">Equipe de Análise</option>
                    <option value="coordenacao">Coordenação</option>
                </select><br/>
                <button className = "buttonFormat" type = "submit">Registrar</button>
                <Link to = '/'>Já tenho conta</Link>
            </div>
        </div>
    );
}