import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import "./style.css"
/*firebase import */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'

export const Register = () => {
    
    const [email, setEmail] = useState("");

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

    async function registerUser(email, password){
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password);
        } catch (error){
            console.log(error.message);
        }
    }

    const handleRegisterInput = () => {
        registerUser(email, password);
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
                <select className = "inputFormat">
                    <option defaultValue = "entrevistador">Entrevistador</option>
                    <option value="analise">Equipe de Análise</option>
                    <option value="coordenacao">Coordenação</option>
                </select><br/>
                <button onClick = {handleRegisterInput} className = "buttonFormat">Registrar</button>
                <Link to = '/'>Já tenho conta</Link>
            </div>
        </div>
    );
}