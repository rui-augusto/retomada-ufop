import { useState } from 'react';

import { RoteiroFinalQ1 } from "../roteiros/RoteiroFinalQ1"
import "./Orientacao.css";
import "../roteiros/Roteiro.css";

export const Bloco = (props) => {

    const[alerted, setAlerted] = useState(false);
    return( 

        <div className="fullscreenArea-questions">
            {!alerted &&
                <form className="content-questions" >
                    
                    <div className="DescriptionArea">
                        <div className="Description">
                            <h3>APÊNDICE D</h3> <p>Instrumento da Pesquisa</p>                       
                        </div>

                        <div className="Info">
                            <p>ORIENTAÇÕES</p>
                            <p>Bloco 4</p>
                        </div>
                   
                        <div className="textArea"> 

                            <div className="TextAreaInfo"> </div>
                                <br/>

                            {props.ehCritico &&
                                <div className="Vermelho">  
                                    <h3>4.1 </h3><br/><li>Buscar um atendimento em serviço de saúde! Faça isso o mais rápido possível. </li><br/>
                                </div> 
                            }
                            <div className="Amarelo">  
                                <h3>4.2 </h3><br/>
                                                                
                                <li>​Utilize máscara o tempo todo.</li><br/>
                                <li>Se for preciso cozinhar, use máscara de proteção, cobrindo boca e nariz todo o tempo.</li><br/>
                                <li>​Depois de usar o banheiro, nunca deixe de lavar as mãos com água e sabão e sempre limpe vaso, pia e demais superfícies com álcool ou água sanitária para desinfecção do ambiente.</li><br/>
                                <li>​Separe toalhas de banho, garfos, facas, colheres, copos e outros objetos apenas para seu uso.</li><br/>
                                <li>O lixo produzido precisa ser separado e descartado o quanto antes.</li><br/>
                                <li>​Sofás e cadeiras também não podem ser compartilhados e precisam ser limpos frequentemente com água sanitária ou álcool 70%. </li><br/>
                                <li>​Mantenha a janela aberta para circulação de ar do ambiente usado para isolamento e a porta fechada, limpe a maçaneta frequentemente com álcool 70% ou água sanitária.</li><br/>
                                <h4>Caso o paciente não more sozinho, os demais moradores devem dormir em outro cômodo, longe da pessoa infectada, seguindo também as seguintes recomendações:</h4><br/>
                                <li>​Manter a distância mínima de 1 metro entre o paciente e os demais moradores.</li><br/>
                                <li>​Limpe os móveis da casa frequentemente com água sanitária ou álcool 70%.</li><br/>
                                <li>​Se uma pessoa da casa tiver diagnóstico positivo, todos os moradores ficam em isolamento por 14 dias também.</li><br/>
                            </div> 

                            <div className="Azul">  
                                <h3>4.3 </h3>
                                                
                                <br/> O uso de máscaras é essencial para não se contaminar e contaminar outras pessoas, quando tiver que sair de casa.<br/>
                                    A máscara é de uso individual e não deve ser compartilhada.<br/>
                                    Deve cobrir boca e nariz de forma a ficar bem ajustada. <br/>
                                    Depois de colocá-la, não toque o rosto ou fique ajustando a máscara na rua. <br/>
                                    Ao chegar em casa, lave as mãos com água e sabão antes de retirar a máscara. <br/>
                                    Retire a máscara pela parte traseira, evitando tocá-la na parte da frente. <br/>
                                    Lave a máscara com água e sabão e lave novamente as mãos com água e sabão.<br/>
                                </div>
                            </div>

                            <div className="btn-startArea"> 
                                <button 
                                    className="btn-start" 
                                    type="submit"
                                    onClick={() => {
                                        setAlerted(true);
                                    }}>                               
                                    ALERTADO
                                </button>
                            </div>
                    </div>

                </form>
            }
            {alerted &&
                <RoteiroFinalQ1 cpf={props.cpf} ehCritico={props.ehCritico}/>
            }
        </div>
    
    );
}