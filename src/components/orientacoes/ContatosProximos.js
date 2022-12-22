import { useState } from 'react';

import { RoteiroFinalContatosProximos } from "../roteiros/final/ContatosProximos";

import "../style/Orientacoes.css"

export const BlocoContProximo = () => {

    const [alertado, setAlertado] = useState(false);

    const alertUser = () => {
        setAlertado(true);
    }
    return( 

        <div>
            <body className="fullscreenArea-questions" > 
                {!alertado &&
                    <form className="content-questions" >
                        
                        <div className="DescriptionArea">
                            <div className="Description">
                                <h3>APÊNDICE D</h3> <p>Instrumento da Pesquisa</p>                       
                            </div>

                            <div className="Info">
                                <p>ORIENTAÇÕES</p>
                                <p>Bloco 3</p>
                            </div>
                    
                            <div className="textArea"> 

                                <div className="TextAreaInfo"> 
                                    <br/>

                                    {/* 3.1 aparecer somente se ?? */}
                                    <div className="Vermelho">
                                        <h3>3.1 </h3><br/><li>Buscar um atendimento na UBS! Faça isso o mais rápido possível. </li><br/>
                                    </div>

                                    <div className="Cinza">
                                        <h3>3.2 </h3><br/><li>Gostaríamos de reforçar que você mantenha o isolamento domiciliar e utilize máscara o tempo todo para não contaminar as superfícies de sua casa.</li><br/>
                                                <li> Se for preciso cozinhar, use máscara de proteção, cobrindo boca e nariz todo o tempo.</li><br/>
                                                <li>  Depois de usar o banheiro, nunca deixe de lavar as mãos com água e sabão e sempre limpe vaso, pia e demais superfícies com álcool ou água sanitária para desinfecção do ambiente.</li><br/>
                                                <li>  Separe toalhas de banho, garfos, facas, colheres, copos e outros objetos apenas para seu uso.</li><br/>
                                                <li>  O lixo produzido precisa ser separado e descartado.</li><br/>
                                                <li>  Sofás e cadeiras também não podem ser compartilhados e precisam ser limpos frequentemente com água sanitária ou álcool 70%.</li><br/>
                                                <li>  Mantenha a janela aberta para circulação de ar do ambiente usado para isolamento e a porta fechada, limpe a maçaneta frequentemente com álcool 70% ou água sanitária.  </li><br/>
                                                <li> Caso o paciente não more sozinho, os demais moradores da casa devem dormir em outro cômodo, longe da pessoa infectada, seguindo também as seguintes recomendações:</li><br/>
                                                <li>  Manter a distância mínima de 1 metro entre o paciente e os demais moradores.</li><br/>
                                                <li> Limpe os móveis da casa frequentemente com água sanitária ou álcool 70%.</li><br/>
                                                <li>  Se uma pessoa da casa tiver diagnóstico positivo, todos os moradores ficam em isolamento por 14 dias também.</li><br/>
                                                <li>  Caso outro familiar da casa também inicie os sintomas leves, ele deve reiniciar o isolamento de 14 dias. Se os sintomas forem graves, como dificuldade para respirar, ele deve procurar orientação médica.</li><br/>
                                        
                                    </div>

                                    <div className="btn-startArea"> 
                                        <button 
                                            className="btn-start" 
                                            type="submit"
                                            onClick={alertUser}>                               
                                            ALERTADO
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>
                    }
                {alertado &&
                    <div>
                        <RoteiroFinalContatosProximos />
                    </div>
                }
            </body>
        </div>
    );
}