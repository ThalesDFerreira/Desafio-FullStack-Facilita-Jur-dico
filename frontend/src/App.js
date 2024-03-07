// import { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import CadastroTelefone from "./pages/CadastroTelefone";
// import CadastroMensagem from "./pages/CadastroMensagem";
// import Enviar from "./pages/Enviar";
// import Login from "./pages/Login";
// import ErroLogin from "./pages/ErroLogin";
// import Admin from "./pages/Admin";
// import MyContext from "./context/MyContext";
// import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      {/* <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Navigate to='/login' />} />
        {autenticado && (
          <>
            {admin && <Route path='/admin' element={<Admin />} />}
            <Route
            
              path='/cadastro-mensagem'
              element={<CadastroMensagem />}
            />
            <Route
            
              path='/cadastro-telefone'
              element={<CadastroTelefone />}
            />
            <Route path='/enviar' element={<Enviar />} />
          </>
        )}
        <Route path='*' element={<ErroLogin />} />
      </Routes> */}
    </>
  );
};

export default App;