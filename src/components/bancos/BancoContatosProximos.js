import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from "../../context/user";
import { useInterviewed } from "../../context/interviewed";
import SimpleDateTime  from 'react-simple-timestamp-to-date';

import '../style/Bancos.css'

export const BancoContatosProximos = (props) => {

    const navigate = useNavigate();

    const contextInterviewed = useInterviewed();
    const contextUser = useUser();

    const [showContato, setShowContato] = useState(true);
    const [seExpirado, setSeExpirado] = useState(false);
    const [situacao, setSituacao] = useState("naoContato");
    const [tentativas, setTentativas] = useState(0);
    const monitorarAte = (props.contatoProximo.objetoDados.dataUltimoContato + 1209600).toFixed(0) ;


    const [nome, setNome] = useState("");

    // const dtMonitorarAte = props.contatoProximo.objetoDados.dataUltimoContato;

    useEffect(() => {
        if (props.contatoProximo.objetoDados.nome == "contador"){
            setShowContato(false);
        }
        else{
            if (props.contatoProximo.objetoDados.situacao != "naoContato" && props.contatoProximo.objetoDados.situacao != "expirado"){
                setShowContato(false);
                if (props.contatoProximo.objetoDados.situacao != "expirado"){
                    setSituacao("Expirado");
                } else if (props.contatoProximo.objetoDados.situacao != "naoContato"){
                    setSituacao("Não Contato");
                }
            }

            setTentativas(props.contatoProximo.objetoDados.contTentativas);
            setNome(props.contatoProximo.objetoDados.nome);
        }
        

    }, []);

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryIn("ContatosProximos", props.contatoProximo.objetoDados.idUnico);
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
                        <div className="chatListItem-nomePaciente">{nome}</div>
                        
                        <div className="chatListItem-telefonePaciente">{props.contatoProximo.objetoDados.telefone1}</div>
                        
                        <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{monitorarAte}</SimpleDateTime></div>
                        
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
            }
        </div>
    );
}