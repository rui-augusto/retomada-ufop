import { useState } from 'react';
import { useUser } from "../context/user";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import "./style.css"


export const Register = () => {

    const context = useUser();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [role, setRole] = useState("entrevistador"); /* começa com o valor da primeira option*/

    const registerUser = () => {
        if (rePassword == password){
            context.registerUser(name, email, password, role, navigate);
        }
        else{
            alert("Senhas diferentes");
        }
    }

    return (
        <div className = "fullscreenArea">
            <div className = "mainContent">
                <input 
                    className = "inputFormat" 
                    type = "text" 
                    placeholder = "Nome"
                    onChange = {(event) => {
                        setName(event.target.value);
                    }}
                    /><br/>
                <input 
                    className = "inputFormat" 
                    type = "text" 
                    placeholder = "E-mail"
                    onChange = {(event) => {
                        setEmail(event.target.value);
                    }}
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

                <select value = {role} onChange = {(event) => {
                    setRole(event.target.value);
                    }}
                    className = "inputFormat">
                    <option defaultValue = "entrevistador">Entrevistador</option>
                    <option value = "analista">Equipe de Análise</option>
                    <option value = "coordenacao">Coordenação</option>
                </select><br/>

                <button onClick = {registerUser} className = "buttonFormat">Registrar</button>
                <Link to = '/'>Já tenho conta</Link>
            </div>
        </div>
    );
}