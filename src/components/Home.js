import { useUser } from "../context/user";
import { useInterviewed } from "../context/interviewed";
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'


import { BancoConfirmados } from "./questionarios/BancoConfirmados";
import { BancoContatosProximos } from "./questionarios/BancoContatosProximos"

import "./style/Home.css"


export const Home = () => {

    // getRefFromDataBase()

    const navigate = useNavigate();


    // const [lstConfirmados, setLstConfirmados] = useState([]);
    // const [lstContProximos, setLstContProximos] = useState([]);

    const contextUser = useUser();
    const contextInterviewed = useInterviewed();

    // const [listaConfirmados, setListaConfirmados] = useState([]);
    // const [chatlist, setChatList] = useState([]);


    useEffect(async () => {
        // setObjConfirmados(await contextInterviewed.getRefFromDataBase("Confirmados"));
        // setObjContProximos(await contextInterviewed.getRefFromDataBase("ContatosProximos"));
        // console.log("obj: ", objConfirmadoAs);
        await contextInterviewed.getInfoFromDatabase();
        // setLstConfirmados(Object.values(contextInterviewed.objConfirmados));
        // setLstContProximos(Object.values(contextInterviewed.objContProximos));
        await contextUser.getUserInfo(localStorage.getItem("id"));
    }, []);

    // const funcaoAux = async () => {
    //     // console.log(contextInterviewed.getRefFromDataBase());
    //     setObjConfirmados(await contextInterviewed.getRefFromDataBase("Confirmados"));
    //     setObjContProximos(await contextInterviewed.getRefFromDataBase("ContatosProximos"));

    //     setLstConfirmados(Object.values(objConfirmados));
    //     setLstContProximos(Object.values(objContProximos));
    //     console.log("2 :", lstConfirmados);
    // }
    
    // const funcaoAux2 = () => {
    //     setLstConfirmados(Object.values(objConfirmados));
    //     setLstContProximos(Object.values(objContProximos));
    //     console.log("2 :", lstConfirmados);
    // }


    const logout = async () => {
        await contextUser.userLogout(navigate);
    }

    const updateData = async () => {
        await contextInterviewed.getInfoFromDatabase();
        // setLstConfirmados(Object.values(contextInterviewed.objConfirmados));
        // setLstContProximos(Object.values(contextInterviewed.objContProximos));
    }

    return (
        
        <div className='fullscreenAreaHome'>
            <div className="AreaPesquisa">
            
                <div className="titulo"><h2>Bem-vindo(a), {contextUser.user.name}.</h2><button onClick = {logout}>Sair</button></div>
                
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
                    <div className="divisaolinhas">Total de {contextInterviewed.lstConfirmados.length} pessoas visíveis no banco</div> 

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
                    <div className="divisaolinhas">Total de {contextInterviewed.lstContProximos.length - 1} pessoas visíveis no banco</div> 
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
                    <div className="divisaolinhas">Total de ---- pessoas visíveis no banco</div> 
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
                    {/* {chatlist.map((item, key)=>(
                        <BancoMonitoramentoConfirmados
                            key={key}
                        />
                    ))} */}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de ---- pessoas visíveis no banco</div> 
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
                    {/* {chatlist.map((item, key)=>(
                        <BancoMonitoramentoCProximo
                            key={key}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
}