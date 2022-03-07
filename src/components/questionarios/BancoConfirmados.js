import React from 'react';
import { useState } from 'react';
import { useInterviewed } from "../../context/interviewed";

import './Banco.css'


export const BancoConfirmados = (props) => {
    
    const contextInterviewed = useInterviewed();

    console.log(props);

    const [seExpirado, setSeExpirado] = useState(false);

    if (props.confirmado.objetoDados.situacao == "expirado"){
        setSeExpirado(true);
    }
    else if (props.confirmado.objetoDados.situacao == "em aberto"){
        console.log("em aberto");
    }

    const addTry = () => {
        // console.log(props.confirmado.objetoDados.cpf);
        contextInterviewed.addTryConfirmado(props.confirmado.objetoDados.cpf);
        // console.log(props.confirmado.objetoDados.);
    }

    return(

        <div className="chatListItem">
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-nomePaciente">{props.confirmado.objetoDados.nome}</div> &nbsp;
                    
                    <div className="chatListItem-telefonePaciente">999999999</div> &nbsp;
                    
                    <div className="chatListItem-monitorarAte">Data Fictícia</div>
                    
                    <div className="chatListItem-situacao">{props.confirmado.objetoDados.situacao}</div>
                    
                    {seExpirado &&
                        <button className="chatListItem-btn">ENTREVISTAR EXPIRADO</button>
                    }
                    
                    <button className="chatListItem-btn">ENTREVISTAR</button>
                    
                    <button onClick = {addTry}className="chatListItem-btn">CONTATO SEM SUCESSO</button>
                </div>
            </div>
        </div>
    );
}