import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const redirectCadastrarCliente = () => {
    navigate('/cadastro-clientes');
  };

  const redirectVisitarClientes = () => {
    navigate('/visitar-clientes');
  };

  const redirectListaClientes = () => {
    navigate('/listar-clientes');
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <div className='container mx-auto mt-20'>
            <h1 className='text-3xl font-bold mb-4 text-center'>
              Bem-vindo ao Sistema de Gerenciamento de Clientes
            </h1>
            <div className='flex justify-center space-x-10 mt-10'>
              <button
                onClick={redirectCadastrarCliente}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Cadastrar Clientes
              </button>
              <button
                onClick={redirectListaClientes}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Listar Clientes
              </button>
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                onClick={redirectVisitarClientes}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-6'
              >
                Visitar Clientes
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
