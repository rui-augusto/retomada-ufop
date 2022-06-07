import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useInterviewed } from "../../context/interviewed";
import { useUser } from "../../context/user";

// componentes
import { Bloco } from "../orientacoes/Bloco";

import "./Quest.css";
import { useParams } from "react-router-dom";

export const Quest = () => {

    const context = useInterviewed();
    const contextUser = useUser();
    const { cpf, nome } = useParams();
    console.log(cpf, nome);
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
        handleSubmit: handleSubmit3,
        reset: reset
    } = useForm();
    
    // STATES USADOS PARA AS PERGUNTAS QUE DEPENDEM DE OUTRAS PERGUNTAS
    const [femaleGender, setFemaleGender] = useState(false);
    const [estudante, setEstudante] = useState(false);
    const [docente, setDocente] = useState(false);
    const [pSaude, setPSaude] = useState(false);
    const [foiVacinado, setFoiVacinado] = useState(false);
    const [outraRelacao, setOutraRelacao] = useState(false);
    const [houveContato, setHouveContato] = useState(false);

    // OBJETOS QUE GUARDAM CADA PARTE DO QUESTIONARIO
    // false ---> NÃO CONCLÚIDO
    // true  ---> CONCLUÍDO
    const [primeiraParte, setPrimeiraParte] = useState(false);
    const [objPrimeiraParte, setObjPrimeiraParte] = useState({});
    const [segundaParte, setSegundaParte] = useState(false);
    const [objSegundaParte, setObjSegundaParte] = useState({});
    const [terceiraParte, setTerceiraParte] = useState(false);
    const [objDadosFinais, setObjDadosFinais] = useState({});

    // CALCULOS INFORMACIONAIS
    const [isObese, setIsObese] = useState(false);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    // CONTROLE DE DADOS FIREBASE
    const [frequencia, setFrequencia] = useState(2);
    const [qtdEntrevistas, setQtdEntrevistas] = useState(3);
    const [situacaoCritica, setSituacaoCritica] = useState(false);
    const [orientacaoEspecifica, setOrientacaoEspecifica] = useState(false);


    // SETTANDO PESO E ALTURA EM STATES
    const infoHeight = (event) => {
        setHeight((event.target.value) / 100);
    };

    const infoWeight = (event) => {
        setWeight(event.target.value);
    }

    // AO FINALIZAR A PRIMEIRA PARTE DO QUESTIONARIO, O IMC EH CALCULADO
    useEffect(async () => {
        if (height != 0 && weight != 0){
            let imc = weight / (height * height);
            if (imc > 40){
                setIsObese(true);
            }
            console.log("imc = ", imc);
        }
    }, [objPrimeiraParte]);

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

    const analyzeGuidance = () => {
        if (objSegundaParte.situacaoSintomas == "piora"){
            setOrientacaoEspecifica(true);
        }
    }

    // FUNCOES QUE ANALISAM A FREQUENCIA DAS ENTREVISTAS
    function analyzeFrequency(){
        if (objSegundaParte.condicao01 == "sim" || objSegundaParte.condicao02 == "sim" || objSegundaParte.condicao03 == "sim" ||
            objSegundaParte.condicao04 == "sim" || objSegundaParte.condicao05 == "sim" || objSegundaParte.condicao06 == "sim" ||
            objSegundaParte.condicao07 == "sim" || objSegundaParte.condicao08 == "sim" || objSegundaParte.condicao09 == "sim" ||
            objSegundaParte.condicao10 == "sim" || objSegundaParte.condicao11 == "sim"){
                return true;
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
        const obj = Object.assign({}, objPrimeiraParte, data);

        setObjDadosFinais(obj);
        setSegundaParte(true);

    }

    const onThirdSubmit = (data) => {
        dadosContatoProximo(data);
        // alert("Contato Próximo cadastrado com sucesso!");
        reset();
    }

    // FUNCAO QUE TERMINA O QUESTIONARIO

    const finishQuest = () => {
        setTerceiraParte(true);
        analyzeGuidance();
        analyzeFrequency();
        submitData();
    }

    // FUNCAO QUE ENVIA TODOS OS DADOS DO QUESTIONARIO PRINCIPAL AO FIREBASE
    const submitData = async () => {
        await context.registerPositiveInterviewed(objPrimeiraParte.cpf, objDadosFinais);

        const nascimento = new Date(objPrimeiraParte.nascimento).setHours(27,0,0) / 1000;
        const diagnostico = new Date(objSegundaParte.dataDiagnostico).setHours(27,0,0) / 1000;
        const inicioSintomas = new Date(objSegundaParte.inicioSintomas).setHours(27,0,0) / 1000;
        console.log(nascimento, diagnostico, inicioSintomas);
        const updates = {};

        updates['/RespostasQuestionario3/' + objPrimeiraParte.cpf + '/objetoDados/nascimento'] = nascimento;
        updates['/RespostasQuestionario3/' + objPrimeiraParte.cpf + '/objetoDados/dataDiagnostico'] = diagnostico;
        updates['/RespostasQuestionario3/' + objPrimeiraParte.cpf + '/objetoDados/inicioSintomas'] = inicioSintomas;

        await context.changeData(updates);

        // atualizar dados confirmado

        
        await dadosConfirmado();

        await context.addQtdEntrevistaConfirmado(cpf);
    }

    const dadosConfirmado = async () => {
        await context.changeSituation(objPrimeiraParte.cpf);
        const dataHorarioAgora = (new Date().setHours(0,0,0) / 1000).toFixed(0);
        const date = new Date();

        const email = contextUser.user.email;

        const updatesC = {};
        if (objSegundaParte.condicao01 == "sim" || objSegundaParte.condicao02 == "sim" || objSegundaParte.condicao03 == "sim" ||
            objSegundaParte.condicao04 == "sim" || objSegundaParte.condicao05 == "sim" || objSegundaParte.condicao06 == "sim" ||
            objSegundaParte.condicao07 == "sim" || objSegundaParte.condicao08 == "sim" || objSegundaParte.condicao09 == "sim" ||
            objSegundaParte.condicao10 == "sim" || objSegundaParte.condicao11 == "sim"){
                updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/dataProximaEntrevista/'] = parseInt(dataHorarioAgora) + 86400;
                updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/quantidadeEntrevistas/'] = 5;
                updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/frequenciaDiasMonitoramento/'] = 1;
            }
        else{
            updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/dataProximaEntrevista/'] = parseInt(dataHorarioAgora) + 172800;
        }


        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/contTentativas/'] = 0;
        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/dataUltimaMudancaSituacao/'] = dataHorarioAgora;

        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/entrevistador/'] = email;
        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/tipoTeste/'] = objSegundaParte.testeRealizado;
        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/sexo/'] = objPrimeiraParte.genero;

        updatesC['/Confirmados/' + objPrimeiraParte.cpf + '/objetoDados/log/'] = `${email} entrevistou em ${date}`;
        await context.changeData(updatesC);

    }

    const dadosContatoProximo = async (data) => {
        console.log("DADOS CONTATO PROXIMO: ", data);
        const dataHorarioAgora = new Date().setHours(0,0,0) / 1000;
        var dataUltimoContato = new Date(data.dataUltimoContato).setHours(27,0,0) / 1000;
        var proxEntrevista = (dataHorarioAgora) + 172800;
        if (data.telefone2 == ""){
            data.telefone2 = null;
        }

        const contadorContatosProximos = await context.countingCloseContacts();
        console.log(contadorContatosProximos);

        const objContatoProximo = {
            contTentativas: 0,
            dataInclusaoBanco: dataHorarioAgora,
            dataNascimento: 0,
            dataProximaEntrevista: proxEntrevista,
            dataUltimaMudancaSituacao: dataHorarioAgora,
            dataUltimoContato: dataUltimoContato,
            entrevistador: contextUser.user.email,
            fezTeste: "NULL",
            idUnicoGeradorDoContato: objPrimeiraParte.cpf,
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

        await context.registerCloseContacts(objContatoProximo);
    }

    // FUNCOES QUE VOLTAM PARA A PARTE ANTERIOR DO QUESTIONARIO

    const returnFirstPart = () => {
        setPrimeiraParte(false);
    }

    const returnSecondPart = () => {
        setSegundaParte(false);
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
                    <p>Monitoramento de casos confirmados para o COVID-19</p>
                    <p>Dados básicos do entrevistado - Parte 1 de 3</p>
                </div>
                    
                <form onSubmit = {handleSubmit1(onFirstSubmit)} className='firstform'>
                    
                    <div >
                        <div className="AlinhamentoQuestionarioUm">
                            <input className="inputquest"{...register1("nome", {required: true})} value = {nome} type = "text" placeholder = "Nome"/>
                            <input className="inputquest" {...register1("cpf")} value = {cpf} type = "number" placeholder = "CPF"/>
                            <select className='inputquest' {...register1("raca")} >
                                <option value="">Cor</option>
                                <option value="branca">Branca</option>
                                <option value="preta">Preta</option>
                                <option value="amarela">Amarela</option>
                                <option value="parda">Parda</option>
                                <option value="indigena">Indigena</option>
                            </select>
                            <input className="inputquest"{...register1("nomeMae", {required: true})} type = "text" placeholder = "Nome da mãe"/>
                            
                    
                        </div>

                        <div className="AlinhamentoQuestionarioUm">
                            <input className="inputquest"{...register1("cidade")} type = "text" placeholder = "Cidade"/>
                            <input className="inputquest"{...register1("bairro")} type = "text" placeholder = "Bairro"/>
                            <input className="inputquest"{...register1("rua")} type = "text" placeholder = "Rua"/>
                            <input className="inputquest"{...register1("numCasa")} type = "text" placeholder = "Número"/>

                            

                        </div>    

                        <div className="AlinhamentoQuestionarioUm">
                            
                            <div className="separacaoInput">
                            <input className="inputquest"{...register1("complemento")} type = "text" placeholder = "Complemento"/>
                            
                            
                            <input className="inputquest"{...register1("altura", {required: true})} onChange = {infoHeight} type = "number" placeholder = "Altura"/>
                            <input className="inputquest"{...register1("peso", {required: true})} onChange = {infoWeight} type = "number" placeholder = "Peso"/>

                            </div>

                            <div className="birthdate">
                                Data de nascimento
                                <input {...register1("nascimento")} type = "date"/>
                            </div>
                        </div>

                            <div className="colunaSaudeGenero">
                                    <div className="gender">
                                        Com qual gênero se identifica? &nbsp; 
                                            <input {...register1("genero")} type="radio" value="masculino" onClick = {analyzeGender}/>&nbsp;  M &nbsp; 
                                            <input {...register1("genero")} type="radio" value="feminino" onClick = {analyzeGender}/>&nbsp;  F &nbsp; 
                                            <input {...register1("genero")} type="radio" value="outro" onClick = {analyzeGender}/>&nbsp;  Outro 
                                    </div>
                                    
                                    <div className="profsaude">
                                        Profissional de saúde? &nbsp;
                                            <input {...register1("profissionalSaude")} type="radio" value="sim" onClick = {analyzeProfession}/> &nbsp; Sim &nbsp;
                                            <input {...register1("profissionalSaude")} type="radio" value="nao" onClick = {analyzeProfession}/> &nbsp; Não &nbsp;
                                    </div>
                                </div>
                                { pSaude &&
                                    <input className="checkprof" {...register1("profissao")} type = "text" placeholder = "Profissão" />
                                }
                    
                                <div className="optionProf">
                                    <select {...register1("ocupacao")} onChange = {analyzeOccupation}>
                                        <option value="">Ocupação</option>
                                        <option value="estudante">Estudante</option>
                                        <option value="docente">Docente</option>
                                        <option value="tecnicoAdm">Técnico Admnistrativo em Educação</option>
                                        <option value="prestadorServico">Prestador de serviços</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                                {/* FAZER O CSS DESSA DIV ABAIXO */}
                                <div className="optionProf">
                                    <select {...register1("localAtividade")}>
                                        <option value="">Local de Atividade</option>
                                        <option value="ouroPreto">Ouro Preto</option>
                                        <option value="mariana">Mariana</option>
                                        <option value="joaoMonlevade">João Monlevade</option>
                                    </select>
                                </div>
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
                                        <option value="laboratorio">Laboratório</option>
                                        <option value="outros">Outra</option>
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
                                Vacina: 
                                    <div className="inputvacina">
                                        <input {...register1("vacinado")} type="radio" value="doseUnica" /> Dose única &nbsp;
                                        <input {...register1("vacinado")} type="radio" value="primeira" /> Primeira dose &nbsp;
                                        <input {...register1("vacinado")} type="radio" value="primeiraSegunda" /> Primeira e segunda dose&nbsp; <br></br>
                                        <div className="inputvacina2">
                                            <input {...register1("vacinado")} type="radio" value="terceiraDose" /> Terceira dose &nbsp;
                                            <input {...register1("vacinado")} type="radio" value="reforco4Dose" /> Reforço quarta dose &nbsp;
                                            <input {...register1("vacinado")} type="radio" value="naoVacinado" /> Não é vacinado &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-starquest">
                                <button className="btn-start1" type = "submit">Próximo</button>
                            
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
                            <p>Monitoramento de casos confirmados para o COVID-19</p>
                            <p>Saúde do entrevistado - Parte 2 de 3</p>
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
                                Você apresenta algum desses sintomas?
                                <div className="inputSintomas">
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintoma01")} type="checkbox" /> Febre &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma02")} type="checkbox" /> Dispineia &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma03")} type="checkbox" /> Dor de garganta &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintoma04")} type="checkbox" /> Dor de cabeça &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma05")} type="checkbox" /> Tosse &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma06")} type="checkbox" /> Coriza &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("sintoma07")} type="checkbox" /> Perda do olfato &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma08")} type="checkbox" /> Perda do paladar &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("sintoma09")} type="checkbox" /> Nenhum &nbsp;</div>
                                    </div>
                                </div>
                            </div>

                            <div className="internado"> 
                                Você teve que ser internado? &nbsp;
                                <div>
                                    <input {...register2("internado")} type="radio" value="sim" /> Sim &nbsp;
                                    <input {...register2("internado")} type="radio" value="nao" /> Não &nbsp; 
                                </div>
                            </div>


                            <div className="condicoes">
                                Você apresenta alguma dessas condições?
                                <div className="inputCondicoes">
                                    <div className="espacamento">
                                    {/* <input {...register2("condicoes")} type="checkbox" value="obesidade" />  CALCULO DEVE SER FEITO*/}
                                        <div className="espacamentointerior"><input {...register2("condicao01")} type="checkbox" value = "sim" checked = {isObese}/> obesidade &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao02")} type="checkbox" value = "sim" /> Diabetes &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao03")} type="checkbox" value = "sim" /> Câncer &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao04")} type="checkbox" value = "sim" /> Doença no fígado &nbsp;</div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao05")} type="checkbox" value = "sim" /> Doença nos rins &nbsp;</div>
                                        <div className="espacamentointerior"><input {...register2("condicao06")} type="checkbox" value = "sim" /> Anemia &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao07")} type="checkbox" value = "sim" /> Indígena &nbsp; </div>
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao08")} type="checkbox" value = "sim" /> Doença cardíaca &nbsp; </div>
                                        <div className="espacamentointerior"><input {...register2("condicao09")} type="checkbox" value = "sim" /> Doença pulmonar &nbsp; </div> 
                                        <div className="espacamentointerior"><input {...register2("condicao10")} type="checkbox" value = "sim" /> Tranplante de órgão &nbsp; </div>  
                                    </div>
                                    <div className="espacamento">
                                        <div className="espacamentointerior"><input {...register2("condicao11")} type="checkbox" value = "sim" /> Doença cerebro vascular &nbsp; </div>
                                    </div>
                                </div>
                            </div>
                            {femaleGender &&
                                <div className="situacao">
                                Situação
                                <div className="inputSituacao">
                                    <input {...register2("situacao1")} type="radio" /> Gestante &nbsp;
                                    <input {...register2("situacao2")} type="radio" /> Puerpério &nbsp;
                                    <input {...register2("situacao3")} type="radio" /> Nenhuma &nbsp;
                                </div>
                            </div>
                            }
                            <div className="estado">
                                Houve melhora ou piora dos sintomas?
                                <div className="inputEstado">
                                    <div className="espacamento">
                                            <div className="espacamentointerior"><input {...register2("situacaoSintomas")} type="radio" value="melhora" /> Melhora &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("situacaoSintomas")} type="radio" value="piora" /> Piora &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("situacaoSintomas")} type="radio" value="semMudancas" /> Sem mudancas &nbsp; </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="estado">
                                Algum desses outros sintomas?
                                <div className="inputEstado">
                                    <div className="espacamentoEstado">
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave1")} type="checkbox" /> Falta de ar &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave2")} type="checkbox" /> Sensação de desmaio &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave3")} type="checkbox" /> Confusão &nbsp; </div>
                                            <div className="espacamentointerior"><input {...register2("sintomasGrave4")} type="checkbox" /> Febre contínua &nbsp; </div>
                                    </div>
                                </div>
                            </div>  

                            <div className="btn-starquest">
                                <button className="btn-start1" onClick = {returnFirstPart}>Voltar</button>
                                <button className="btn-start1" type = "submit">Próximo</button>
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
                        <p>Monitoramento de casos confirmados para o COVID-19</p>
                        <p>Contatos Próximos - Parte 3 de 3</p>
                        </div> 

                        <div className="AreaForm3">

                        <div className="DefinicaoContato">
                                <div className="TituloDefinicao"><h4>DEFINIÇÃO DE CONTATO PRÓXIMO</h4></div>
                                
                                <br/>É qualquer pessoa que esteve em contato próximo a um caso confirmado de COVID-19 durante o seu período de transmissibilidade,
                                ou seja, entre 02 dias antes e 10 dias após a data de início dos sinais e/ou sintomas do caso confirmado:
                                
                                <li>Esteve a menos de um metro de distância, por um período mínimo de 15 minutos, com um caso confirmado;</li>
                                <li>Teve um contato físico direto (por exemplo, apertando as mãos) com um caso confirmado;</li>
                                <li>Seja contato domiciliar ou residente na mesma casa/ambiente de um caso confirmado.</li>
                        </div>
                        <div className="contato">
                            Houve contato próximo? &nbsp; <input type = "checkbox" onClick = {analyzeCloseContact}/> &nbsp; Sim
                        </div>
                            {houveContato &&
                                <div>
                                    <form className='formquestcontato' onSubmit = {handleSubmit3(onThirdSubmit)}>
                                    <div className="vinculoUFOP">
                                        Possui vínculo com a UFOP? &nbsp; <input {...register3("vinculoUFOP")} type = "checkbox" required/> &nbsp; Sim
                                    </div>
                                        <input {...register3("nome")} type = "text" placeholder = "nome do contato"/>
                                        <input {...register3("telefone1")} type = "number" placeholder = "telefone de contato 1" required/>
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
                                            Data do último contato com o caso confirmado
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
                                <button onClick={returnSecondPart} className="btn-finalizar" >Voltar</button>
                                <button onClick={finishQuest} className="btn-finalizar" >Finalizar</button>
                            </div>
                            <div className="realinharBotao">
                            </div>
                        </div>
                    </div>
                }
                { terceiraParte &&
                    <div>
                        <Bloco cpf = {objPrimeiraParte.cpf} orientacao={orientacaoEspecifica}/>
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