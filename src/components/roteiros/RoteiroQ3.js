import "./Roteiro.css"
import { useState } from 'react';
import { useUser } from "../../context/user";
import { useNavigate } from 'react-router-dom';



export const RoteiroQ3 = () => {

    const navigate = useNavigate();

    const mudaPagina = () => {
        navigate("../questionario3");
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
                                value={formValues.name}
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
                            <p>Monitoramento de casos confirmados para o COVID-19</p>
                            <p>Questionário telefônico</p>
                        </div>
                   
                        <div className="textArea">   
                            <p className="pTextArea">Bom dia/Boa tarde! </p><hr/>
                            <div className="TextAreaInfo1">
                                Confirmar se quem atendeu é o entrevistado. Caso não, perguntar se pode chamar.
                            </div>
                            
                            <div className="internedcheckArea">
                                <div>Caso o entrevistado tenha sido internado,
                                assinalar: &nbsp;                     
                                </div>

                                <div>
                                    <label className="internedCheckArea-btn">
                                    <input 
                                        type='checkbox' 
                                        name='internado' 
                                        value='internado'
                                        onChange={handleInputChange}
                                        />  
                                        &nbsp; Internado
                                    </label>
                                </div>  
                            
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
                                        onChange={handleInputChange}
                                        />  
                                        &nbsp; Recusa
                                    </label>
                                </div>  
                            
                            </div>
                            <div className="TextAreaInfo"> </div>
                                <p>Agradecer e encerrar a ligação.</p>
                                <br></br>
                                Caso o o entrevistado concordar em realizar a entrevista:<p></p><br></br> Meu nome é {user.name}, sou entrevistador(a) da Universidade Federal de Ouro Preto e, 
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


                </form>
            </body> 
            }

        </div>
    
    );
}