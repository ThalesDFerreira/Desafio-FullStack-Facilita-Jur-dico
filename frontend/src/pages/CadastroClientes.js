import { useState } from 'react';
import { requestPost } from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const CadastroClientes = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cordenadaX, setCordenadaX] = useState('');
  const [cordenadaY, setCordenadaY] = useState('');

  const btnRequestInsertClients = async () => {
    try {
      const regexEmail =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      const validateEmail = regexEmail.test(email);

      if (!validateEmail) {
        toast.error('⚠️ E-mail inválido!');
      } else if (telefone.length > 11) {
        toast.error('⚠️ Número de telefone não pode ter mais que 11 dígitos!');
      } else {
        const result = await requestPost('/clientes', {
          name: nome,
          email: email,
          phone: telefone,
          coordinate_x: cordenadaX,
          coordinate_y: cordenadaY,
        });
        toast.success(result.message);
        setNome('');
        setEmail('');
        setTelefone('');
        setCordenadaX('');
        setCordenadaY('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='p-2 flex-grow bg-rgb-azul-claro'>
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl text-black'>
              Adicionar Cliente:
            </h1>
            <div className='flex flex-col text-slate-100'>
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
                            E-mail
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Telefone
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Cordenada X
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Cordenada Y
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Cadastrar
                          </th>
                        </tr>
                      </thead>
                      <tbody className='break-all'>
                        <tr>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='text'
                              onChange={({ target: { value } }) =>
                                setNome(value)
                              }
                              value={nome}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='text'
                              onChange={({ target: { value } }) =>
                                setEmail(value)
                              }
                              value={email}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='number'
                              min='0'
                              step='1'
                              onChange={({ target: { value } }) =>
                                setTelefone(value)
                              }
                              value={telefone}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='number'
                              min='0'
                              step='1'
                              onChange={({ target: { value } }) =>
                                setCordenadaX(value)
                              }
                              value={cordenadaX}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='number'
                              min='0'
                              step='1'
                              onChange={({ target: { value } }) =>
                                setCordenadaY(value)
                              }
                              value={cordenadaY}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
                            <button
                              className='btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                              type='button'
                              onClick={btnRequestInsertClients}
                            >
                              Enviar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CadastroClientes;
