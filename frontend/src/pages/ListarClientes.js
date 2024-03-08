import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { requestGet, requestPut, requestDelete } from '../services/requests';
import Editar from '../assets/edit.png';
import Deletar from '../assets/delete.png';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListarClientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesClone, setListaClientesClone] = useState([]);
  const [existeClientes, setExisteClientes] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [clientSelecionadoEditar, setClientSelecionadoEditar] = useState('');
  const [nomeAtualizado, setNomeAtualizado] = useState('');
  const [emailAtualizado, setEmailAtualizado] = useState('');
  const [telefoneAtualizado, setTelefoneAtualizado] = useState('');
  const [coordenadaXAtualizada, setCoordenadaXAtualizada] = useState('');
  const [coordenadaYAtualizada, setCoordenadaYAtualizada] = useState('');
  const [optionsFindClient, setOptionsFindClient] = useState('nome');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [clienteSelecionadoDeletar, setClienteSelecionadoDeletar] =
    useState('');

  const getClients = async () => {
    try {
      const result = await requestGet('/clientes');
      if (result.length !== 0) {
        setExisteClientes(true);
        setListaClientes(result);
        setListaClientesClone(result);
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

  const handleOpenModalEdit = (
    id,
    nome,
    email,
    telefone,
    coordenadaX,
    coordenadaY
  ) => {
    setClientSelecionadoEditar(id);
    setNomeAtualizado(nome);
    setEmailAtualizado(email);
    setTelefoneAtualizado(telefone);
    setCoordenadaXAtualizada(coordenadaX);
    setCoordenadaYAtualizada(coordenadaY);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleOpenModalDelete = (id) => {
    setClienteSelecionadoDeletar(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const btnRequestEditClient = async () => {
    try {
      const regexEmail =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      const validateEmail = regexEmail.test(emailAtualizado);

      const filterClientId = listaClientes.filter(
        (client) => client.id === clientSelecionadoEditar
      );

      console.log(filterClientId);

      const filterRemoveIdList = listaClientes.filter(
        (client) => client.id !== clientSelecionadoEditar
      );

      const filterListaNome = filterRemoveIdList.some(
        (client) => client.name === nomeAtualizado
      );

      const filterListaEmail = filterRemoveIdList.some(
        (client) => client.email === emailAtualizado
      );

      const filterListaTelefone = filterRemoveIdList.some(
        (client) => client.phone === telefoneAtualizado
      );

      if (
        filterClientId[0].name === nomeAtualizado &&
        filterClientId[0].email === emailAtualizado &&
        filterClientId[0].phone === telefoneAtualizado &&
        filterClientId[0].coordinate_x === coordenadaXAtualizada &&
        filterClientId[0].coordinate_y === coordenadaYAtualizada
      ) {
        return toast.error('⚠️ Cliente não alterado!');
      } else if (filterListaNome) {
        return toast.error('⚠️ Nome do Cliente já existe!');
      } else if (filterListaEmail) {
        return toast.error('⚠️ Email já existe!');
      } else if (filterListaTelefone) {
        return toast.error('⚠️ Telefone já existe!');
      } else if (!validateEmail) {
        return toast.error('⚠️ Email não é valido!');
      } else if (telefoneAtualizado.length > 11) {
        return toast.error(
          '⚠️ Número de telefone não pode ter mais que 11 dígitos!'
        );
      } else {
        const result = await requestPut('/clientes', {
          id: Number(clientSelecionadoEditar),
          name: nomeAtualizado,
          email: emailAtualizado,
          phone: telefoneAtualizado,
          coordinate_x: coordenadaXAtualizada,
          coordinate_y: coordenadaYAtualizada,
        });
        getClients();
        setNomeAtualizado('');
        setEmailAtualizado('');
        setTelefoneAtualizado('');
        setCoordenadaXAtualizada('');
        setCoordenadaYAtualizada('');
        toast.success(result.message);
        handleCloseModalEdit();
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  const btnRequestDeleteClient = async () => {
    try {
      const result = await requestDelete(`/clientes?id=${clienteSelecionadoDeletar}`);
      getClients();
      toast.success(result.message);
      handleCloseModalDelete();
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  const inputSearchClient = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaClientesClone];
    if (optionsFindClient === 'nome' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (
          element.name &&
          element.name.toLowerCase().includes(valueInput.toLowerCase())
        ) {
          newArray.push(element);
        }
      }
      setListaClientes(newArray);
    }

    if (optionsFindClient === 'email' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.email.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaClientes(newArray);
    }

    if (optionsFindClient === 'telefone' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.phone.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaClientes(newArray);
    }

    if (valueInput === '') {
      setListaClientes(listaClientesClone);
    }
  };

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
              Lista de clientes:
            </h1>
            <div className='flex justify-end text-black'>
              <div className='flex justify-center items-center mr-5'>
                <div className='flex mr-3'>
                  <div className='mr-1'>
                    <label htmlFor='select-filterMsn'>Filtrar por:</label>
                  </div>
                  <div>
                    <select
                      id='select-filterMsn'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={({ target: { value } }) =>
                        setOptionsFindClient(value)
                      }
                      value={optionsFindClient}
                    >
                      <option value='nome'>Nome</option>
                      <option value='email'>Email</option>
                      <option value='telefone'>Telefone</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className='py-1 text-black rounded-md w-24 md:w-full'
                    name='input-pesquisa-client'
                    type='text'
                    placeholder='Pesquise aqui ...'
                    onChange={inputSearchClient}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col text-black'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='table-msn min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
                        <tr>
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
                          <th scope='col' className='px-2 py-2'>
                            Editar
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Deletar
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
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalEdit(
                                      client.id,
                                      client.name,
                                      client.email,
                                      client.phone,
                                      client.coordinate_x,
                                      client.coordinate_y
                                    )
                                  }
                                >
                                  <img src={Editar} alt='Editar' />
                                </button>
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalDelete(client.id)
                                  }
                                >
                                  <img src={Deletar} alt='Deletar' />
                                </button>
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
          <div className='flex justify-center'>
            <Modal show={openModalEdit} onHide={handleCloseModalEdit}>
              <Modal.Body className='flex flex-col flex-grow'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Coordenada X</th>
                      <th>Coordenada Y</th>
                    </tr>
                  </thead>
                  <tbody className='break-all'>
                    <tr>
                      <td>
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setNomeAtualizado(value)
                          }
                          value={nomeAtualizado}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                      <td>
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setEmailAtualizado(value)
                          }
                          value={emailAtualizado}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                      <td>
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setTelefoneAtualizado(value)
                          }
                          value={telefoneAtualizado}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                      <td>
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setCoordenadaXAtualizada(value)
                          }
                          value={coordenadaXAtualizada}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                      <td>
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setCoordenadaYAtualizada(value)
                          }
                          value={coordenadaYAtualizada}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer className='justify-between'>
                <Button onClick={handleCloseModalEdit}>
                  <img className='w-7 h-7' src={Cancelar} alt='Cancelar' />
                </Button>
                <Button onClick={btnRequestEditClient}>
                  <img className='w-7 h-7' src={Confirmar} alt='Confirmar' />
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Modal show={openModalDelete} onHide={handleCloseModalDelete}>
              <Modal.Body>
                Tem certeza que deseja excluir esse contato?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className='text-black'
                  type='button'
                  onClick={handleCloseModalDelete}
                >
                  Não
                </Button>
                <Button
                  className='text-black'
                  type='button'
                  onClick={btnRequestDeleteClient}
                >
                  Sim
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default ListarClientes;
