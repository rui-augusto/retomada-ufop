import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import {moment} from 'moment';

export const TesteQuestionario = () => {

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

    const [objTeste, setObjTeste] = useState({});
    const [bool, setBool] = useState(false);

    const finalSubmit = (data) => {
        console.log(data);
        setObjTeste(data);
        setBool(true);
        console.log(data);
        console.log(data.dataTeste);
        // PEGANDO DATA E HORARIO ATUAL
        var d = new Date().setHours(27,0,0);
        console.log(d);
        // console.log(d.getTime());
        // PEGANDO DATA DO INPUT
        var e = new Date(data.dataTeste).setHours(27,0,0);
        console.log("DATA DO INPUT: ",e);
        setObjTeste(data);
    }

    const adicionaItens = () => {
        objTeste.teste = "teste ao fim"
        console.log(objTeste);
    }
    
    return (
        <div>
            <form onSubmit = {handleSubmit(finalSubmit)}>
                <input {...register("checkteste1")} type = "checkbox" value = "sim" />
                <input {...register("checkteste2")} type = "checkbox" value = "sim" />
                <input {...register("checkteste3")} type = "checkbox" value = "sim" />
                <input {...register("checkteste4")} type = "checkbox" value = "sim" />

                <input {...register("dataTeste")} type = "date" />
                <button type = "submit">Enviar</button>
            </form>
            {bool &&
                <div>
                    TESTANDO KK
                    <SimpleDateTime format="DMY">{objTeste.dataTeste}</SimpleDateTime>
                    <button onClick = {adicionaItens}>Teste</button>
                </div>
            }

        </div>
    );
}