import "./Roteiro.css"
import { useState } from 'react';
import { useUser } from "../../context/user";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useInterviewed } from "../../context/interviewed";


export const RoteiroQ2 = () => {
    
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


    const navigate = useNavigate();
    const {id} = useParams();


    const contextUser = useUser();
    const context = useInterviewed();

    const [recusa, setRecusa] = useState(false);

    const recusaEntrevista = (event) => {
        if (event.target.checked == true){
            setRecusa(true);
        } else{
            setRecusa(false);
        }
    };

    const mudaPagina = () => {
        navigate(`../monitoramentoContatosProximos/${id}`);
    }

    const enviaRecusa = async (data) => {
        const dataHorarioAgora = new Date().setHours(0,0,0) / 1000;
        const entrevistador = contextUser.user.email;
        const nome = await context.getInfoOfClosedContact(id, "nome");
        const telefone = await context.getInfoOfClosedContact(id, "telefone1")

        const obj = {
            dtInclusaobanco: dataHorarioAgora,
            entrevistador: entrevistador,
            idUnico: id,
            motivoRejeicao: data.motivoRejeicao,
            nome: nome,
            origem: "contatoProximo",
            telefone: telefone
        } 
        context.refusalQuestCP(id, obj);
    }

    // const enviaRecusa = async (data) => {
    //     console.log(data);
    //     var dataHorarioAgora = new Date().setHours(0,0,0) / 1000;
    //     var entrevistador = contextUser.user.email;

    //     var nome = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/nome`);
    //     var origem = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/origem`);
    //     var telefone = await context.getRefFromDataBase(`Confirmados/${cpf}/objetoDados/telefone`);

    //     const obj = {
    //         dtInclusaoBanco: dataHorarioAgora,
    //         entrevistador: entrevistador,
    //         idUnico: cpf,
    //         motivoRejeicao: data.motivoRejeicao,
    //         nome: nome,
    //         obs: data.obs,
    //         origem: origem,
    //         telefone: telefone
    //     }   
    //     context.refusalQuest(cpf, obj);
    //     navigate(`/home/${contextUser.user.uid}`);
    // }

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
                            <p>Monitoramento de Contato Próximos </p>
                            <p>Questionário telefônico</p>
                        </div>
                   
                        <div className="textArea">   
                            <p className="pTextArea">Bom dia/Boa tarde! </p><hr/>

                            <div className="TextAreaInfo"> </div>
                                <br></br>
                                Meu nome é {contextUser.user.name}, sou entrevistador(a) da Universidade Federal de Ouro Preto 
                                e estou realizando o rastreamento e monitoramento para COVID-19 na comunidade acadêmica.<br/><br/> 
                                Como parte das medidas de controle da transmissão da COVID-19, nós recebemos da Universidade a informação que você teve contato com alguém que testou positivo recentemente. <br/><br/>
                                Podemos conversar? <br/>
                                Sua participação é muito importante. <br/>
                                Esta conversa terá duração de aproximadamente 7 minutos.  
                                <p>Gostaríamos de lhe fazer algumas perguntas. </p><br/>
                                <p> As informações dadas pelo(a) Sr.(a) não serão divulgadas, manteremos sigilo de todas as informações prestadas aqui, tudo bem?!</p>  
                                <p>Vamos começar?</p>
                            </div>

                            <div className="textArea">
                                Caso o entrevistado não queira ser entrevistado, assinalar:<br/> &nbsp;                     
                                
                                <label className="internedCheckArea-btn">
                                <input 
                                    type='checkbox' 
                                    name='recusa' 
                                    value='recusa'
                                    onClick = {recusaEntrevista}
                                    />  
                                    &nbsp; Recusa
                                </label>
                                
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