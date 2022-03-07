import React from "react";
import './Banco.css'


export const BancoContatosProximos = (props) => {
    console.log(props);
    return(
        <div className="chatListItem">
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-nomePaciente">{props.contatoProximo.objetoDados.nome}</div>
                    
                    <div className="chatListItem-telefonePaciente">999999999</div>
                    
                    <div className="chatListItem-monitorarAte">28/03/2022</div>
                    
                    <div className="chatListItem-situacao">EXPIRADO</div>
                    
                    <button className="chatListItem-btn">EXPIRADO</button>
                    
                    <button className="chatListItem-btn">ENTREVISTAR</button>
                    
                    <button className="chatListItem-btn">CONTATO SEM SUCESSO</button>
                </div>
            </div>
        </div>
    );
}