import React from 'react';
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";
import { useNavigate } from 'react-router-dom'


import './Banco.css'


export const BancoConfirmados = (props) => {
    
    const contextInterviewed = useInterviewed();

    const navigate = useNavigate();


    console.log(props);
    const dataISintomas = new Date(props.confirmado.objetoDados.dataInicioSintomas).setHours(240,0,0);
    const dataMonitorarAte =  new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(dataISintomas);
    console.log("INICIO SINTOMAS TIMESTAMP + 10" ,dataISintomas);
    console.log("inicio sintomas + 10 date", dataMonitorarAte);
    // , hour: '2-digit', minute: '2-digit', second: '2-digit'
    

    const [seExpirado, setSeExpirado] = useState(false);
    const [situacao, setSituacao] = useState("Expirado");
    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        if (props.confirmado.objetoDados.situacao == "expirado"){
            setSeExpirado(true);
        }
        else if (props.confirmado.objetoDados.situacao == "naoContato"){
            setSituacao("Não Contato");
        }
        else if (props.confirmado.objetoDados.situacao == "expiradoInterno"){
            setSituacao("Expirado Interno");
        }

        setTentativas(props.confirmado.objetoDados.contTentativas);

    }, []);

    const startQuest = () => {
        navigate("../../questionario");
    }

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryConfirmado(props.confirmado.objetoDados.cpf);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    return(

        <div className="chatListItem">
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-nomePaciente">{props.confirmado.objetoDados.nome}</div> &nbsp;
                    
                    <div className="chatListItem-telefonePaciente">999999999</div> &nbsp;
                    
                    <div className="chatListItem-monitorarAte">{dataMonitorarAte}</div>
                    
                    <div className="chatListItem-situacao">{situacao}</div>
                    
                    {seExpirado &&
                        <button className="chatListItem-btn">ENTREVISTAR EXPIRADO</button>
                    }
                    {!seExpirado &&
                        <button onClick = {startQuest}className="chatListItem-btn">ENTREVISTAR</button>
                    }
                    
                    <button onClick = {addTry}className="chatListItem-btn">CONTATO SEM SUCESSO [{tentativas}]</button>
                </div>
            </div>
        </div>
    );
}