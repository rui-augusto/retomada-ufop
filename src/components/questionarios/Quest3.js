// QUESTIONARIO DE MONITORAMENTO CONFIRMADOS

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInterviewed } from "../../context/interviewed";
import { useUser } from "../../context/user";
import { useNavigate, useParams } from 'react-router-dom';

import "./Quest3.css";
import { BancoContatosProximos } from './BancoContatosProximos';

export const Quest3 = () => {
    
    const navigate = useNavigate();

    useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
    });

    const {
        register: register1,
        handleSubmit: handleSubmit1
    } = useForm();
    
    const {
        register: register2,
        handleSubmit: handleSubmit2
    } = useForm();

    const { cpf } = useParams();
    const contextUser = useUser();
    const context = useInterviewed();

    const horarioInicio = new Date().setHours(0,0,0) / 1000;

    const [primeiraParte, setPrimeiraParte] = useState(false);
    const [fezTeste, setFezTeste] = useState(false);
    const [seContato, setSeContato] = useState(false);
    const [outraRelacao, setOutraRelacao] = useState(false);


    const analyzeTest = (event) => {
        if (event.target.value == "sim"){
            setFezTeste(true);
        }else{
            setFezTeste(false);
        }
    }

    const analyzeContat = (event) => {
        if (event.target.value == "sim"){
            setSeContato(true);
        }else{
            setSeContato(false);
        }
    }

    const analyzeRelation = (event) => {
        if (event.target.value == "outro"){
            setOutraRelacao(true);
        }
    }

    const submitData = async (data) => {
        
        var referencia = `Confirmados/${cpf}/objetoDados/`;
        const resCpf = await context.getRefFromDataBase(referencia);

        var dataHorarioAgora = new Date().setHours(0,0,0);
        const where = `${cpf}-${dataHorarioAgora}`; // onde vai ser postado o monitoramento

        const obj = {
            cpf: cpf,
            dataNascimento: resCpf.dataNascimento,
            dataEntrevista: dataHorarioAgora,
            entrevistador: contextUser.user.email,
            entrouEmContatoComMaisAlguem: data.contatoProximo,
            horaFim: dataHorarioAgora,
            horaInicio: horarioInicio,
            idUnico: where,
            nome: resCpf.nome,
            obs: "null",
            outrosSintomas: data.outroSintoma,
            sintoma01: data.sintoma01,
            sintoma02: data.sintoma02,
            sintoma03: data.sintoma03,
            sintoma04: data.sintoma04,
            sintoma05: data.sintoma05,
            statusMelhora: data.situacaoSintomas
        }

        context.registerMonitoringConfirmedCase(obj, where);
        context.addQtdEntrevistaConfirmado(cpf);

        if (seContato){
            setPrimeiraParte(true);
        }
        else if (!seContato){
            navigate(`/home/${contextUser.user.uid}`);
        }
    }

    const cadastraContato = async (data) => {
        
        console.log("DADOS CONTATO PROXIMO: ", data);
        var dataHorarioAgora = new Date().setHours(0,0,0) / 1000;
        var dataUltimoContato = new Date(data.dataUltimoContato).setHours(27,0,0) / 1000;
        var proxEntrevista = (dataUltimoContato).toFixed(0) + 172800;
        if (data.telefone2 == ""){
            data.telefone2 = null;
        }

        var contadorContatosProximos = await context.countingCloseContacts(); // onde vai ser postado o Contato Proximo

        const objContatoProximo = {
            contTentativas: 0,
            dataInclusaoBanco: dataHorarioAgora,
            dataNascimento: 0,
            dataProximaEntrevista: proxEntrevista,
            dataUltimaMudancaSituacao: dataHorarioAgora,
            dataUltimoContato: dataUltimoContato,
            entrevistador: contextUser.user.email,
            fezTeste: "NULL",
            idUnicoGeradorDoContato: cpf,
            idUnico: contadorContatosProximos,
            log: "Sem registro de ligação",
            logSituacao: "NULL",
            nome: data.nome,
            obs: "NULL",
            origem: "contatoProximo",
            pessoaFoiVacinada: "NULL",
            pessoaQuantidadeVacinas: "NULL",
            quantidadeEntrevistas: 3,
            relacaoComOCaso: data.relacao,
            residenteAcimaDe60FoiVacinado: "NULL",
            residenteAcimaDe60QuantidadeDeDoses: "NULL",
            resultadoTeste: "NULL",
            semSintoma: "NULL",
            sintoma1: "não",
            sintoma2: "não",
            sintoma3: "não",
            sintoma4: "não",
            sintoma5: "não",
            sintoma6: "não",
            sintoma7: "não",
            situacao: "naoContato",
            telefone1: data.telefone1,
            telefone2: data.telefone2,
            temResidenteAcimaDe60: null,
            tipoTeste: null
        }
        context.registerCloseContacts(objContatoProximo);
        
        navigate(`/home/${contextUser.user.uid}`);
    }

    return (
        <div>
            <div className="fullArea">
                <div className='formAreaQuest'>
                {!primeiraParte && 
                <form onSubmit = {handleSubmit1(submitData)}>
                    
                    <div className="Description-quest">
                        <h3>APÊNDICE</h3> <p>Instrumento da Pesquisa</p>                       
                    </div>
                       
                    <div className="Info-quest">
                        <p>Questionário telefônico dos Casos Confirmados</p>
                        <p>Monitoramento</p>
                    </div>
            
                    <div className='testeRealizado'>
                        <div>
                            Realizou um novo teste? &nbsp;
                            <input {...register1("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "sim"/> Sim &nbsp;
                            <input {...register1("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "nao"/> Não 
                        </div>
                    </div>

                    {fezTeste &&
                        <div className='fezTeste'>
                            <div>
                                <select {...register1("testeRealizado")}>
                                        <option value = "">Teste Realizado...</option>
                                        <option value = "anticorpo">Teste Rápido - Anticorpo</option>
                                        <option value = "antigeno">Teste Rápido - Antigeno</option>
                                        <option value = "sorologico">Sorológico</option>
                                        <option value = "pcr">PCR</option>
                                        <option value = "naoSabe">Não sei...</option>
                                </select>
                            </div>

                            <div>
                                Resultado do teste: &nbsp;
                                <input {...register1("resultadoTeste")} type = "radio" value = "positivo"/> Positivo &nbsp;
                                <input {...register1("resultadoTeste")} type = "radio" value = "negativo"/> Negativo
                            </div>
                        </div>
                    }
                    
                    <div className="sintomas">
                        Apresentou algum desses sintomas?
                        <div className="inputSintomas">
                                <div className="espacamento">
                                    <div className="espacamentointerior"><input {...register1("sintoma01")} type="checkbox" /> dor de cabeça &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register1("sintoma02")} type="checkbox" /> tosse &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register1("sintoma03")} type="checkbox" /> coriza &nbsp;</div>
                                </div>
                                <div className="espacamento">
                                    <div className="espacamentointerior"><input {...register1("sintoma04")} type="checkbox" /> perda do olfato &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register1("sintoma05")} type="checkbox" /> perda do paladar &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register1("sintoma06")} type="checkbox" /> nenhum &nbsp;</div>
                                </div>
                        </div>
                    </div>

                    <div className='outros'>
                        Outro(s) sintoma(s): &nbsp;
                        <input {...register1("outroSintoma")} type = "text" placeholder = "Sintoma(s)..."/>
                    </div>

                    <div className='situacaoProximo'>
                        Melhora ou piora?  &nbsp;

                        <input {...register1("situacaoSintomas")} type = "radio" value = "melhora" /> &nbsp;Melhora  &nbsp;
                        <input {...register1("situacaoSintomas")} type = "radio" value = "piora" />&nbsp; Piora  &nbsp;
                        <input {...register1("situacaoSintomas")} type = "radio" value = "semMudancas" /> &nbsp; Sem mudanças 
                    </div>

                    <div className='outros'>
                        Teve contato com alguém da UFOP? &nbsp;
                        <input {...register1("contatoProximo")} onClick = {analyzeContat} type = "radio" value = "sim" /> &nbsp; Sim &nbsp;
                        <input {...register1("contatoProximo")} onClick = {analyzeContat} type = "radio" value = "nao" /> &nbsp; Não 
                    </div>
                    <div className='btn'>
                        <button className='btn-proximos' type = "submit">Finalizar</button>
                    </div>
                </form>
                }
                {primeiraParte && seContato &&
                        <div>
                            <form className='formquestcontato' onSubmit = {handleSubmit2(cadastraContato)}>
                                <div className="vinculoUFOP">
                                    Possui vínculo com a UFOP? &nbsp; <input {...register2("vinculoUFOP")} type = "checkbox" required/> &nbsp; Sim
                                </div>
                                    <input {...register2("nome")} type = "text" placeholder = "nome do contato"/>
                                    <input {...register2("telefone1")} type = "number" placeholder = "telefone de contato 1" required/>
                                    <input {...register2("telefone2")} type = "number" placeholder = "telefone de contato 2"/>
                                
                            
                                    <select {...register2("relacao")} onClick = {analyzeRelation}>
                                        <option value="">Relação com o caso...</option>
                                        <option value="domiciliar">Domiciliar</option>
                                        <option value="familiar">Familiar (extradomiciliar)</option>
                                        <option value="laboral">Laboral</option>
                                        <option value="estudantil">Estudantil</option>
                                        <option value="eventoSocial">Evento social</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                    { outraRelacao &&
                                        <div className="relacao">
                                            <input {...register2("outraRelacao")} type = "text" placeholder = "tipo de relação"/>
                                        </div>
                                    }
                                    <div className="dataContato">
                                        Data do último contato com o caso confirmado
                                        <div className="inputDataContato">
                                            <input {...register2("dataUltimoContato")} type = "date"/>
                                        </div>
                                    </div>
                                    <div className="btns">
                                        <button type = "submit" className="btn-finalizar">Cadastrar</button>
                                    </div>
                                </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}