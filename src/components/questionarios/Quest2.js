// MONITORAMENTO DE CONTATO PROXIMO

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useInterviewed } from "../../context/interviewed";
import { useUser } from "../../context/user";


import "./Quest2.css";

export const Quest2 = () => {

    const context = useInterviewed();
    const { user } = useUser();
    console.log(user);

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

    const {register, handleSubmit} = useForm();

    const [outraRelacao, setOutraRelacao] = useState(false);
    const [fazParteUfop, setFazParteUfop] = useState(false);
    const [estudante, setEstudante] = useState(false);
    const [docente, setDocente] = useState(false);
    const [fezTeste, setFezTeste] = useState(false);
    const [mudarQuest, setMudarQuest] = useState(false);

    const analyzeRelation = (event) => {
        if (event.target.value == "outro"){
            setOutraRelacao(true);
        }else{
            setOutraRelacao(false);
        }
    }

    const analyzeUfop = (event) => {
        if (event.target.value == "sim"){
            setFazParteUfop(true);
        } else{
            setFazParteUfop(false);
        }
    }

    const analyzeOccupation = (event) => {
        if (event.target.value == "estudante"){
            setDocente(false);
            setEstudante(true);
        }
        else {
            setEstudante(false);
            setDocente(true);
        }
    }

    const analyzeTest = (event) => {
        if (event.target.value == "sim"){
            setFezTeste(true);
        }else{
            setFezTeste(false);
        }
    }

    const submitData = (data) => {
        console.log(data);

        var dataHorarioAgora = new Date().setHours(0,0,0);

        var dataUltimoContato = new Date(data.ultimoContato).setHours(27,0,0);

        const objContatoProximo = {
            dataEntrevista: dataHorarioAgora,
            dataUltimoContato: dataUltimoContato,
            entrevistador: user.name,
            fezTeste: data.fezTeste,
            horaFim: -1,
            horaInicio: -1,
            idUnico: -1,
        };

        console.log(objContatoProximo);
        context.registerMonitoringCloseContacts(objContatoProximo, 155555);

    }
    return (
        <div>
            <div className="fullArea2">
                <form className="formAreaQuest2" onSubmit = {handleSubmit(submitData)}>
                    <div className="Description-quest">
                        <h3>APÊNDICE</h3> <p>Instrumento da Pesquisa</p>                       
                    </div>
                    <div className="Info-quest">
                        <p>Questionário telefônico dos Contatos Próximos</p>
                        <p>Monitoramento</p>
                    </div>
            
                    <div className='nomeEntrevistado'>
                        Nome do(a) entrevistado(a)
                        <input className="inputquest" {...register("nome")} type = "text" placeholder = "Nome do entrevistado"/>
                    </div>

                    <div className='relacao'>
                        Relação
                            <select className='inputquest' {...register("relacao")} onClick = {analyzeRelation}>
                                <option value = "">Selecione...</option>
                                <option value = "domiciliar">Domiciliar</option>
                                <option value = "familiar">Familiar (extradomiciliar)</option>
                                <option value = "laboral">Laboral</option>
                                <option value = "estudantil">Estudantil</option>
                                <option value = "eventoSocial">Evento social</option>
                                <option value = "outro">Outro</option>
                            </select>
                    </div>
                    {outraRelacao &&
                        <div className='inputrelacao'>
                            <input {...register("outraRelacao")} type = "text" placeholder = "Especificar outra relação"/>
                        </div>
                    }

                    <div className='dataultimocontato'>
                        Data do último contato: 
                        <input {...register("ultimoContato")} type = "date"/>
                    </div>

                    <div className="sintomas">
                            Apresentou algum desses sintomas?
                            <div className="inputSintomas">
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register("sintoma01")} type="checkbox" /> febre &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma02")} type="checkbox" /> dispineia &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma03")} type="checkbox" /> dor de garganta &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register("sintoma04")} type="checkbox" /> dor de cabeça &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma05")} type="checkbox" /> tosse &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma06")} type="checkbox" /> coriza &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register("sintoma07")} type="checkbox" /> perda do olfato &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma08")} type="checkbox" /> perda do paladar &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register("sintoma09")} type="checkbox" /> nenhum &nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            
                        <div className='vinculoUfop'>
                           
                            <select {...register("campus")}>
                                <option value = "">Campus...</option>
                                <option value = "ouroPreto">Ouro Preto</option>
                                <option value = "mariana">Mariana</option>
                                <option value = "joaoMonlevade">João Monlevade</option>
                            </select>

                            <div className='blocooptions'>
                                    <select {...register("ocupacao")} onChange = {analyzeOccupation}>
                                        <option value = "">Ocupação...</option>
                                        <option value = "estudante">Estudante</option>
                                        <option value = "docente">Docente</option>
                                        <option value = "tecnicoAdm">Técnico Admnistrativo em Educação</option>
                                        <option value = "prestadorServico">Prestador de serviços</option>
                                    </select>
                                {estudante &&
                                        <input className="inputquesteCurso"{...register("nomeCurso")} type = "text" placeholder = "Nome do curso"/>
                                }
                                {docente &&
                                    <div className='options'>
                                        
                                        <select {...register("unidade")}>
                                            <option value = "">Unidade...</option>
                                            <option value = "reitoria">Reitoria</option>
                                            <option value = "proReitoria">Pró-Reitoria de Graduação</option>
                                            <option value = "proReitoriaPesquisa">Pró-Reitoria de pesquisa, pós-graduação e inovação</option>
                                            <option value = "proReitoriaExtensao">Pró-Reitoria de extensão e cultura</option>
                                            <option value = "proReitoriaComunitario">Pró-Reitoria de assuntos comunitários e estudantis</option>
                                            <option value = "proReitoriaPlanejamento">Pró-Reitoria de planejamento e administração</option>
                                            <option value = "proReitoriaFinancas">Pró-Reitoria de finanças</option>
                                            <option value = "proReitoriaGestao">Pró-Reitoria de gestão de pessoas</option>
                                            <option value = "prefeituraCampus">Prefeitura do Campus</option>
                                            <option value = "dirComunicacao">Diretoria de comunicação institucional</option>
                                            <option value = "dirRelacoesInternacionais">Diretoria de relações internacionais</option>
                                            <option value = "dirTecnologia">Diretoria de tecnologia e informação</option>
                                            <option value = "dirBiblioteca">Diretoria de bibliotecas e informação</option>
                                            <option value = ""></option>
                                        </select>
                                    
                                        <select {...register("setor")}>
                                            <option value = "">Setor...</option>
                                            <option value = "cead">CEAD</option>
                                            <option value = "edtm">EDTM</option>
                                            <option value = "eef">Escola de Educação Física</option>
                                            <option value = "ef">Escola de Farmácia</option>
                                            <option value = "eminas">Escola de Minas</option>
                                            <option value = "emedicina">Escola de Medicina</option>
                                            <option value = "en">Escola de Nutrição</option>
                                            <option value = "iceb">ICEB</option>
                                            <option value = "ifac">IFAC</option>
                                            <option value = "ichs">ICHS</option>
                                            <option value = "icea">ICEA</option>
                                        </select>
                                    </div>
                                }

                            </div>
                        </div>

                        <div className='TesteRealizado'>
                            Realizou teste?  &nbsp; 
                                <input {...register("fezTeste")} onClick = {analyzeTest} type="radio" value="sim" /> sim &nbsp; 
                                <input {...register("fezTeste")} onClick = {analyzeTest} type="radio" value="nao" /> não 
                        </div>

                            <div className='fezTeste'>
                                {fezTeste &&
                                    <div>
                                        <div className='TipoTeste'>
                                            <select {...register("testeRealizado")}>
                                                    <option value = "">Teste Realizado...</option>
                                                    <option value = "anticorpo">Teste Rápido - Anticorpo</option>
                                                    <option value = "antigeno">Teste Rápido - Antigeno</option>
                                                    <option value = "sorologico">Sorológico</option>
                                                    <option value = "pcr">PCR</option>
                                                    <option value = "naoSabe">Não sei...</option>
                                            </select>
                                        </div>

                                        <div className='Resultado'>
                                            Resultado do teste: &nbsp; 
                                            <input {...register("resultadoTeste")} type = "radio" value = "positivo"/> positivo &nbsp; 
                                            <input {...register("resultadoTeste")} type = "radio" value = "negativo"/> negativo &nbsp; 
                                        </div>

                                    </div>

                            }
                            </div>

                    <div className='btnQ2'>
                        <button className="btn-finalizar" type = "submit">Finalizar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}