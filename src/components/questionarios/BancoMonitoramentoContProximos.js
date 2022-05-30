import React from "react";
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";
import { useUser } from "../../context/user";
import { useNavigate } from 'react-router-dom'
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import './Banco.css'


export const BancoMonitoramentoContProximos = (props) => {

    console.log(props);

    const navigate = useNavigate();

    const context = useInterviewed();
    const contextUser = useUser();

    const [showContato, setShowContato] = useState(true);
    const [seExpirado, setSeExpirado] = useState(false);
    const [situacao, setSituacao] = useState("Expirado");
    const [tentativas, setTentativas] = useState(0);
    const [proximaEntrevista, setProximaEntrevista] = useState(0);
    const [monitorarAte, setMonitorarAte] = useState(0);

    const [nome, setNome] = useState("");


    useEffect(() => {
        if (props.contatoProximo.objetoDados.nome == "contador"){
            setShowContato(false);
        }
        else{
            if (props.contatoProximo.objetoDados.situacao != "andamento"){
                setShowContato(false);
                setSituacao(props.contatoProximo.objetoDados.situacao);
            }
            setTentativas(props.contatoProximo.objetoDados.contTentativas);
            setNome(props.contatoProximo.objetoDados.nome);
            setProximaEntrevista(props.contatoProximo.objetoDados.proximaEntrevista);
        }
        setMonitorarAte((props.contatoProximo.objetoDados.dataUltimoContato).toFixed(0));
        setProximaEntrevista(props.contatoProximo.objetoDados.dataProximaEntrevista);
    }, []);

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        context.addTryIn("ContatosProximos", props.contatoProximo.objetoDados.idUnico);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    const startQuest = () => {
        navigate(`../../roteiroQuestionarioContatosProximos/${props.contatoProximo.objetoDados.idUnico}`);
    }

    return(
        <div className="chatListItem">
            {showContato &&
                <div className="chatListItem-lines">
                    <div className="chatListItem-line">
                        <div className="chatListItem-nomePaciente">{props.contatoProximo.objetoDados.nome}</div>
                        
                        <div className="chatListItem-telefonePaciente">{props.contatoProximo.objetoDados.telefone1}</div>
                        
                        <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{monitorarAte}</SimpleDateTime></div>
            
                        <div className="chatListItem-situacao"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{proximaEntrevista}</SimpleDateTime></div>
                        
                        {seExpirado &&
                            <button onClick = {startQuest} className="chatListItem-btn">ENTREVISTAR EXPIRADO</button>
                        }
                        {!seExpirado &&
                            <button onClick = {startQuest}className="chatListItem-btn">ENTREVISTAR</button>
                        }
                            
                        <button onClick = {addTry}className="chatListItem-btn">CONTATO SEM SUCESSO [{tentativas}]</button>
                </div>
            </div>
            }
        </div>
    );
}