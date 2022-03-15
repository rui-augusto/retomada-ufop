import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useUser } from "../context/user";

import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import "./style/Login.css";

export const Login = () => {
    const navigate = useNavigate();

    const context = useUser();
    // const { userId } = useUser();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    async function loginUser(){
        await context.loginUser(loginEmail, loginPassword, navigate);
    }

    return (
        <div className="fullscreenArea">
           
            <div className="mainLoginContent">
                <img className="imgUFOP" src="https://neccint.files.wordpress.com/2011/08/ufop-logo.jpg" alt="logoUFOP"></img>
                <div className='content'>
                    <div className='lineone'>
                        <div className='email'>
                            <AiOutlineUser fontSize="medium" style={{ color: '919191' }} /><br />
                            <input
                                className="inputLoginFormat"
                                type="e-mail"
                                required
                                placeholder="E-mail"
                                onChange={(event) => {
                                    setLoginEmail(event.target.value);
                                } } /><br />
                        </div>
                    </div>

                    <div className='linetwo'>
                        <div className='password'>
                            <AiOutlineLock fontSize="medium" style={{ color: '919191' }} /><br />
                            <input
                                className="inputLoginFormat"
                                type="password"
                                required
                                placeholder="Senha"
                                onChange={(event) => {
                                    setLoginPassword(event.target.value);
                                } } /><br />
                        </div>

                    </div>
                    <button onClick={loginUser} className="buttonLoginFormat" type="submit">Entrar</button>

                    <div className='link'>
                        Não possui conta?&nbsp; <a href = "#"><Link to="/register">Crie seu usuário</Link></a>
                    </div>

                </div>
            </div>
        </div>
    );
}   