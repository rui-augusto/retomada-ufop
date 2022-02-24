// QUESTIONARIO DE RETORNO

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInterviewed } from "../../context/interviewed";

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
            <form onSubmit = {handleSubmit(submitData)}>
                Realizou teste?
                <input {...register("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "sim"/>
                <input {...register("realizouTeste")} onClick = {analyzeTest} type = "radio" value = "nao"/>

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
                        Positivo<input {...register("resultadoTeste")} type = "radio" value = "positivo"/>
                        Negativo<input {...register("resultadoTeste")} type = "radio" value = "negativo"/><br/>
                    </div>
                }
                Sintomas:
                <input {...register("sintomas")} type = "checkbox" value = "dorCabeca"/>
                <input {...register("sintomas")} type = "checkbox" value = "tosse"/>
                <input {...register("sintomas")} type = "checkbox" value = "coriza"/>
                <input {...register("sintomas")} type = "checkbox" value = "perdaOlfato"/>
                <input {...register("sintomas")} type = "checkbox" value = "perdaPaladar"/>

                Outro(s) sintoma(s): <input {...register("outroSintoma")} type = "text" placeholder = "Sintoma(s)..."/>

                Melhora ou piora?

                <input {...register("situacaoSintomas")} type = "radio" value = "melhora" />
                <input {...register("situacaoSintomas")} type = "radio" value = "piora" />
                <input {...register("situacaoSintomas")} type = "radio" value = "semMudancas" />

                Teve contato?

                <input {...register("contatoProximo")} type = "radio" value = "sim" />
                <input {...register("contatoProximo")} type = "radio" value = "nao" />
                <button type = "submit">Finalizar</button>
            </form>

            {seContato &&
                <div>
                    <form onSubmit = {handleSubmit1(submitData)}>
                        <input {...register1("nomeCP")} type = "text" placeholder = "Nome do contato" />
                        <input {...register1("telCP")} type = "number" />
                        <button type = "submit">Enviar</button>
                    </form>
                </div>
            }
        </div>
    );
}