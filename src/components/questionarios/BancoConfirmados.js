import React from 'react';
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";
import { useNavigate } from 'react-router-dom'
import SimpleDateTime  from 'react-simple-timestamp-to-date';


import './Banco.css'


export const BancoConfirmados = (props) => {
    
    const navigate = useNavigate();
    
    const contextInterviewed = useInterviewed();

    const dtMonitorarAte = props.confirmado.objetoDados.dataInicioSintomas + 864000;
    // const dataMonitorarAte =  new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(dataISintomas);
    // new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(dataISintomas);
    // console.log("INICIO SINTOMAS TIMESTAMP + 10" ,dataISintomas);
    // console.log("inicio sintomas + 10 date", dataMonitorarAte);
    // , hour: '2-digit', minute: '2-digit', second: '2-digit'
    

    const [showConfirmado, setShowConfirmado] = useState(false);
    const [seExpirado, setSeExpirado] = useState(false);
    const [situacao, setSituacao] = useState("Expirado");
    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        if (props.confirmado.objetoDados.situacao == "expirado"){
            setShowConfirmado(true);
            setSeExpirado(true);
        }
        else if (props.confirmado.objetoDados.situacao == "naoContato"){
            setSituacao("Não Contato");
            setShowConfirmado(true);
        }
        else if (props.confirmado.objetoDados.situacao == "expiradoInterno"){
            setSituacao("Expirado Interno");
            setShowConfirmado(true);
        }

        setTentativas(props.confirmado.objetoDados.contTentativas);

    }, []);

    const startQuest = () => {
        navigate("../../questionario");
    }

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryIn("Confirmados", props.confirmado.objetoDados.cpf);
        setTentativas(tentativas+1);
        // console.log(props.confirmado.objetoDados.);
    }

    return(

        <div>
            {showConfirmado &&
            <div className="chatListItem">

                <div className="chatListItem-lines">
                    <div className="chatListItem-line">
                        <div className="chatListItem-nomePaciente">{props.confirmado.objetoDados.nome}</div> &nbsp;
                        
                        <div className="chatListItem-telefonePaciente">999999999</div> &nbsp;
                        
                        <div className="chatListItem-monitorarAte"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime = "0">{dtMonitorarAte}</SimpleDateTime></div>
                        
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
            }
        </div>
    );
}