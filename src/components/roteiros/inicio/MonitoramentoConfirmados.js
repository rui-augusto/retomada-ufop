import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useUser } from "../../../context/user";
import { useInterviewed } from "../../../context/interviewed";

import "../../style/Roteiros.css"

export const RoteiroMonitoramentoConfirmados = () => {

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

    const contextUser = useUser();
    const context = useInterviewed();

    const { cpf } = useParams();

    const [recusa, setRecusa] = useState(false);
    const [desfecho, setDesfecho] = useState(false);

    const recusaEntrevista = (event) => {
        if (event.target.checked == true){
            setRecusa(true);
        } else{
            setRecusa(false);
        }
    };

    const desfechoEntrevista = (event) => {
        if (event.target.checked == true){
            setDesfecho(true);
        } else{
            setDesfecho(false);
        }
    };


    const navigate = useNavigate();

    const enviaRecusa = async (data) => {
        console.log(data);
        var dataHorarioAgora = new Date().setHours(0,0,0) / 1000;
        var entrevistador = contextUser.user.email;

        var nome = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/nome`);
        var origem = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/origem`);
        var telefone = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/telefone`);

        const obj = {
            dtInclusaoBanco: dataHorarioAgora,
            entrevistador: entrevistador,
            idUnico: cpf,
            motivoRejeicao: data.motivoRejeicao,
            nome: nome,
            obs: data.obs,
            origem: origem,
            telefone: telefone
        }   
        context.refusalQuest(cpf, obj);
        navigate(`/home/${contextUser.user.uid}`);
    }

    const enviaDesfecho = async (data) => {
        const updates = {};

        var entrevistador = contextUser.user.email;
        var dataAgora = new Date();

        updates['/Confirmados/' + cpf + '/objetoDados/situacao'] = data.desfecho;
        updates['/Confirmados/' + cpf + '/objetoDados/entrevistador'] = entrevistador;
        updates['/Confirmados/' + cpf + '/objetoDados/logSituacao'] = `${entrevistador} alterou a situação para ${data.desfecho} em ${dataAgora}`;
        updates['/Confirmados/' + cpf + '/objetoDados/obs'] = data.obs;
        
        await context.changeData(updates);
    }

    const mudaPagina = () => {
        navigate(`../../questionario3/${cpf}`);
    }


    return( 

        <div>

            <body className="fullscreenArea-questions" onSubmit={handleSubmit}> 
            
            <div className="content-questions" >
                            <div className="InputArea">

                                <div className='line-questions'>
                                    <div className='input-questions'>
                                        <input 
                                        type="text"
                                        name="nome"
                                        value={contextUser.user.name}
                                        placeholder="Nome do Entrevistador"
                                        />
                                    </div>

                                    <div className='input-questions'>
                                        <input
                                        type="date"
                                        name="data"
                                        placeholder="Data"
                                        />
                                    </div>
                                
                                    <div className='input-questions'>
                                        <input
                                        type="time"
                                        name="hora"
                                        placeholder="Hora"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className="DescriptionArea">
                        <div className="Description">
                            <h3>APÊNDICE D</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>

                        <div className="Info">
                            <p>Monitoramento de casos confirmados para o COVID-19</p>
                            <p>Questionário telefônico</p>
                        </div>
                   
                        <div className="textArea">   
                            <p className="pTextArea">Bom dia/Boa tarde! </p><hr/>
                            <div className="TextAreaInfo1">
                                Confirmar se quem atendeu é o entrevistado. Caso não, perguntar se pode chamar.
                            </div>
                            
                            <div className="internedcheckArea">
                                <div>Caso o entrevistado não queira ser entrevistado,
                                assinalar: &nbsp;                     
                                </div>
                            </div>
                              

                            <div className="TextAreaInfo"> </div>
                                <p>Agradecer e encerrar a ligação.</p>
                                <br></br>
                                Caso o o entrevistado concordar em realizar a entrevista:<p></p><br></br> Meu nome é {contextUser.user.name}, sou entrevistador(a) da Universidade Federal de Ouro Preto e, 
                                conforme combinado na última ligação, estamos retornando para saber como tem passado. 
                                Podemos conversar?
                                <p>Irei fazer algumas perguntas novamente, mas dessa vez será mais rápido.</p>
                                <p>Vamos começar?</p><br/>

                                <div className="recusa">
                                <div>
                                    <label className="internedCheckArea-btn">
                                    <input 
                                        type='checkbox' 
                                        name='recusa' 
                                        value='recusa'
                                        onClick = {recusaEntrevista}
                                        />  
                                        &nbsp; Recusa
                                    </label>
                                </div>

                                <div className="selectRecusa">
                                    {recusa &&
                                        <div>
                                            <form onSubmit = {handleSubmit(enviaRecusa)}>
                                                <select {...register("motivoRejeicao")} className='inputquest' >
                                                    <option value="">Motivo rejeicao...</option>
                                                    <option value="naoEntendeu">Não entendeu a proposta do questionário</option>
                                                    <option value="pessoaInadequada">Pessoa inadequada para responder o questionário</option>
                                                    <option value="Horário incoveniente">Horário incoveniente</option>
                                                    <option value="ofendido">Sentiu-se ofendido</option>
                                                    <option value="recusaDados">Recusa passar dados</option>
                                                    <option value="outro">Outro</option>
                                                </select>
                                                <input className="observacao"{...register("obs")} type = "textArea" placeholder="Observação"/>
                                                <button className="btnRecusa">Finalizar</button>
                                            </form>
                                        </div>
                                    }  
                                </div>
                                <label className="internedCheckArea-btn">
                                <input 
                                    type='checkbox' 
                                    name='recusa' 
                                    value='recusa'
                                    onClick={desfechoEntrevista}
                                    />  
                                    &nbsp; Dar desfecho
                                </label>
                                {desfecho &&
                                    <div className = "recusa">
                                        <form onSubmit = {handleSubmit(enviaDesfecho)}>
                                            <select {...register("desfecho")} className='inputquest' >
                                                <option value="">Desfecho...</option>
                                                <option value="recuperado">Recuperado</option>
                                                <option value="encerrado">Encerrado</option>
                                                <option value="obito">Óbito</option>
                                                <option value="perdaSegmento">Perda de Segmento</option>
                                            </select>
                                            <input className="inputObs"{...register("obs")} type = "textArea" placeholder="Observação.."/>
                                            <div className="btn">
                                            <button className="btn-finalizar">Finalizar</button></div>
                                        </form>
                                    </div>
                                }
                            </div>

                        </div>


                            {!recusa &&
                                <div className="btn-startArea"> 
                                    <button 
                                        className="btn-start" 
                                        type="submit"
                                        onClick={mudaPagina}>                               
                                        Próximo
                                    </button>
                                </div>
                            }
                    </div>

            </body> 

        </div>
    
    );
}
