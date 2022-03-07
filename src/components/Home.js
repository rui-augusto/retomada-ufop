import { useUser } from "../context/user";
import { useInterviewed } from "../context/interviewed";
import React, { useState, useEffect} from 'react';

import { BancoConfirmados } from "./questionarios/BancoConfirmados";

import "./style/Home.css"


export const Home = () => {

    // getRefFromDataBase()

    const [teste, setTeste] = useState({});
    const [teste2, setTeste2] = useState([]);

    const contextUser = useUser();
    console.log(contextUser);
    const contextInterviewed = useInterviewed();
    console.log(contextInterviewed);

    // const [listaConfirmados, setListaConfirmados] = useState([]);
    // const [chatlist, setChatList] = useState([]);

    const funcaoAux = async () => {
        // console.log(contextInterviewed.getRefFromDataBase());
        setTeste(await contextInterviewed.getRefFromDataBase());    }
    
    const funcaoAux2 = () => {
        setTeste2(Object.values(teste));
        console.log("2 :", teste2);
    }

    return (
        
        <div className='fullscreenAreaHome'>
            <div className="AreaPesquisa">
            
                <div className="titulo"><h2>Bem-vindo(a), {contextUser.user.name}.</h2></div>
                <div className="titulo"><button onClick = {funcaoAux}>APLICAR</button></div>
                <div className="titulo"><button onClick = {funcaoAux2}>APLICAR2</button></div>

                
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
                    <div className="divisaolinhas">Total de ---- pessoas visíveis no banco</div> 

                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                    <div className="infoSituacao">Situação</div>
                </div>
                <div className="chatNomes">
                    {teste2.map((item, key)=>(
                        <BancoConfirmados
                            confirmado={item}
                            key={key}
                        />
                    ))} 
                    {teste2.map((item, key) => {
                        console.log(item.objetoDados);
                        <div>{item.objetoDados.contTentativas}</div>
                    })}

                </div>
            </div>
                    
                    
            <div className="BoxPessoas">

                <div className="primeiraLinha">
                    <div className="divisaolinhas"><h3>Banco de Contatos Próximos</h3></div>
                    <div className="divisaolinhas">Total de ---- pessoas visíveis no banco</div> 
                    <div className="divisaolinhas"><input placeholder="Procurar por paciente" type="search"></input></div>
                </div>

                <div className="segundaLinha">
                    <div className="infoNome">Nome</div>
                    <div className="infoTelefone">Telefone</div>
                    <div className="infoMonitorar">Monitorar até</div>
                </div>
                <div className="chatNomes">
                    {/* {chatlist.map((item, key)=>(
                        <BancoContatosProximos 
                            key={key}
                        />
                    ))} */}
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