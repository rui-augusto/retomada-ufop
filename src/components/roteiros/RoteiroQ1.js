import "./Roteiro.css"
import { useState, useEffect } from 'react';
import { useUser } from "../../context/user";
import { useNavigate } from 'react-router-dom';



export const RoteiroQ1 = () => {

    const navigate = useNavigate();

    const mudaPagina = () => {
        navigate("../questionario");
    }

    const { user } = useUser();
    console.log(user);

    const [pageState, setPageState] = useState(true);

    const[formValues, setFormValues] = useState({});

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const isCheckbox = type === 'checkbox';

        const data = formValues[name] || {};
        if(isCheckbox){
            data[value] = checked;
        }

        const newValue = (isCheckbox) ? data : value;
        setFormValues({...formValues, [name]:newValue });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
    
    };


    return( 

        <div>

            {pageState &&

            <body className="fullscreenArea-questions" onSubmit={handleSubmit}> 
                <form className="content-questions" >
                    <div className="InputArea">

                        <div className='line-questions'>
                            <div className='input-questions'>
                                <input 
                                type="text"
                                name="nome"
                                onChange={handleInputChange}
                                value={user.name}
                                placeholder="Nome do Entrevistador"
                                />
                            </div>

                            <div className='input-questions'>
                                <input
                                type="date"
                                name="data"
                                onChange={handleInputChange}
                                value={formValues.date}
                                placeholder="Data"
                                />
                            </div>
                        
                            <div className='input-questions'>
                                <input
                                type="time"
                                name="hora"
                                onChange={handleInputChange}
                                value={formValues.time}
                                placeholder="Hora"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="DescriptionArea">
                        <div className="Description">
                            <h3>APÊNDICE D</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>

                        <div className="Info">
                            <p>Monitoramento de casos confirmados para o COVID-19 </p>
                            <p>Questionário telefônico</p>
                        </div>
                   
                        <div className="textArea">   
                            <p className="pTextArea">Bom dia/Boa tarde! </p><hr/>

                            <div className="TextAreaInfo"> </div>
                                <br></br>
                                Meu nome é {user.name}, sou entrevistador(a) da Universidade Federal de Ouro Preto 
                                e estou realizando o rastreamento e monitoramento para COVID-19 na comunidade acadêmica.<br/><br/> 
                                Como parte das medidas de controle da transmissão da COVID-19, nós recebemos da Universidade a informação que você testou positivo recentemente. <br/><br/>
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
                                        onChange={handleInputChange}
                                        />  
                                        &nbsp; Recusa
                                    </label>
                                
                            
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


                </form>
            </body> 
            }
        </div>
    
    );
}