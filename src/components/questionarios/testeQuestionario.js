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
    const [recusa, setRecusa] = useState(false);
    const [bool, setBool] = useState(false);
    const [date, setDate] = useState(new Date());
    const finalSubmit = (data) => {
        console.log(data);
        setObjTeste(data);
        setBool(true);
        // PEGANDO DATA E HORARIO ATUAL
        var d = new Date().setHours(27,0,0);
        console.log(d);
        var dataUltimoContato = new Date(data.date).setHours(27,0,0);
        console.log(dataUltimoContato);
        // console.log(d.getTime());
        // PEGANDO DATA DO INPUT
    }

    const adicionaItens = () => {
        if (objTeste.checkteste1 == true){
            console.log("true");
        }
        if (objTeste.checkteste1 == "sim" || objTeste.checkteste3 == true){
            console.log("sim");
        }
    }


    return (
        <div>
            {/* <input {...register("checkteste1")} type = "checkbox" value = "sim" />
                <input {...register("checkteste2")} type = "checkbox" value = "sim" />
                <input {...register("checkteste3")} type = "checkbox" value = "sim" />
                <input {...register("checkteste4")} type = "checkbox" value = "sim" />

                <input {...register("dataTeste")} type = "date" />
                <button type = "submit">Enviar</button> */}

            
            <form onSubmit = {handleSubmit(finalSubmit)}>
                <input {...register("date")} type = "date" />
                <button type = "submit">Enviar</button>
            </form>
        </div>
    );
}