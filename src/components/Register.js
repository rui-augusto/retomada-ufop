import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import "./style.css"
/*firebase import */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database} from '../firebase-config'
import { ref, set } from "firebase/database";


export const Register = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [samePassword, setSamePassword] = useState(false)
    const [role, setRole] = useState("entrevistador"); /* começa com o valor da primeira option*/

    // useEffect(() => {
    //     comparePasswords();
    // }, [password, rePassword])


    async function registerUser(name, email, password, role){
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password);

            set(ref(database, 'users/' + user.user.uid), {
                name: name,
                email: email,
                role: role 
            });
            console.log(user.user.uid);
        } catch{
            console.log("As senhas estão diferentes");
        }
    }

    const handleRegisterInput = () => {
        if (rePassword == password){
            registerUser(name, email, password, role);
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
                <button onClick = {handleRegisterInput} className = "buttonFormat">Registrar</button>
                <Link to = '/'>Já tenho conta</Link>
            </div>
        </div>
    );
}