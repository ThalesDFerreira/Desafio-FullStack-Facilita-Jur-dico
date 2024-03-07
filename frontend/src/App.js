import { Routes, Route, Navigate } from 'react-router-dom';
import CadastroClientes from './pages/CadastroClientes';
import VisitarClientes from './pages/VisitarClientes';
import ListarClientes from './pages/ListarClientes';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route exact path='/' element={<Navigate to='/home' />} />
        <Route path='/cadastro-clientes' element={<CadastroClientes />} />
        <Route path='/visitar-clientes' element={<VisitarClientes />} />
        <Route path='/listar-clientes' element={<ListarClientes />} />
      </Routes>
    </>
  );
};

export default App;
