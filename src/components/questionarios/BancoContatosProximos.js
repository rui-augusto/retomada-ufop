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


    const dtMonitorarAte = props.contatoProximo.objetoDados.dataUltimoContato + 864000;

    useEffect(() => {
        // if (props.contatoProximo.objetoDados.situacao != "naoContato"){
        //     setShowContato(false);
        //     setSituacao(props.contatoProximo.objetoDados.situacao);
        // }
        console.log(props);
        if (props.contatoProximo.objetoDados.situacao == "expirado"){
            setSeExpirado(true);
        }

        setSituacao(props.contatoProximo.objetoDados.situacao);

        // setTentativas(props.confirmado.objetoDados.contTentativas);

    }, []);

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryIn("ContatosProximos", props.confirmado.objetoDados.cpf);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    return(
        <div className="chatListItem">
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-nomePaciente">{props.contatoProximo.objetoDados.nome}</div>
                    
                    <div className="chatListItem-telefonePaciente">999999999</div>
                    
                    <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{0}</SimpleDateTime></div>
                    
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
        </div>
    );
}