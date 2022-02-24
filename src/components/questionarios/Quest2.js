// MONITORAMENTO DE CONTATO PROXIMO

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useInterviewed } from "../../context/interviewed";


export const Quest2 = () => {

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

    const changeQuest = () => {
        setMudarQuest(true);
    }

    const continueQuest = () => {
        setMudarQuest(false);
    }

    const submitData = (data) => {
        console.log(data);
    }
    return (
        <div>
            <div>
                Códigos: ####<br/>
            </div>
            <div>
                <form onSubmit = {handleSubmit(submitData)}>
                    Nome do(a) entrevistado(a): <input {...register("nome")} type = "text" placeholder = "Nome do entrevistado"/><br/>

                    Relação com o caso:
                    <select {...register("relacao")} onClick = {analyzeRelation}>
                        <option value = "">Selecione...</option>
                        <option value = "domiciliar">Domiciliar</option>
                        <option value = "familiar">Familiar (extradomiciliar)</option>
                        <option value = "laboral">Laboral</option>
                        <option value = "estudantil">Estudantil</option>
                        <option value = "eventoSocial">Evento social</option>
                        <option value = "outro">Outro</option>
                    </select>
                    {outraRelacao &&
                        <input {...register("outraRelacao")} type = "text" placeholder = "Especificar outra relação"/>
                    }

                    <br/>Data do último contato: <input {...register("ultimoContato")} type = "date"/><br/>

                    Tem vínculo com a UFOP?
                    <input {...register("relacaoUfop")} onClick = {analyzeUfop} type="radio" value="sim" />
                    <input {...register("relacaoUfop")} onClick = {analyzeUfop} type="radio" value="nao" />
                    {fazParteUfop &&
                        <div>
                            <select {...register("ocupacao")} onChange = {analyzeOccupation}>
                                <option value = "">Ocupacao...</option>
                                <option value = "estudante">Estudante</option>
                                <option value = "docente">Docente</option>
                                <option value = "tecnicoAdm">Técnico Admnistrativo em Educação</option>
                                <option value = "prestadorServico">Prestador de serviços</option>
                            </select>
                            {estudante &&
                                <div>
                                    <input {...register("nomeCurso")} type = "text" placeholder = "Nome do curso"/>
                                </div>
                            }
                            {docente &&
                                <div>
                                Unidade
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
                                Setor
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
                    }

                    Realizou teste?
                    <input {...register("realizouTeste")} onClick = {analyzeTest} type="radio" value="sim" />
                    <input {...register("realizouTeste")} onClick = {analyzeTest} type="radio" value="nao" />
                    {fezTeste &&
                        <div>
                            <select {...register("testeRealizado")}>
                                    <option value = "">Teste Realizado...</option>
                                    <option value = "anticorpo">Teste Rápido - Anticorpo</option>
                                    <option value = "antigeno">Teste Rápido - Antigeno</option>
                                    <option value = "sorologico">Sorológico</option>
                                    <option value = "pcr">PCR</option>
                                    <option value = "naoSabe">Não sei...</option>
                            </select>
                            Resultado do teste:
                            Positivo<input {...register("resultadoTeste")} onClick = {changeQuest}type = "radio" value = "positivo"/>
                            Negativo<input {...register("resultadoTeste")} type = "radio" value = "negativo"/><br/>
                            {mudarQuest &&
                                <div>
                                    <button type = "submit">Mudar questionário</button>
                                    <button onClick = {continueQuest}>Continuar aqui</button>
                                </div>    
                            }
                            Sintomas
                            <input {...register("sintomas")} type = "checkbox" value = "febre" />
                            <input {...register("sintomas")} type = "checkbox" value = "dispineia" />
                            <input {...register("sintomas")} type = "checkbox" value = "dorGarganta" />
                            <input {...register("sintomas")} type = "checkbox" value = "dorCabeca" />
                            <input {...register("sintomas")} type = "checkbox" value = "tosse" />
                            <input {...register("sintomas")} type = "checkbox" value = "coriza" />
                            <input {...register("sintomas")} type = "checkbox" value = "perdaOlfato" />
                            <input {...register("sintomas")} type = "checkbox" value = "perdaPaladar" />
                            <input {...register("sintomas")} type = "checkbox" value = "nenhum" />
                            {/* CONSERTAR A ORDEM (OS SINTOMAS DEVEM APARECER MESMO NAO TENDO REALIZADO TESTE) */}
                        </div>
                    }
                    <button type = "submit">Finalizar Questionário</button>
                </form>
            </div>
        </div>
    );
}