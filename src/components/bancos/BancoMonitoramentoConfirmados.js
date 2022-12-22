import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useInterviewed } from '../../context/interviewed';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

import '../style/Banco.css'

export const BancoMonitoramentoConfirmados =  (props) => {

    const navigate = useNavigate();
    const contextInterviewed = useInterviewed();

    const [showConfirmado, setShowConfirmado] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    const [seExpirado, setSeExpirado] = useState(false);
    const [proximaEntrevista, setProximaEntrevista] = useState(0);

    const dtMonitorarAte = (props.confirmado.objetoDados.dataInicioSintomas + 864000);
    useEffect(() => {
        if (props.confirmado.objetoDados.situacao == "andamento"){
            setShowConfirmado(true);
        }
        setProximaEntrevista(props.confirmado.objetoDados.dataProximaEntrevista);
        setTentativas(props.confirmado.objetoDados.contTentativas);
    }, []);

    const startQuest = () => {
        navigate(`../../roteiroQuestionarioMonitoramentoConfirmados/${props.confirmado.objetoDados.cpf}`);
    }

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryIn("Confirmados", props.confirmado.objetoDados.cpf);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    return(
        <div className="chatListItem">
            {showConfirmado &&
                <div className="chatListItem-lines">
                    <div className="chatListItem-line">
                        <div className="chatListItem-nomePaciente">{props.confirmado.objetoDados.nome}</div> 
                        
                        <div className="chatListItem-telefonePaciente">{props.confirmado.objetoDados.telefone}</div>
                        
                        <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{dtMonitorarAte}</SimpleDateTime></div>
                        
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