// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInterviewed } from "../context/interviewed" 


import "./style/Cadastro.css"; 
export const Cadastro = () => {

    const context = useInterviewed();

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

    const { register, handleSubmit } = useForm();

    const testing = (data) => {
        // console.log(data);
        const horarioAgora = (new Date().setHours(0,0,0) / 1000).toFixed(0);
        const inicioSintomas = (new Date(data.dtInicioSintomas).setHours(27,0,0) / 1000).toFixed(0);
        const nascimento = (new Date(data.dtNascimento).setHours(27,0,0) / 1000).toFixed(0);
        const diagnostico = (new Date(data.dtTeste).setHours(27,0,0) / 1000).toFixed(0);
        const objetoDados = {
            contTentativas: 0,
            cpf: data.cpf,
            dataInclusaoBanco: horarioAgora,
            dataInicioSintomas: inicioSintomas,
            dataNascimento: nascimento,
            dataProximaEntrevista: 0,
            dataTeste: diagnostico,
            dataUltimaMudancaSituacao: horarioAgora,
            entrevistador: "nenhum",
            entrevistasRealizadas: 0,
            frequenciaDiasMonitoramento: 2,
            log: "nenhum",
            logSituacao: "nenhum",
            nome: data.nome,
            obs: "nenhum",
            origem: "UFOP",
            quantidadeEntrevistas: 3,
            sexo: data.sexo,
            situacao: data.situacao,
            telefone: data.telefone,
            tipoTeste: data.tipoTeste
        }
        console.log(objetoDados);
        // context.registerConfirmedCase(objetoDados, data.cpf);
    }

    return(
        
        <div className = "fullContentArea">
            <div className = "headerArea"> {/* title */} 
                Cadastro de novos usuários ao banco de confirmados
            </div>
            
            <div> {/* register area*/}
                <form onSubmit = {handleSubmit(testing)}>
                    <input {...register("nome", {
                        required: true})} 
                        type = "text" 
                        placeholder = "Nome.."
                    /><br/>

                    {/* <input {...register("ocupacao", {
                        required: true})}
                        type = "text"
                        placeholder = "Ocupacao na UFOP..."
                    /><br/> */}

                    <input {...register("cpf", {
                        required: true})}
                        type = "number"
                        placeholder = "CPF..."
                    /><br/>

                    <input {...register("telefone", {
                        required: true})}
                        type = "number"
                        placeholder = "Telefone..."
                    /><br/>

                    <div>
                        Data de início de sintomas: <br/>
                        <input {...register("dtInicioSintomas", {
                            required: true})}
                            type = "date"
                            /><br/>
                    </div>

                    <div>
                        Data de nascimento: <br/>
                        <input {...register("dtNascimento", {
                            required: true})}
                            type = "date"
                            /><br/>
                    </div>

                    <div>
                        Data do diagnóstico: <br/>
                        <input {...register("dtTeste", {
                            required: true})}
                            type = "date"
                        /><br/>
                    </div>

                    <select {...register("tipoTeste", {
                        required: true
                    })}>
                        <option value = "">Teste realizado...</option>
                        <option value = "rapidoAntigeno">Teste rápido (antígeno)</option>
                        <option value = "swabNasofaringe">Swab de Nasofaringe</option>
                        <option value = "PCR">RT-PCR</option>
                    </select>

                    <div>
                        Masculino
                        <input {...register("sexo", {
                            required: true
                        })}
                        type = "radio"
                        value = "masculino"
                        />
                        Feminino
                        <input {...register("sexo", {
                            required: true
                        })}
                        type = "radio"
                        value = "feminino"
                        />
                        Outro
                        <input {...register("sexo", {
                            required: true
                        })}
                        type = "radio"
                        value = "outro"
                        />
                    </div>
                    <div>
                        Não Contato
                        <input {...register("situacao", {
                            required: true
                        })}
                        type = "radio"
                        value = "naoContato"
                        />
                        Expirado
                        <input {...register("situacao", {
                            required: true
                        })}
                        type = "radio"
                        value = "expirado"
                        />
                    </div>
                    {/* <div>
                        <br/><hr/>
                        <h1>Informações fixas</h1>
                        <ul>
                            <li>contTentativas 0</li>
                            <li>entrevitador nenhum</li>
                            <li>entrevistasRealizadas 0</li>
                            <li>frequenciaDiasMonitoramento 2</li>
                            <li>log nenhum</li>
                            <li>logSituacao nenhum</li>
                            <li>obs nenhum</li>
                            <li>origem UFOP</li>
                            <li>quantidadeEntrevistas 3</li>
                        </ul>
                        <br/><hr/>
                    </div> */}
                    <button type = "submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}


    /*

    const [nome, setNome] = useState("");
    const [ocupacao, setOcupacao] = useState("");
    const [cpf, setCpf] = useState(0);
    const [telefone, setTelefone] = useState(0);
    const [dataNascimento, setDataNascimento] = useState(0);
    const [dtInicioSintomas, setDtInicioSintomas] = useState(0);
    const [dtTeste, setDtTeste] = useState(0); // dataTeste 
    const [tipoTeste, setTipoTeste] = useState("");
    
    */

    // // // // // // // // // // // // // // // // // // // // // //
    // contagem de tentativas [contTentativas]
    // data de inclusao no banco [dataInclusaoBanco]
    // data da proxima entrevista [dataProximaEntrevista] = 0
    // data de ultima modificacao na situacao [dataUltimaMudancaSituacao] = dataAgora
    // entrevistador "null"
    // quantidade de entrevistas realizadas [entrevistasRealizadas] = 0
    // frequencia dos dias de monitoramento [frequenciaDiasMonitoramento] = 2
    // log "null"
    // log da situacao [logSituacao] "null"
    // observacao [obs] "null"
    // origem do caso [origem] = "UFOP"
    // quantidade total de entrevistas = [quantidadeEntrevistas] 3
    // sexo 
    // situacao -> naoContato, expirado
