import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { requestGet, requestPost } from '../services/requests';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const VisitarClientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesSelecionados, setListaClientesSelecionados] = useState(
    []
  );
  const [existeClientes, setExisteClientes] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [routesDefinidas, setRoutesDefinidas] = useState([]);
  const [openModalRoutes, setOpenModalRoutes] = useState(false);

  const getClients = async () => {
    try {
      const result = await requestGet('/clientes');
      if (result.length !== 0) {
        setExisteClientes(true);
        setListaClientes(result);
      } else {
        setExisteClientes(false);
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 4000,
        }
      );
    }
  };

  const handleChangeInput = (idClient) => {
    const addClient = listaClientes.find((el) => el.id === idClient);
    if (listaClientesSelecionados.includes(addClient)) {
      setListaClientesSelecionados(
        listaClientesSelecionados.filter((el) => el.id !== idClient)
      );
    } else {
      setListaClientesSelecionados([...listaClientesSelecionados, addClient]);
    }
  };

  const handleChangeCheckbox = (idClient) => {
    const result = listaClientes.find((el) => el.id === idClient);
    return listaClientesSelecionados.includes(result);
  };

  const enableButton = () => {
    if (listaClientesSelecionados.length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const btnRequestRoutesClients = async () => {
    try {
      const result = await requestPost('/vistar', listaClientesSelecionados);
      toast.success('Rotas definidas com sucesso!');
      setListaClientesSelecionados([]);
      setIsDisabled(true);
      setRoutesDefinidas(result);
      setOpenModalRoutes(true);
      handleOpenModalRoutes();
    } catch (error) {
      toast.error(`⚠️${error}`);
    }
  };

  const handleOpenModalRoutes = () => {
    setOpenModalRoutes(true);
  };

  const handleCloseModalRoutes = () => {
    setOpenModalRoutes(false);
  };

  useEffect(() => {
    enableButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listaClientesSelecionados]);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='p-2 flex-grow bg-rgb-azul-claro'>
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl text-black'>
              Selecione os clientes que deseja visitar:
            </h1>
            <div className='flex justify-center'>
              <button
                type='button'
                disabled={isDisabled}
                onClick={btnRequestRoutesClients}
                className='md:text-base rounded bg-rgb-azul hover:bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
              >
                Realizar rota de visitação
              </button>
            </div>
            <div className='flex flex-col text-black'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='table-msn min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
                        <tr>
                          <th scope='col' className='px-2 py-2'>
                            Selecionar
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Nome
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Email
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Telefone
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Coordenada X
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Coordenada Y
                          </th>
                        </tr>
                      </thead>
                      <tbody className='break-all'>
                        {existeClientes ? (
                          listaClientes.map((client) => (
                            <tr
                              className='border-b border-solid border-rgb-cinza'
                              key={`radio-form-${client.id}`}
                            >
                              <td className='whitespace-nowrap px-2 py-2 font-medium'>
                                <input
                                  id={`check-${client.id}`}
                                  name={`checkbox-${client.id}`}
                                  type='checkbox'
                                  checked={handleChangeCheckbox(client.id)}
                                  onChange={() => handleChangeInput(client.id)}
                                />
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <label htmlFor={`radio-${client.id}`}>
                                  {client.name}
                                </label>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <label htmlFor={`radio-${client.id}`}>
                                  {client.email}
                                </label>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <label htmlFor={`radio-${client.id}`}>
                                  {client.phone}
                                </label>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <label htmlFor={`radio-${client.id}`}>
                                  {client.coordinate_x}
                                </label>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <label htmlFor={`radio-${client.id}`}>
                                  {client.coordinate_y}
                                </label>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className='flex justify-center mt-10 text-black'>
                            <td>Não existe contatos adicionados!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div>
            <Modal show={openModalRoutes} onHide={handleCloseModalRoutes}>
              <Modal.Header className='flex justify-center'>
                Essas são as rotas de visitas otimizadas:
              </Modal.Header>
              <Modal.Body className='text-black'>
                {routesDefinidas.map((route, index) => (
                  <p key={route.id} className='text-black'>{`${index + 1} ==> ${
                    route.name
                  } - ${route.email} - ${route.phone}`}</p>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className='text-black'
                  type='button'
                  onClick={handleCloseModalRoutes}
                >
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default VisitarClientes;
