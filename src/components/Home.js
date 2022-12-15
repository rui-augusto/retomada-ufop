import { useUser } from "../context/user";
import { useInterviewed } from "../context/interviewed";
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { BancoConfirmados } from "./questionarios/BancoConfirmados";
import { BancoContatosProximos } from "./questionarios/BancoContatosProximos"
import { BancoMonitoramentoConfirmados } from "./questionarios/BancoMonitoramentoConfirmados";
import { BancoMonitoramentoContProximos } from "./questionarios/BancoMonitoramentoContProximos";

import "./style/Home.css"
import "./questionarios/Banco.css";

export const Home = () => {

    const navigate = useNavigate();
    const contextUser = useUser();
    const contextInterviewed = useInterviewed();

    useEffect(async () => {
        await contextInterviewed.getInfoFromDatabase();
        await contextUser.getUserInfo(localStorage.getItem("id"));
    }, []);

    const logout = async () => {
        await contextUser.userLogout(navigate);
    }

    const updateData = async () => {
        await contextInterviewed.getInfoFromDatabase();
        window.location.reload(false);
    }

    const getNumberOfCases= (listName, inProgress = false) => {
        var visibleCases = [];
        // * inProgress is a flag
        // * if false, return all occurrences of 'naoContato' situation
        // * if true, return only 'andamento' occurrences
        if (!inProgress){
            visibleCases = contextInterviewed[listName].filter(
                confirmed => confirmed.objetoDados.situacao === "naoContato"
            );
        } else{
            visibleCases = contextInterviewed[listName].filter(
                confirmed => confirmed.objetoDados.situacao === "andamento"
            );
        }
        return visibleCases.length;

    }

    return (
        
        <div className='fullscreenAreaHome'>
            <div className="AreaPesquisa">
            
                <div className="titulo">
                    <h2>Bem-vindo(a), {contextUser.user.name}.</h2>
                    <button className = "buttonsHome" onClick = {logout}>Sair</button>
                    <button className = "buttonsHome" onClick = {updateData}>Atualizar</button>
                </div>
                
                <div className="titulo"> 
                    <select>
                        <option value="" disabled selected hidden >Filtro</option>
                        <option value="antigo">Mais Antigo</option>
                        <option value="novo">Mais Novos</option>
                        <option value="vencimentoPróximo">Vencimento Próximo</option>
                    </select>
                </div>

            </div> 

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Banco de Confirmados</h3></div>
                    <div className="divisaolinhas">Total de {getNumberOfCases("lstConfirmados")} pessoas visíveis no banco</div> 

                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    {contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>
                    
                    
            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Banco de Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de {getNumberOfCases("lstContProximos")} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    {contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoContatosProximos
                            contatoProximo={item} 
                            key={key}
                        />
                    ))}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Confirmados</h3></div>
                    <div className="divisaolinhas">Total de {getNumberOfCases("lstConfirmados", true)} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoProxEntrevista">Próxima entrevista em</div>
                    <div className="infoSituacaoEntrevista">Situação Entrevistas</div>
                </div>
                <div className="chatNomes">
                    {contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoMonitoramentoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de {getNumberOfCases("lstContProximos", true)} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoProxEntrevista">Próxima entrevista em</div>
                    <div className="infoSituacaoEntrevista">Situação Entrevistas</div>
                </div>
                <div className="chatNomes">
                    {contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoMonitoramentoContProximos
                            contatoProximo={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}