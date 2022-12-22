import { useUser } from "../context/user";
import { useInterviewed } from "../context/interviewed";
import React, { useEffect, useState } from 'react';
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

    // * search filter states

    const [search, setSearch] = useState(""); // used for searching filter
    const [searchesMatched, setSearchesMatched] = useState([]);
    const [showFilteredCases, setShowFilteredCases] = useState(false);

    /*
        * QUATRO BANCOS DIFERENTES, 
        * CADA UM POSSUI UM INPUT FILTER DIFERENTE
        * CADA VEZ QUE UM EH ALTERADO, USEEFFECT TEM QUE SER CHAMADO
        * OU. . .
        * O SEARCHSTATE PODE SER ALTERADO E UMA FUNÇAO SER CHAMADA, PASSANDO A VARIAVEL E QUAL BANCO DEVE SER ATUALIZADO
        * PARA CONTROLAR O APARECIMENTO DE CADA BANCO, DEVE HAVER UM BOOLEAN STATE PARA CADA
    */

    // * states that controll the visibility of the databases
    // * confirmed cases
    const [confirmedSearch, setConfirmedSearch] = useState("");
    const [confirmedSearchesMatched, setConfirmedSearchesMatched] = useState([]);
    const [showConfirmedFilteredCases, setShowConfirmedFilteredCases] = useState(false);
    // * monitoring confirmed cases
    const [monitoringConfirmedSearch, setMonitoringConfirmedSearch] = useState("");
    const [monitoringConfirmedSearchesMatched, setMonitoringConfirmedSearchesMatched] = useState([]);
    const [showMonitoringConfirmedFilteredCases, setShowMonitoringConfirmedFilteredCases] = useState(false);
    // * closed contacts cases
    const [closedContactsSearch, setClosedContactsContactsSearch] = useState("");
    const [closedContactsSearchesMatched, setClosedContactsSearchesMatched] = useState([]);
    const [showClosedContactsFilteredCases, setShowClosedContactsFilteredCases] = useState(false);
    // * monitoring closed contacts cases
    const [monitoringClosedContactsSearch, setMonitoringClosedContactsSearch] = useState("");
    const [monitoringClosedContactsSearchesMatched, setMonitoringClosedContactsSearchesMatched] = useState([]);
    const [showMonitoringClosedContactsFilteredCases, setShowMonitoringClosedContactsFilteredCases] = useState(false);

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
    // useEffect(() => {
    //     searchFilterConfirmedCases();
    // }, [search])

    useEffect(() => {
        searchConfirmedFilterCases();
    }, [confirmedSearch]);

    useEffect(() => {
        searchMonitoringConfirmedFilterCases();
    }, [monitoringConfirmedSearch]);
    
    useEffect(() => {
        searchClosedContactsFilterCases();
    }, [closedContactsSearch]);

    useEffect(() => {
        searchMonitoringClosedContactsFilterCases();
    }, [monitoringClosedContactsSearch]);

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
    const searchConfirmedFilterCases = () => {
        if (confirmedSearch){
            setConfirmedSearchesMatched(contextInterviewed.lstConfirmados.filter(
                confirmed => confirmed.objetoDados.nome.startsWith(confirmedSearch)
            ))
            // * PUSH MATCH CASES INTO searchesMatched
            setShowConfirmedFilteredCases(true);
        } else {
            // * setting initial default values 
            setShowConfirmedFilteredCases(false);
            setConfirmedSearchesMatched([]);
        }
    }

    const searchMonitoringConfirmedFilterCases = () => {
        console.log(monitoringConfirmedSearchesMatched)
        if (monitoringConfirmedSearch){
            setMonitoringConfirmedSearchesMatched(contextInterviewed.lstConfirmados.filter(
                confirmed => confirmed.objetoDados.nome.startsWith(monitoringConfirmedSearch)
            ))
            setShowMonitoringConfirmedFilteredCases(true);
        } else {
            setShowMonitoringConfirmedFilteredCases(false);
            setMonitoringConfirmedSearchesMatched([]);
        }
    }

    const searchClosedContactsFilterCases = () => {
        console.log(closedContactsSearchesMatched);
        if (closedContactsSearch){
            setClosedContactsSearchesMatched(contextInterviewed.lstContProximos.filter(
                closedContact => closedContact.objetoDados.nome.startsWith(closedContactsSearch)
            ))
            // * PUSH MATCH CASES INTO searchesMatched
            setShowClosedContactsFilteredCases(true);
        } else {
            // * setting initial default values 
            setShowClosedContactsFilteredCases(false);
            setClosedContactsSearchesMatched([]);
        }
    }

    const searchMonitoringClosedContactsFilterCases = () => {
        console.log(monitoringClosedContactsSearchesMatched);
        if (monitoringClosedContactsSearch){
            setMonitoringClosedContactsSearchesMatched(contextInterviewed.lstContProximos.filter(
                closedContacts => closedContacts.objetoDados.nome.startsWith(monitoringClosedContactsSearch)
            ))
            setShowMonitoringClosedContactsFilteredCases(true);
        } else {
            setShowMonitoringClosedContactsFilteredCases(false);
            setMonitoringClosedContactsSearchesMatched([]);
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
                            setConfirmedSearch(event.target.value);
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
                    {!showConfirmedFilteredCases &&
                        contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                    {showConfirmedFilteredCases && 
                        confirmedSearchesMatched?.map((item, key) => (
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
                        <input onChange = {(event) => {
                            setClosedContactsContactsSearch(event.target.value);
                        }} placeholder="Procurar por paciente" type="search"></input>
                    </div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    {!showClosedContactsFilteredCases && 
                        contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoContatosProximos
                            contatoProximo={item} 
                            key={key}
                        />
                    ))}
                    {showClosedContactsFilteredCases && 
                        closedContactsSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Confirmados</h3></div>
                    <div className="divisaolinhas">Total de {getListOfCases("lstConfirmados", true).length} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas">
                        <input onChange = { (event) => {
                            setMonitoringConfirmedSearch(event.target.value);
                        }} placeholder="Procurar por paciente" type="search" />
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
                    {!showMonitoringConfirmedFilteredCases && 
                    contextInterviewed.lstConfirmados.map((item, key)=>(
                        <BancoMonitoramentoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))}
                    {showMonitoringConfirmedFilteredCases && 
                        monitoringConfirmedSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>

            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Monitoramento Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de {getListOfCases("lstContProximos", true).length} pessoas visíveis no banco</div> 
                    <div className="divisaolinhas">
                        <input onChange = {(event) => {
                            setMonitoringClosedContactsSearch(event.target.value);
                        }}placeholder="Procurar por paciente" type="search"></input>
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
                    {!showMonitoringClosedContactsFilteredCases && 
                    contextInterviewed.lstContProximos.map((item, key)=>(
                        <BancoMonitoramentoContProximos
                            contatoProximo={item}
                            key={key}
                        />
                    ))}
                    {showMonitoringClosedContactsFilteredCases && 
                        monitoringClosedContactsSearchesMatched?.map((item, key) => (
                        <BancoConfirmados 
                            confirmado={item}
                            key={key}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}