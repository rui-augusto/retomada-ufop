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
        // const inicioSintomas = (new Date(data.dtInicioSintomas).setHours(27,0,0) / 1000).toFixed(0);
        const nascimento = (new Date(data.dtNascimento).setHours(27,0,0) / 1000).toFixed(0);
        const diagnostico = (new Date(data.dtTeste).setHours(27,0,0) / 1000).toFixed(0);
        const objetoDados = {
            contTentativas: 0,
            cpf: data.cpf,
            dataInclusaoBanco: horarioAgora,
            dataInicioSintomas: parseInt(data.dtInicioSintomas),
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
        context.registerConfirmedCase(objetoDados, data.cpf);
    }

    return(
        
        <div className = "fullscreenAreaCadastro">

            <div className = "headerAreaQuadrado"> {/* title */} 
                <div className = "headerArea">Cadastro de novos usuários ao banco de confirmados</div>
            </div>
            
            <div className='RegisterArea'> {/* register area*/}
                <form onSubmit = {handleSubmit(testing)}>
                    
                    <input className='infoCadastro'{...register("nome", {
                        required: true})} 
                        type = "text" 
                        placeholder = "Nome.."
                    /><br/>

                    {/* <input {...register("ocupacao", {
                        required: true})}
                        type = "text"
                        placeholder = "Ocupacao na UFOP..."
                    /><br/> */}

                    <input  className='infoCadastro' {...register("cpf", {
                        required: true})}
                        type = "number"
                        placeholder = "CPF..."
                    /><br/>

                    <input  className='infoCadastro' {...register("telefone", {
                        required: true})}
                        type = "number"
                        placeholder = "Telefone..."
                    /><br/>

                    <div>
                        <div className='descricaoCadastro'>data de início dos sintomas</div> 
                        <input className='infoDatas'{...register("dtInicioSintomas", {
                            required: true})}
                            type = "number"
                            /><br/>
                    </div>

                    <div>
                        <div className='descricaoCadastro'>data de nascimento </div>
                        <input className='infoDatas'{...register("dtNascimento", {
                            required: true})}
                            type = "date"
                        /><br/>
                    </div>

                    <div>
                        <div className='descricaoCadastro'>data do diagnóstico</div>
                        <input className='infoDatas'{...register("dtTeste", {
                            required: true})}
                            type = "date"
                        /><br/>
                    </div>

                    <select className='infoTeste'{...register("tipoTeste", {
                        required: true
                    })}>
                        <option value = "">Teste realizado...</option>
                        <option value = "rapidoAntigeno">Teste rápido (antígeno)</option>
                        <option value = "swabNasofaringe">Swab de Nasofaringe</option>
                        <option value = "PCR">RT-PCR</option>
                        <option value = "naoSabe">Não Sabe</option>
                    </select>

                    <div className='inputCadastro'>
                        <div className='inputCadastro'>
                            <input  {...register("sexo", {
                                required: true
                            })}
                            type = "radio"
                            value = "masculino"
                            /> 
                            <div className='descricaoInput'>Masculino</div>
                        </div>
                        
                        <div className='inputCadastro'>
                            <input {...register("sexo", {
                                required: true
                            })}
                            type = "radio"
                            value = "feminino"
                            />
                            <div className='descricaoInput'>Feminino</div>
                            
                        </div>

                        <div className='inputCadastro'>
                            <input {...register("sexo", {
                                required: true
                            })}
                            type = "radio"
                            value = "outro"
                            />
                            <div className='descricaoInput'>Outro</div>
                        </div>
                    </div>
                    <div className='inputCadastro'>
                        <input {...register("situacao", {
                            required: true
                        })}
                        type = "radio"
                        value = "naoContato"
                        />
                        Não Contato <h></h><h></h><h></h><h></h>
                        <input {...register("situacao", {
                            required: true
                        })}
                        type = "radio"
                        value = "expirado"
                        />
                        Expirado
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
                    <div className='buttonCadastroEspaco'><button className="buttonCadastro" type = "submit">Cadastrar</button></div>
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
