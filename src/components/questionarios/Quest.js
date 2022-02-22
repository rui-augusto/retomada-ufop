import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";

import "./Quest.css";

export const Quest = () => {

    const context = useInterviewed();

    // DEFINICAO DO useFOrm
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
    })


    const {
        register: register1,
        handleSubmit: handleSubmit1
    } = useForm();
    
    const {
        register: register2,
        handleSubmit: handleSubmit2
    } = useForm();

    const {
        register: register3,
        handleSubmit: handleSubmit3
    } = useForm();
    
    // STATES USADOS PARA AS PERGUNTAS QUE DEPENDEM DE OUTRAS PERGUNTAS
    const [estudante, setEstudante] = useState(false);
    const [docente, setDocente] = useState(false);
    const [pSaude, setPSaude] = useState(false);
    const [outraRelacao, setOutraRelacao] = useState(false);

    // OBJETOS QUE GUARDAM CADA PARTE DO QUESTIONARIO
    // false ---> NÃO CONCLÚIDO
    // true  ---> CONCLUÍDO
    const [primeiraParte, setPrimeiraParte] = useState(false);
    const [objPrimeiraParte, setObjPrimeiraParte] = useState({});
    const [segundaParte, setSegundaParte] = useState(false);
    const [objSegundaParte, setObjSegundaParte] = useState({});
    const [terceiraParte, setTerceiraParte] = useState(false);
    const [objTerceiraParte, setObjTerceiraParte] = useState({});

    // CONTATOS PROXIMOS
    const [houveContato, setHouveContato] = useState(false);
    const [contatosProximos, setContatosProximos] = useState([]);
    
    const seContato = () => {
        setHouveContato(true);
    }
    // FUNCOES QUE ANALISAM AS RESPOSTAS E DITAM A SEQUÊNCIA DO QUESTIONARIO
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

    const analyzeProfession = (event) =>{
        if (event.target.value == "sim"){
            setPSaude(true);
        }else{
            setPSaude(false);
        }
    }

    const analyzeRelation = (event) => {
        if (event.target.value == "outro"){
            setOutraRelacao(true);
        }
    }

    // FUNCAO QUE GUARDA AS INFORMACOES DE CADA PARTE DO QUESTIONARIO

    const onFirstSubmit = (data) => {
        console.log(data);
        setObjPrimeiraParte(data);
        setPrimeiraParte(true);
        // context.registerInterviewed(data.nome, data.altura, data.peso);
    }
    const onSecondSubmit = (data) => {
        console.log(data);
        setObjSegundaParte(data);
        setSegundaParte(true);
    }

    const onThirdSubmit = (data) => {
        console.log(data);
        setObjTerceiraParte(data);
        setTerceiraParte(true);
    }

    // FUNCAO QUE ENVIA TODOS OS DADOS AO FIREBASE
     const submitData = () => {
        context.registerInterviewed(objPrimeiraParte.nome, objPrimeiraParte, objSegundaParte, objTerceiraParte);
    }

    return (
        <div>
            { !primeiraParte &&
            <div>
                <form onSubmit = {handleSubmit1(onFirstSubmit)}>
                <h1>PRIMEIRA PARTE [ BÁSICAS DO ENTREVISTADO ]</h1>
                <br/><hr/><br/>
                <input {...register1("nome", {required: true})} type = "text" placeholder = "Nome"/>
                <input {...register1("nomeMae", {required: true})} type = "text" placeholder = "Nome da mãe"/>
                <input {...register1("endereco")} type = "text" placeholder = "Endereco"/>
                
                Genero
                <input {...register1("genero")} type="radio" value="masculino" />
                <input {...register1("genero")} type="radio" value="feminino" />
                <input {...register1("genero")} type="radio" value="outro" />

                Data de nascimento
                <input {...register1("nascimento")} type = "date"/>

                Raca
                <select {...register1("raca")} onChange = {analyzeOccupation}>
                    <option value="">Cor ou Raça...</option>
                    <option value="branca">Branca</option>
                    <option value="preta">Preta</option>
                    <option value="amarela">Amarela</option>
                    <option value="parda">Parda</option>
                    <option value="indigena">Indigena</option>
                </select>

                <input {...register1("cpf")} type = "number" placeholder = "Seu CPF"/>

                <input {...register1("altura", {required: true})} type = "number" placeholder = "Altura"/>
                <input {...register1("peso", {required: true})} type = "number" placeholder = "Peso"/>

                <select {...register1("ocupacao")} onChange = {analyzeOccupation}>
                    <option value="">Ocupacao...</option>
                    <option value="estudante">Estudante</option>
                    <option value="tecnicoAdm">Técnico Admnistrativo em Educação</option>
                    <option value="prestadorServico">Prestador de serviços</option>
                </select>
                
                { estudante &&
                    <div>
                        Nome do curso
                        <input {...register1("curso")} type = "text" placeholder = "Nome do Curso"/>
                    </div>
                }
                { docente &&
                    <div>
                        Unidade
                        <select {...register1("unidade")}>
                            <option value="">Unidade...</option>
                            <option value="reitoria">Reitoria</option>
                            <option value="proReitoria">Pró-Reitoria de Graduação</option>
                            <option value="proReitoriaPesquisa">Pró-Reitoria de pesquisa, pós-graduação e inovação</option>
                            <option value="proReitoriaExtensao">Pró-Reitoria de extensão e cultura</option>
                            <option value="proReitoriaComunitario">Pró-Reitoria de assuntos comunitários e estudantis</option>
                            <option value="proReitoriaPlanejamento">Pró-Reitoria de planejamento e administração</option>
                            <option value="proReitoriaFinancas">Pró-Reitoria de finanças</option>
                            <option value="proReitoriaGestao">Pró-Reitoria de gestão de pessoas</option>
                            <option value="prefeituraCampus">Prefeitura do Campus</option>
                            <option value="dirComunicacao">Diretoria de comunicação institucional</option>
                            <option value="dirRelacoesInternacionais">Diretoria de relações internacionais</option>
                            <option value="dirTecnologia">Diretoria de tecnologia e informação</option>
                            <option value="dirBiblioteca">Diretoria de bibliotecas e informação</option>
                            <option value=""></option>
                        </select>
                        Setor
                        <select {...register1("setor")}>
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
                Profissao
                <input {...register1("profissionalSaude")} type="radio" value="sim" onClick = {analyzeProfession}/>
                <input {...register1("profissionalSaude")} type="radio" value="nao" onClick = {analyzeProfession}/>

                { pSaude &&
                    <input {...register1("profissao")} type = "text" placeholder = "Profissão" />
                }

                Vacinado
                <input {...register1("vacinado")} type="radio" value="primeira" />
                <input {...register1("vacinado")} type="radio" value="primeiraSegunda" />
                <input {...register1("vacinado")} type="radio" value="doseUnica" />
                <input {...register1("vacinado")} type="radio" value="reforco3Dose" />

                <button type = "submit">Próximo</button>
                </form>
            </div>
            }
                {/* FIM DA PRIMEIRA PARTE DO QUESTIONARIO */}
                {   primeiraParte && !segundaParte &&
                    <div>
                        <form onSubmit = {handleSubmit2(onSecondSubmit)}>
                            <h1>SEGUNDA PARTE [ SAÚDE DO ENTREVISTADO ]</h1>
                            <br/><hr/><br/>
                            Data do diagnóstico
                            <input {...register2("dataDiagnostico")} type = "date"/>

                            <select {...register2("ondeDiagnostico")}>
                                <option value="">Onde obteve Diagnóstico...</option>
                                <option value="ubs">Unidade Básica de Saúde(UBS)</option>
                                <option value="ufop">UFOP</option>
                                <option value="upa">Unidade de Pronto Atendimento</option>
                                <option value="hospital">Hospital</option>
                                <option value="planoSaude">Plano de Saúde</option>
                                <option value="empresas">Empresas</option>
                                <option value="outro">Outro...</option>
                            </select>

                            <select {...register2("testeRealizado")}>
                                <option value="">Teste Realizado...</option>
                                <option value="anticorpo">Teste Rápido - Anticorpo</option>
                                <option value="antigeno">Teste Rápido - Antigeno</option>
                                <option value="sorologico">Sorológico</option>
                                <option value="pcr">PCR</option>
                                <option value="naoSabe">Não sei...</option>
                            </select>

                            Internado?
                            <input {...register2("internado")} type="radio" value="sim" />
                            <input {...register2("internado")} type="radio" value="nao" />

                            <select {...register2("cidadeExame")}>
                                <option value="">Cidade Exame...</option>
                                <option value="ouroPreto">Ouro Preto</option>
                                <option value="joaoMonlevade">João Monlevade</option>
                                <option value="mariana">Mariana</option>
                                <option value="beloHorizonte">Belo Horizonte</option>
                                <option value="outra">Outra...</option>
                            </select>

                            Sintomas
                            <input {...register2("sintomas")} type="checkbox" value="febre" />
                            <input {...register2("sintomas")} type="checkbox" value="dispineia" />
                            <input {...register2("sintomas")} type="checkbox" value="dorGarganta" />
                            <input {...register2("sintomas")} type="checkbox" value="dorCabeca" />
                            <input {...register2("sintomas")} type="checkbox" value="tosse" />
                            <input {...register2("sintomas")} type="checkbox" value="coriza" />
                            <input {...register2("sintomas")} type="checkbox" value="perdaOlfato" />
                            <input {...register2("sintomas")} type="checkbox" value="perdaPaladar" />
                            <input {...register2("sintomas")} type="checkbox" value="nenhum" />

                            <input {...register2("inicioSintomas")} type = "date"/>

                            Condições
                            <input {...register2("condicoes")} type="checkbox" value="doencaCardiaca" />
                            <input {...register2("condicoes")} type="checkbox" value="doencaPulmonar" />
                            <input {...register2("condicoes")} type="checkbox" value="transplantadoOrgao" />
                            <input {...register2("condicoes")} type="checkbox" value="doencaCerebrovascular" />
                            {/* <input {...register2("condicoes")} type="checkbox" value="obesidade" />  CALCULO DEVE SER FEITO*/}
                            <input {...register2("condicoes")} type="checkbox" value="diabetes" />
                            <input {...register2("condicoes")} type="checkbox" value="cancer" />
                            <input {...register2("condicoes")} type="checkbox" value="doencaFigado" />
                            <input {...register2("condicoes")} type="checkbox" value="doencaRins" />
                            <input {...register2("condicoes")} type="checkbox" value="anemia" />
                            <input {...register2("condicoes")} type="checkbox" value="indigena" />

                            Situações

                            <input {...register2("situacoes")} type="checkbox" value="gestante" />
                            <input {...register2("situacoes")} type="checkbox" value="puerperio" />
                            <input {...register2("situacoes")} type="checkbox" value="nenhuma" />

                            Melhora ou piora?

                            <input {...register1("situacaoSintomas")} type="radio" value="melhora" />
                            <input {...register1("situacaoSintomas")} type="radio" value="piora" />
                            <input {...register1("situacaoSintomas")} type="radio" value="semMudancas" />

                            <input {...register2("sintomasGraves")} type="checkbox" value="faltaAr" />
                            <input {...register2("sintomasGraves")} type="checkbox" value="sensacaoDesmaio" />
                            <input {...register2("sintomasGraves")} type="checkbox" value="confusao" />
                            <input {...register2("sintomasGraves")} type="checkbox" value="febreContinua" />

                            <button type = "submit">Próximo</button>
                        </form>
                    </div>
                }
                { primeiraParte && segundaParte && !terceiraParte &&

                    <div>
                        <h1>SEGUNDA PARTE [ CONTATOS PRÓXIMOS ]</h1>
                        <button>Não houve contato</button>
                        <form onSubmit = {handleSubmit3(onThirdSubmit)}>
                            <button onClick = {seContato}>Adicionar contato próximo</button>
                            <input {...register3("nome")} type = "text" placeholder = "nome do contato"/>
                            <input {...register3("telefone1")} type = "number" placeholder = "telefone de contato 1"/>
                            <input {...register3("telefone2")} type = "number" placeholder = "telefone de contato 2"/>

                            <select {...register3("relacao")}>
                                <option value="">Relação com o caso...</option>
                                <option value="domiciliar">Domiciliar</option>
                                <option value="familiar">Familiar (extradomiciliar)</option>
                                <option value="laboral">Laboral</option>
                                <option value="estudantil">Estudantil</option>
                                <option value="eventoSocial">Evento social</option>
                                <option value="outro">Outro</option>
                            </select>
                            { outraRelacao &&
                                <div>
                                    <input {...register3("outraRelacao")} type = "text" placeholder = "tipo de relação"/>
                                </div>
                            }
                            Data do último contato
                            <input {...register3("dataUltimoContato")} type = "date"/>
                        <button type = "submit">Finalizar</button>
                        </form>

                    </div>
                }
                { terceiraParte &&
                    <button onClick = {submitData}>Enviar dados</button>
                }
        </div>
    );
}

// ALTERACOES RESTANTES

/*
    1. MODULARIZAR O CODIGO: CRIAR UM COMPONENTE PARA CADA PARTE DO QUESTIONARIO
    2. REVER TERCEIRA PARTE (BOTÃO DE ADICIONAR/NAO ADICIONAR)
    3. REVER FUNCOES CONDICIONAIS
    3. ESTILIZAR A PAGINA
*/