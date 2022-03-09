import React from 'react';
import { useState, useEffect } from 'react';

import { useInterviewed } from "../../context/interviewed";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import './Banco.css'


export const BancoContatosProximos = (props) => {

    const contextInterviewed = useInterviewed();
    const [showContato, setShowContato] = useState(true);
    const [seExpirado, setSeExpirado] = useState(false);
    const [situacao, setSituacao] = useState("naoContato");
    const [tentativas, setTentativas] = useState(0);
    const [monitorarAte, setMonitorarAte] = useState(0);


    const [nome, setNome] = useState("");

    // const dtMonitorarAte = props.contatoProximo.objetoDados.dataUltimoContato;

    useEffect(() => {
        if (props.contatoProximo.objetoDados.nome == "contador"){
            setShowContato(false);
        }
        else{
            if (props.contatoProximo.objetoDados.situacao != "aberto"){
                setShowContato(false);
                setSituacao(props.contatoProximo.objetoDados.situacao);
            }
            setTentativas(props.contatoProximo.objetoDados.contTentativas);
            setNome(props.contatoProximo.objetoDados.nome);
            setMonitorarAte(props.contatoProximo.objetoDados.dataUltimoContato + 864000)
        }

    }, []);

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryIn("ContatosProximos", props.contatoProximo.objetoDados.idUnico);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    return(
        <div className="chatListItem">
            {showContato &&
                <div className="chatListItem-lines">
                    <div className="chatListItem-line">
                        <div className="chatListItem-nomePaciente">{nome}</div>
                        
                        <div className="chatListItem-telefonePaciente">999999999</div>
                        
                        <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{monitorarAte}</SimpleDateTime></div>
                        
                        <div className="chatListItem-situacao">{situacao}</div>
                        
                        {seExpirado &&
                                <button className="chatListItem-btn">ENTREVISTAR EXPIRADO</button>
                            }
                            {!seExpirado &&
                                <button className="chatListItem-btn">ENTREVISTAR</button>
                            }
                            
                            <button onClick = {addTry}className="chatListItem-btn">CONTATO SEM SUCESSO [{tentativas}]</button>
                    </div>
                </div>
            }
        </div>
    );
}