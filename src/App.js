import { MainRoutes } from "./routes/routes";
import "./components/style.css"

function App() {
  return (
    <div>
      <div className = "header-content">
        <div>Projeto UFOP em Ação</div>
        <div>Prevenção e Telemonitoramento de Risco para a COVID-19</div>
        <div>Demanda interna da UFOP</div>
      </div>
      <MainRoutes />
    </div>    
  );
}

export default App;
