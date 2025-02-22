import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PoliticaDePrivacidade from './components/PoliticaDePrivacidade';
import TermosDeUso from './components/TermosDeUso';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
      </Routes>
    </Router>
  );
}

export default App;
