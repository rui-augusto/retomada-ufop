import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";

import "./Quest.css";
import { useNavigate } from "react-router-dom";

export const Quest = () => {

    const context = useInterviewed();

    const navigate = useNavigate();

    // DEFINICAO DO useForm
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

    const {
        register: register3,
        handleSubmit: handleSubmit3
    } = useForm();
    
    // STATES USADOS PARA AS PERGUNTAS QUE DEPENDEM DE OUTRAS PERGUNTAS
    const [femaleGender, setFemaleGender] = useState(false);
    const [estudante, setEstudante] = useState(false);
    const [docente, setDocente] = useState(false);
    const [pSaude, setPSaude] = useState(false);
    const [foiVacinado, setFoiVacinado] = useState(false);
    const [outraRelacao, setOutraRelacao] = useState(false);

    // OBJETOS QUE GUARDAM CADA PARTE DO QUESTIONARIO
    // false ---> NÃO CONCLÚIDO
    // true  ---> CONCLUÍDO
    const [primeiraParte, setPrimeiraParte] = useState(false);
    const [objPrimeiraParte, setObjPrimeiraParte] = useState({});
    const [segundaParte, setSegundaParte] = useState(false);
    const [objSegundaParte, setObjSegundaParte] = useState({});
    const [objInfoTotal, setObjInfoTotal] = useState({});
    const [terceiraParte, setTerceiraParte] = useState(false);
    const [objTerceiraParte, setObjTerceiraParte] = useState({});

    // CALCULOS INFORMACIONAIS
    const [isObese, setIsObese] = useState(false);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    // CONTROLE DE DADOS FIREBASE
    const [situacaoCritica, setSituacaoCritica] = useState(false);

    const infoHeight = (event) => {
        setHeight((event.target.value) / 100);
    };

    const infoWeight = (event) => {
        setWeight(event.target.value);
    }

    useEffect(() => {
        if (height != 0 && weight != 0){
            let imc = weight / (height * height);
            if (imc > 40){
                setIsObese(true);
            }
            console.log("imc = ", imc);
        }
    }, [primeiraParte]);

    // CONTATOS PROXIMOS
    const [houveContato, setHouveContato] = useState(false);
    const [contatosProximos, setContatosProximos] = useState([]);
    
    const semContato = () => {
        objTerceiraParte = {
            dataUltimoContato: 0,
            nome: 0,
            relacao: 0,
            telefone1: 0,
            telefone2: 0
        };
        console.log(objTerceiraParte);
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

    const analyzeVaccine = (event) => {
        if (event.target.value == "sim"){
            setFoiVacinado(true);
        }else{
            setFoiVacinado(false);
        }
    }

    const analyzeGender = (event) => {
        if (event.target.value == "feminino"){
            setFemaleGender(true);
        }else{
            setFemaleGender(false);
        }
    }

    const analyzeCloseContact = (event) => {
        console.log(event.target.checked);
        if (event.target.checked == true){
            setHouveContato(true);
        }else{
            setHouveContato(false);
        }
    }

    const analyzeData = () => {
        if (objSegundaParte.condicao01 == true || objSegundaParte.condicao02 == true || objSegundaParte.condicao03 == true ||
            objSegundaParte.condicao04 == true || objSegundaParte.condicao05 == true || objSegundaParte.condicao06 == true ||
            objSegundaParte.condicao07 == true || objSegundaParte.condicao08 == true || objSegundaParte.condicao09 == true ||
            objSegundaParte.condicao10 == true || objSegundaParte.condicao11 == true || objSegundaParte.situacao1 == true ||
            objSegundaParte.condicao2 == true){
                setSituacaoCritica(true);
            }
    }

    // FUNCOES QUE ANALISAM A FREQUENCIA DAS ENTREVISTAS



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
        if (data.semContatoProximo){
            console.log("Não vai ser criado");
        } else{
            console.log(data);
            setObjTerceiraParte(data);
        }
        setTerceiraParte(true);
    }

    // FUNCAO QUE TERMINA O QUESTIONARIO

    const finishQuest = () => {
        setTerceiraParte(true);
    }

    // FUNCAO QUE ENVIA TODOS OS DADOS DO QUESTIONARIO PRINCIPAL AO FIREBASE
    const submitData = () => {
        context.registerPositiveInterviewed(objPrimeiraParte.cpf, objPrimeiraParte, objSegundaParte);
        dadosConfirmado();
        if (houveContato){
            dadosContatoProximo();
        }
        navigate("../home/uid");
    }

    // FUNCAO QUE ENVIA OS DADOS DO CONFIRMADO AO FIREBASE
    // const dadosConfirmado = () => {
    //     var dataHorarioAgora = new Date().setHours(0,0,0);

    //     var dataInicioSintomas = new Date(objSegundaParte.inicioSintomas).setHours(27,0,0);

    //     var dataNascimento = new Date(objPrimeiraParte.nascimento).setHours(27,0,0);

    //     var dataDiagnostico = new Date(objSegundaParte.dataDiagnostico).setHours(27,0,0);

    //     const objConfirmado = {
    //         contTentativas: 0,
    //         cpf: objPrimeiraParte.cpf,
    //         dataInclusaoBanco: dataHorarioAgora,
    //         dataInicioSintomas: dataInicioSintomas,
    //         dataNascimento: dataNascimento,
    //         dataProximaEntrevista: null,
    //         dataTeste: dataDiagnostico,
    //         dataUltimaMudancaSituacao: dataHorarioAgora,
    //         entrevistador: null,
    //         entrevistasRealizadas: 0,
    //         frequenciaDiasMonitoramento: 0,
    //         log: [],
    //         logSituacao: "Em branco",
    //         nome: objPrimeiraParte.nome,
    //         obs: "Em branco",
    //         origem: "Em branco",
    //         quantidadeEntrevistas: 0,
    //         sexo: objPrimeiraParte.genero,
    //         situacao: "naoContato",
    //         telefone: null,
    //         tipoTeste: objSegundaParte.testeRealizado
    //     }

    //     console.log(objConfirmado);
    //     context.registerConfirmedCase(objConfirmado, objConfirmado.cpf);
    // }

    const dadosConfirmado = () => {

        context.changeSituation(objPrimeiraParte.cpf);
        // const updates = {};
        
        // if (situacaoCritica){
        //     updates['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/frequenciaDiasMonitoramento'] = 1;
        //     updates['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/quantidadeEntrevistas'] = 5;
        // }
        // updates['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/situacao'] = "andamento";
            // entrevistas realizadas + 1
            // atualizar ultima mudanca situacao
            // cont tentativas = 0
    }

    const dadosContatoProximo = () => {
        var dataHorarioAgora = new Date().setHours(0,0,0);

        var dataUltimoContato = new Date(objTerceiraParte.dataUltimoContato).setHours(27,0,0);

        if (objTerceiraParte.telefone1 == undefined){
            objTerceiraParte.telefone1 = null;
        }
        if (objTerceiraParte.telefone2 == undefined){
            objTerceiraParte.telefone2 = null;
        }

        const objContatoProximo = {
            contEntrevistas: 0,
            contTentativas: 0,
            dataInclusaoBanco: dataHorarioAgora,
            dataNascimento: null,
            dataProximaEntrevista: null,
            dataUltimaMudancaSituacao: dataHorarioAgora,
            dataUltimoContato: dataUltimoContato,
            entrevistador: null,
            cpfGeradorDoContato: 155,
            log: "a",
            logSituacao: "a",
            nome: objTerceiraParte.nome,
            obs: "a",
            relacaoComOCaso: objTerceiraParte.relacao,
            situacao: "aberto",
            telefone1: objTerceiraParte.telefone1,
            telefone2: objTerceiraParte.telefone2
        }
        console.log(objContatoProximo);
        context.registerCloseContacts(objContatoProximo, dataHorarioAgora);
    }

    return (

        <div className="fullArea">
            { !primeiraParte &&
            <div className="formArea" id="formAreaid">
                <div className="Description-quest">
                    <h3>APÊNDICE</h3>
                    <p>Instrumento da Pesquisa</p>                       
                </div>
                    
                <div className="Info-quest">
                    <p>Questionário telefônico dos Casos Confirmados</p>
                    <p>Dados básicos do entrevistado - Parte 1</p>
                </div>
                    
                <form onSubmit = {handleSubmit1(onFirstSubmit)} className='firstform'>
                <br/><br/>
                <input className="inputquest"{...register1("nome", {required: true})} type = "text" placeholder = "Nome"/>
                <input className="inputquest"{...register1("nomeMae", {required: true})} type = "text" placeholder = "Nome da mãe"/>
                <input className="inputquest"{...register1("endereco")} type = "text" placeholder = "Endereco"/>

                <select className='inputquest' {...register1("raca")} >
                    <option value="">Cor</option>
                    <option value="branca">Branca</option>
                    <option value="preta">Preta</option>
                    <option value="amarela">Amarela</option>
                    <option value="parda">Parda</option>
                    <option value="indigena">Indigena</option>
                </select>

                <input className="inputquest" {...register1("cpf")} type = "number" placeholder = "CPF"/>

                <input className="inputquest"{...register1("altura", {required: true})} onChange = {infoHeight} type = "number" placeholder = "Altura"/>
                <input className="inputquest"{...register1("peso", {required: true})} onChange = {infoWeight} type = "number" placeholder = "Peso"/>

                <div className="birthdate">
                    Data de nascimento
                    <input {...register1("nascimento")} type = "date"/>
                </div>

                <div className="colunaSaudeGenero">
                    <div className="gender">
                        Gênero &nbsp; 
                            <input {...register1("genero")} type="radio" value="masculino" onClick = {analyzeGender}/>&nbsp;  M &nbsp; 
                            <input {...register1("genero")} type="radio" value="feminino" onClick = {analyzeGender}/>&nbsp;  F &nbsp; 
                            <input {...register1("genero")} type="radio" value="outro" onClick = {analyzeGender}/>&nbsp;  outro 
                    </div>
                    
                    <div className="profsaude">
                        Profissional de saúde? &nbsp;
                            <input {...register1("profissionalSaude")} type="radio" value="sim" onClick = {analyzeProfession}/> &nbsp; sim &nbsp;
                            <input {...register1("profissionalSaude")} type="radio" value="nao" onClick = {analyzeProfession}/> &nbsp; não &nbsp;
                    </div>
                </div>
                { pSaude &&
                    <input className="checkprof" {...register1("profissao")} type = "text" placeholder = "Profissão" />
                }

                <div className="optionProf">
                    <select {...register1("ocupacao")} onChange = {analyzeOccupation}>
                        <option value="">Ocupação</option>
                        <option value="estudante">Estudante</option>
                        <option value="tecnicoAdm">Técnico Admnistrativo em Educação</option>
                        <option value="prestadorServico">Prestador de serviços</option>
                    </select>
                </div>
                
                { estudante &&
                    <div className="inputEstudante">
                        <input {...register1("numMatricula")} type = "number" placeholder = "Número de Matrícula"/>
                    </div>
                }
                { docente &&
                    <div className="inputProfissao">

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

                <div className="vacina">
                    <div className="grauVacina">
                    Grau de vacinação: 
                        <div className="inputvacina">
                            <input {...register1("vacinado")} type="radio" value="primeira" /> Primeira &nbsp;
                            <input {...register1("vacinado")} type="radio" value="primeiraSegunda" /> Primeira e segunda &nbsp;
                            <input {...register1("vacinado")} type="radio" value="doseUnica" /> Dose única &nbsp;
                            <input {...register1("vacinado")} type="radio" value="reforco3Dose" /> Reforço terceira dose &nbsp;
                            <input {...register1("vacinado")} type="radio" value="naoVacinado" /> Não é vacinado &nbsp;
                        </div>
                    </div>
                </div>

                <div className="btn-starquest">
                    <button type = "submit">Próximo</button>
                </div>
                
                </form>
            </div>
            }
                {/* FIM DA PRIMEIRA PARTE DO QUESTIONARIO */}
                {   primeiraParte && !segundaParte &&
                    <div className="formAreaQuest" >

                        <div className="Description-quest">
                            <h3>APÊNDICE</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>
                       
                        <div className="Info-quest">
                            <p>Questionário telefônico dos casos Confirmados</p>
                            <p>Saúde do entrevistado - Parte 2</p>
                        </div>
            
                        <form className='formquest' onSubmit = {handleSubmit2(onSecondSubmit)}>
                            <div className="espacamentoum">
                                <div className="datadiagnostico">
                                    Data do diagnóstico
                                    <div className="inputdatadiagnostico">
                                        <input {...register2("dataDiagnostico")} type = "date"/>
                                    </div>
                                </div>
                                
                                <div className="inicioSintomas"> 
                                início dos sintomas
                                    <div className="inputInicio">
                                        <input {...register2("inicioSintomas")} type = "date"/>
                                    </div>
                                </div>  
                            </div>
                            <div className="espacamentodois">
                                <div className="localdiagnostico"> 
                                    <select {...register2("ondeDiagnostico")}>
                                        <option value="">Onde obteve Diagnóstico</option>
                                        <option value="ubs">Unidade Básica de Saúde(UBS)</option>
                                        <option value="ufop">UFOP</option>
                                        <option value="upa">Unidade de Pronto Atendimento</option>
                                        <option value="hospital">Hospital</option>
                                        <option value="planoSaude">Plano de Saúde</option>
                                        <option value="empresas">Empresas</option>
                                        <option value="outro">Outro...</option>
                                    </select>
                                </div>
                                <div className="tipoTeste">
                                    <select {...register2("testeRealizado")}>
                                        <option value="">Teste Realizado</option>
                                        <option value="anticorpo">Teste Rápido - Anticorpo</option>
                                        <option value="antigeno">Teste Rápido - Antigeno</option>
                                        <option value="sorologico">Sorológico</option>
                                        <option value="pcr">PCR</option>
                                        <option value="naoSabe">Não se sabe</option>
                                    </select>
                                </div>

                                
                                <div className="cidadeExame">
                                    <select {...register2("cidadeExame")}>
                                        <option value="">Cidade Exame...</option>
                                        <option value="ouroPreto">Ouro Preto</option>
                                        <option value="joaoMonlevade">João Monlevade</option>
                                        <option value="mariana">Mariana</option>
                                        <option value="beloHorizonte">Belo Horizonte</option>
                                        <option value="outra">Outra...</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sintomas">
                                sintomas
                                <div className="inputSintomas">
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="febre" /> febre &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="dispineia" /> dispineia &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="dorGarganta" /> dor de garganta &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="dorCabeca" /> dor de cabeça &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="tosse" /> tosse &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="coriza" /> coriza &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="perdaOlfato" /> perda do olfato &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="perdaPaladar" /> perda do paladar &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintomas")} type="checkbox" value="nenhum" /> nenhum &nbsp;</div>
                                    </div>
                                </div>
                            </div>

                            <div className="internado"> 
                                internado? &nbsp;
                                <div>
                                    <input {...register2("internado")} type="radio" value="sim" /> sim &nbsp;
                                    <input {...register2("internado")} type="radio" value="nao" /> não &nbsp; 
                                </div>
                            </div>


                            <div className="condicoes">
                                Condições
                                <div className="inputCondicoes">
                                    <div className="espacamento">
                                    {/* <input {...register2("condicoes")} type="checkbox" value="obesidade" />  CALCULO DEVE SER FEITO*/}
                                        <div className="espacamentointerior"><input {...register2("condicao01")} type="checkbox" checked = {isObese}/> obesidade &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao02")} type="checkbox" />  diabetes &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao03")} type="checkbox" /> câncer &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao04")} type="checkbox" /> doença no fígado &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao05")} type="checkbox" /> doença nos rins &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao06")} type="checkbox" /> anemia &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao07")} type="checkbox" /> indígena &nbsp; </div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao08")} type="checkbox" /> doença cardíaca &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao09")} type="checkbox" /> doença pulmonar &nbsp; </div> 
                                        <div className="espacamentointerior"><input {...register2("condicao10")} type="checkbox" /> tranplante de órgão &nbsp; </div>  
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao11")} type="checkbox" /> doença cerebro vascular &nbsp; </div>
                                    </div>
                                </div>
                            </div>
                            {femaleGender &&
                                <div className="situacao">
                                Situação
                                <div className="inputSituacao">
                                    <input {...register2("situacao1")} type="checkbox" /> gestante &nbsp;
                                    <input {...register2("situacao2")} type="checkbox" /> puerpério &nbsp;
                                    <input {...register2("situacao3")} type="checkbox" /> nenhuma &nbsp;
                                </div>
                            </div>
                            }
                            <div className="estado">
                                Melhora ou Piora?
                                <div className="inputEstado">
                                    <div className="espacamento">
                                            <div className="espacamentointerior"><input {...register1("situacaoSintomas")} type="radio" value="melhora" /> Melhora &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register1("situacaoSintomas")} type="radio" value="piora" /> Piora &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register1("situacaoSintomas")} type="radio" value="semMudancas" /> Sem mudancas &nbsp; </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="estado">
                                Algum sintoma Grave?
                                <div className="inputEstado">
                                    <div className="espacamentoEstado">
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave1")} type="checkbox" /> Falta de ar &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave2")} type="checkbox" /> Sensação de desmaio &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave3")} type="checkbox" /> Confusão &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave4")} type="checkbox" /> Febre contínua &nbsp; </div>
                                    </div>
                                </div>
                            </div>  

                            <div className="btn-starquestone">
                                <button btn-starquestone type = "submit">Próximo</button>
                            </div>

                        </form>
                    </div>
                }
                { primeiraParte && segundaParte && !terceiraParte &&
                    <div className="formAreaQuest">
                                   
                        <div className="Description-quest">
                        <h3>APÊNDICE</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>

                        <div className="Info-quest">
                        <p>Questionário telefônico dos casos Confirmados</p>
                        <p>Contatos Próximos [Comunidade UFOP] - Parte 3</p>
                        </div> 
                        <div className="AreaForm3">

                            <div className="contato">
                                Houve contato próximo? &nbsp; <input type = "checkbox" onClick = {analyzeCloseContact}/> &nbsp; Sim
                            </div>
                                {houveContato &&
                                    <div>
                                        <form className='formquestcontato' onSubmit = {handleSubmit3(onThirdSubmit)}>
                                
                                            <input {...register3("nome")} type = "text" placeholder = "nome do contato"/>
                                            <input {...register3("telefone1")} type = "number" placeholder = "telefone de contato 1"/>
                                            <input {...register3("telefone2")} type = "number" placeholder = "telefone de contato 2"/>
                                        
                                    
                                            <select {...register3("relacao")} onClick = {analyzeRelation}>
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
                                                    <input {...register3("outraRelacao")} type = "text" placeholder = "tipo de relação"/>
                                                </div>
                                            }
                                            <div className="dataContato">
                                                Data do último contato
                                                <div className="inputDataContato">
                                                    <input {...register3("dataUltimoContato")} type = "date"/>
                                                </div>
                                            </div>
                                            <div className="btns">
                                                <button type = "submit" className="btn-finalizar">Cadastrar</button>
                                            </div>
                                        </form>
                                    </div>    
                                    
                                }
                            
                            <div className="realinharBotao">
                                <button onClick = {finishQuest}className="btn-finalizar" >Finalizar</button>
                            </div>
                        </div>
                    </div>
                }
                { terceiraParte &&
                    <div>
                        FIM DO QUESTIONÁRIO!
                        <button onClick = {submitData}>Enviar dados</button>
                    </div>
                }
        </div>
    );
}

// ALTERACOES RESTANTES

/*
    1. MODULARIZAR O CODIGO: CRIAR UM COMPONENTE PARA CADA PARTE DO QUESTIONARIO [ NAO VAI SER FEITO, POR HORA ]
    2. REVER TERCEIRA PARTE (BOTÃO DE ADICIONAR/NAO ADICIONAR) [ FALTA SÓ A LÓGICA DOS VETORES ]
    3. REVER FUNCOES CONDICIONAIS [ por hora, ok]
    3. ESTILIZAR A PAGINA [ feito ]
    4. REVER A FREQUENCIA DE ENTREVISTAS (CALCULO DEVE SER FEITO)
    5. PÁGINA HOME AINDA NÃO FUNCIONA
    6. REVER FLUXO DE DADOS
*/