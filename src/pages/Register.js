import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from "../context/user";

import "../components/style/Register.css"


export const Register = () => {

    const context = useUser();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [role, setRole] = useState("entrevistador"); /* começa com o valor da primeira option*/

    const registerUser = () => {
        if (rePassword === password){
            context.registerUser(name, email, password, role, navigate);
        }
        else{
            alert("Senhas diferentes");
        }
    }

    return (
        <div className = "fullscreenRegisterArea">
            <div className="mainRegisterContent">
                {/* fullscreenArea */}
                <div className='conteint-register'>
                    {/* mainContent */}
                    <div className='line'>
                        <div className='input-register'>
                            <input
                                type="text"
                                placeholder="Nome"
                                onChange={(event) => {
                                    setName(event.target.value);
                                } } /><br />
                        </div>
                    </div>

                    <div className='line'>
                        <div className='input-register'>
                            <input
                                type="email"
                                placeholder="E-mail"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                } } /><br />
                        </div>
                    </div>

                    <div className='line'>
                        <div className='input-register'>
                            <input
                                type="password"
                                placeholder="Senha"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                } } /><br />
                        </div>
                    </div>

                    <div className='line'>
                        <div className='input-register'>
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                onChange={(event) => {
                                    setRePassword(event.target.value);
                                } } /><br />
                        </div>
                    </div>

                    <div className='line'>
                        <div className='input-register'>
                            <select value={role} onChange={(event) => {
                                setRole(event.target.value);
                            } }>
                                <option defaultValue="entrevistador">Entrevistador</option>
                                <option value="analista">Equipe de Análise</option>
                                <option value="coordenacao">Coordenação</option>
                            </select><br />
                        </div>
                    </div>

                </div>
                <button onClick={registerUser} className="buttonFormat-register">Registrar</button>
                <a className='linkregister'><Link to='/'>Já tenho conta</Link></a>
            </div>
        </div>
    );
}