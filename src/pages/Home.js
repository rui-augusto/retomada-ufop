import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from "../context/user";
import { useInterviewed } from "../context/interviewed";

import { BancoConfirmados } from "../components/bancos/BancoConfirmados";
import { BancoContatosProximos } from "../components/bancos/BancoContatosProximos"
import { BancoMonitoramentoConfirmados } from "../components/bancos/BancoMonitoramentoConfirmados";
import { BancoMonitoramentoContProximos } from "../components/bancos/BancoMonitoramentoContProximos";

import "../components/style/pages/Home.css"
import "../components/style/Bancos.css";

export const Home = () => {

    const navigate = useNavigate();
    const contextUser = useUser();
    const contextInterviewed = useInterviewed();

    // * search filter states

    const [search, setSearch] = useState(""); // used for searching filter
    const [searchesMatched, setSearchesMatched] = useState([]);
    const [showFilteredCases, setShowFilteredCases] = useState(false);

    // * input filter states
    const [input, setInput] = useState("");


    // ? CAN I CREATE A NEW STATE FOR REFACTOR THE FILTER SEARCHING FOR WORKKING IN ALL DATABASES ?

    // const [newSearch, setNewSearch] = useState({name: "", listName: "" }); // * OBJECT LIST THAT CONTAINS:
    //                                                                           * A name THAT REPRESENTS THE STRING THAT WILL BE SEARCHED
    //                                                                           * A listName THAT // WHICH DATABASE WILL BE USED                                                 

    const [newSearch, setNewSearch] = useState({
        casosConfirmados: "",
        contProximos: "",
        monitorandoCasosConfirmados: "",
        monitorandoContProximos: ""
    })

    const [newSearchesMatched, setNewSearchesMatched] = useState({
        casosConfirmados: [],
        contProximos: [],
        monitorandoCasosConfirmados: [],
        monitorandoContProximos: []
    })

    // ? END OF DEFINITIONS

    useEffect(async () => {
        await contextInterviewed.getInfoFromDatabase();
        await contextUser.getUserInfo(localStorage.getItem("id"));
    }, []);

    // * should control searching cases input
    useEffect(() => {
        searchFilterCases();
    }, [search])

    const logout = async () => {
        await contextUser.userLogout(navigate);
    }

    const updateData = async () => {
        await contextInterviewed.getInfoFromDatabase();
        window.location.reload(false);
    }

    const getListOfCases = (listName, inProgress = false) => {
        var visibleCases = [];
        // * inProgress is a flag
        // * if false, return all occurrences of 'naoContato' situation
        // * if true, return only 'andamento' occurrences
        if (!inProgress){
            visibleCases = contextInterviewed[listName].filter(
                // ? verify if 'expirado' and must show
                confirmed => confirmed.objetoDados.situacao === "naoContato"
            );
        } else{
            visibleCases = contextInterviewed[listName].filter(
                confirmed => confirmed.objetoDados.situacao === "andamento"
            );
        }
        return visibleCases
    }

    // * TRYING TO REFACTOR THE 'searchFilterCases' FUNCTION
    // * THE NEW FUNCTION SHOULD BE USEFUL FOR ALL DATABASES

    // const searchFilterCases = (searchString, lstName) => {
    //     switch(lstName){
    //         case "lstConfirmados":
    //             break;
    //         case "lstMonitorandoConfirmados":
    //             break;
    //         case "lstContProximos":
    //             break;
    //         case "lstMonitorandoContProximos":
    //     }
    // }

    // only works with 'naoContato' confirmed cases 
    const searchFilterCases = () => {
        if (search){
            setSearchesMatched(contextInterviewed.lstConfirmados.filter(
                confirmed => confirmed.objetoDados.nome.startsWith(search)
            ))
            // * PUSH MATCH CASES INTO searchesMatched
            setShowFilteredCases(true);
        } else {
            // * setting initial default values 
            setShowFilteredCases(false);
            setSearchesMatched([]);
        }
    }

    const inputFilterConfirmedCases = () => {

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
                    <div className="divisaolinhas">Total de {getListOfCases("lstConfirmados").length} pessoas visíveis no banco</div> 

                    <div className="divisaolinhas">
                    {/* 
                        // TODO: IN EVERY SEARCH INPUT, IT MUST SET:
                        // TODO: setNewSearch((event) => {
                        // TODO:    {name: event.target.value, listName: ''});
                        // TODO:}
                    */}
                        <input onChange = {(event) => {
                            setSearch(event.target.value);
                        }} placeholder="Procurar por paciente" type="search" />
                    </div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    {!showFilteredCases &&
                        contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                    {showFilteredCases && 
                        searchesMatched?.map((item, key) => (
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
                    <div className="divisaolinhas">Total de {getListOfCases("lstContProximos").length} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas">
                        <input placeholder="Procurar por paciente" type="search"></input>
                    </div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    { 
                    contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoContatosProximos
                            contatoProximo={item} 
                            key={key}
                        />
                    ))}
                    {/* {showClosedContactsFilteredCases && 
                        closedContactsSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))} */}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Confirmados</h3></div>
                    <div className="divisaolinhas">Total de {getListOfCases("lstConfirmados", true).length} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas">
                        <input placeholder="Procurar por paciente" type="search" />
                    </div>
                    {/* onChange = {(event) => {setSearch(event.target.value)}} */}
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoProxEntrevista">Próxima entrevista em</div>
                    <div className="infoSituacaoEntrevista">Situação Entrevistas</div>
                </div>
                <div className="chatNomes">
                    { 
                    contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoMonitoramentoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                    {/* {showMonitoringConfirmedFilteredCases && 
                        monitoringConfirmedSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))} */}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de {getListOfCases("lstContProximos", true).length} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas">
                        <input placeholder="Procurar por paciente" type="search"></input>
                    </div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoProxEntrevista">Próxima entrevista em</div>
                    <div className="infoSituacaoEntrevista">Situação Entrevistas</div>
                </div>
                <div className="chatNomes">
                    { 
                    contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoMonitoramentoContProximos
                            contatoProximo={item}
                            key={key}
                        />
                    ))}
                    {/* {showMonitoringClosedContactsFilteredCases && 
                        monitoringClosedContactsSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
}