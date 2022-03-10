import React from 'react';
import { useState, useEffect } from 'react';
import './Banco.css'


export const BancoMonitoramentoConfirmados =  (props) => {

    const [showConfirmado, setShowConfirmado] = useState(false);
    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        if (props.confirmado.objetoDados.situacao == "andamento"){
            setShowConfirmado(true);
        }

        setTentativas(props.confirmado.objetoDados.contTentativas);
    }, []);

    return(
        <div className="chatListItem">
            {showConfirmado &&
                <div className="chatListItem-lines">
                    <div className="chatListItem-line">
                        <div className="chatListItem-nomePaciente">{props.confirmado.objetoDados.nome}</div> 
                        
                        <div className="chatListItem-telefonePaciente">999999999</div>
                        
                        <div className="chatListItem-monitorarAte">28/03</div>
                        
                        <div className="chatListItem-situacao"></div>
                        
                    </div>
                </div>
            }
        </div>
    );
}