import "./Roteiro.css"
import { useState } from 'react';
import { useUser } from "../../context/user";
import { useInterviewed } from "../../context/interviewed";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const RoteiroQ3 = () => {

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

    const recusaEntrevista = (event) => {
        if (event.target.checked == true){
            setRecusa(true);
        } else{
            setRecusa(false);
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

    const mudaPagina = () => {
        navigate(`../../questionario3/${cpf}`);
    }


    return( 

        <div>

            <body className="fullscreenArea-questions" onSubmit={handleSubmit}> 
                    <div className="DescriptionArea">
                        <form className="content-questions" >
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
                        </form>
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
                                            <input {...register("obs")} type = "textArea"/>
                                            <button className="btn-start">Finalizar Quest</button>
                                        </form>
                                    </div>
                                }  
                            
                            </div>
                            <div className="TextAreaInfo"> </div>
                                <p>Agradecer e encerrar a ligação.</p>
                                <br></br>
                                Caso o o entrevistado concordar em realizar a entrevista:<p></p><br></br> Meu nome é {contextUser.user.name}, sou entrevistador(a) da Universidade Federal de Ouro Preto e, 
                                conforme combinado na última ligação, estamos retornando para saber como tem passado. 
                                Podemos conversar?
                                <p>Irei fazer algumas perguntas novamente, mas dessa vez será mais rápido.</p>
                                <p>Vamos começar?</p>
                            </div>

                            <div className="btn-startArea"> 
                                <button 
                                    className="btn-start" 
                                    type="submit"
                                    onClick={mudaPagina}>                               
                                    Próximo
                                </button>
                            </div>
                    </div>

            </body> 

        </div>
    
    );
}