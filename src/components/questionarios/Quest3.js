// QUESTIONARIO DE RETORNO

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInterviewed } from "../../context/interviewed";

import "./Quest3.css";

export const Quest3 = () => {
    
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

    const {
        register: register1,
        handleSubmit: handleSubmit1
    } = useForm();

    const [fezTeste, setFezTeste] = useState(false);
    const [seContato, setSeContato] = useState(false);

    const analyzeTest = (event) => {
        if (event.target.value == "sim"){
            setFezTeste(true);
        }else{
            setFezTeste(false);
        }
    }

    const analyzeContat = (data) => {
        if (data.contatoProximo == "sim"){
            setSeContato(true);
        }else{
            setSeContato(false);
        }
    }

    const submitData = (data) => {
        analyzeContat(data);
        console.log(data);

    }



    return (
        <div>
            <div className="fullArea">
                <form className='formAreaQuest'onSubmit = {handleSubmit(submitData)}>
                    
                    <div className="Description-quest">
                        <h3>APÊNDICE</h3> <p>Instrumento da Pesquisa</p>                       
                    </div>
                       
                    <div className="Info-quest">
                        <p>Questionário telefônico dos Casos Confirmados</p>
                        <p>Monitoramento</p>
                    </div>
            
                    <div className='testeRealizado'>
                        <div>
                            Realizou teste? &nbsp;
                            <input {...register("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "sim"/> Sim &nbsp;
                            <input {...register("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "nao"/> Não 
                        </div>
                    </div>

                    {fezTeste &&
                        <div className='fezTeste'>
                            <div>
                                <select {...register("testeRealizado")}>
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
                                <input {...register("resultadoTeste")} type = "radio" value = "positivo"/> Positivo &nbsp;
                                <input {...register("resultadoTeste")} type = "radio" value = "negativo"/> Negativo
                            </div>
                        </div>
                    }
                    
                    <div className="sintomas">
                        Apresentou algum desses sintomas?
                        <div className="inputSintomas">
                                <div className="espacamento">
                                    <div className="espacamentointerior"><input {...register("sintoma01")} type="checkbox" /> dor de cabeça &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register("sintoma02")} type="checkbox" /> tosse &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register("sintoma03")} type="checkbox" /> coriza &nbsp;</div>
                                </div>
                                <div className="espacamento">
                                    <div className="espacamentointerior"><input {...register("sintoma04")} type="checkbox" /> perda do olfato &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register("sintoma05")} type="checkbox" /> perda do paladar &nbsp;</div>
                                    <div className="espacamentointerior"><input {...register("sintoma06")} type="checkbox" /> nenhum &nbsp;</div>
                                </div>
                            </div>
                        </div>

                    <div className='outros'>
                        Outro(s) sintoma(s): &nbsp;
                        <input {...register("outroSintoma")} type = "text" placeholder = "Sintoma(s)..."/>
                    </div>

                    <div className='situacaoProximo'>
                        Melhora ou piora?  &nbsp;

                        <input {...register("situacaoSintomas")} type = "radio" value = "melhora" /> &nbsp;Melhora  &nbsp;
                        <input {...register("situacaoSintomas")} type = "radio" value = "piora" />&nbsp; Piora  &nbsp;
                        <input {...register("situacaoSintomas")} type = "radio" value = "semMudancas" /> &nbsp; Sem mudanças 
                    </div>

                    <div className='outros'>
                        Teve contato? &nbsp;
                        <input {...register("contatoProximo")} type = "radio" value = "sim" /> &nbsp; Sim &nbsp;
                        <input {...register("contatoProximo")} type = "radio" value = "nao" /> &nbsp; Não 
                    </div>
                    <div className='btn'>
                        <button className='btn-proximos' type = "submit">Finalizar</button>
                    </div>
                </form>
            </div>
            {seContato &&
                <div>
                    <form onSubmit = {handleSubmit1(submitData)}>
                        <input {...register1("nomeCP")} type = "text" placeholder = "Nome do contato" />
                        <input {...register1("telCP")} type = "number" />
                        
                        <button className='btn-proximos' type = "submit">Enviar</button>
                    </form>
                </div>
            }
        </div>
    );
}