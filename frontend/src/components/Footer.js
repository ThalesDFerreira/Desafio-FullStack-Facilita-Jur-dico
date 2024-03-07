const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white p-4 mt-8'>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-xl font-bold mb-2'>Informações da Empresa</h2>
          <p>Endereço: 123 Rua Principal</p>
          <p>Cidade: Cidade Principal</p>
          <p>Telefone: (123) 456-7890</p>
        </div>
        <div>
          <h2 className='text-xl font-bold mb-2'>Redes Sociais</h2>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
