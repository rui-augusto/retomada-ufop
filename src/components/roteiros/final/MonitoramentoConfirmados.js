import "../../style/Roteiros.css"
import { useState } from 'react';
import { useUser } from "../../context/user";
import { useNavigate } from 'react-router-dom';



export const RoteiroFinalMonitoramentoConfirmados = () => {

    const navigate = useNavigate();

    const mudaPagina = () => {
        navigate("../orientacoesBloco3");
    }

    const { user } = useUser();

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

                    <div className="DescriptionArea">
                        <div className="Description">
                            <h3>APÊNDICE D</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>

                        <div className="Info">
                            <p>Monitoramento de casos confirmados para o COVID-19</p>
                            <p>Questionário telefônico</p>
                        </div>
                   
                        <div className="textArea">   
                            <div className="TextAreaInfo1">
                                <br/>Agradecemos a sua atenção e pedimos que fique atento(a), pois entraremos em contato novamente.<br></br>
                                Reforçamos que as medidas de afastamento social, proteção individual e higiene das mãos são extremamente importância para prevenirmos a disseminação do vírus no município.<br/><br/>
                                Gostaria de dizer algo ou tem alguma dúvida?<br/><br/>
                                Um abraço!<br/><br/>
                                Anote aqui informações relatas pelo entrevistado que julgar importante:<br/><br/>
                            </div>

                            <div className="textAreainfo">
                                <textarea placeholder="Digite aqui..." id="w3review" name="w3review" rows="4" cols="50"></textarea>
                            </div>

                            <div className="inputQuest3">
                                <div>
                                    Próximo retorno: &nbsp;
                                    <input type = "date"/>
                                </div>
                                
                                <div className="inputDataContato">
                                    Hórario do termino: &nbsp;
                                    <input type = "time"/>
                                </div>
                            </div>

                            <div className="btn-startArea"> 
                                <button 
                                    className="btn-start" 
                                    type="submit"
                                    onClick={mudaPagina}>                               
                                    Finalizar
                                </button>
                            </div>
                    </div>
                    </div>

                </form>
            </body> 
            }

        </div>
    
    );
}