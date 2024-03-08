const routeClientsServices = async (req) => {
  // Função para calcular a distância entre dois pontos

  const calcularDistancia = (ponto1, ponto2) => {
    return Math.sqrt(
      Math.pow(ponto2.coordinate_x - ponto1.coordinate_x, 2) +
        Math.pow(ponto2.coordinate_y - ponto1.coordinate_y, 2)
    );
  };

  // Função para calcular a rota otimizada usando o algoritmo do vizinho mais próximo
  const calcularRotaOtimizada = (clientes) => {
    // Adiciona ponto de partida
    const empresa = {
      id: '1',
      name: 'empresa',
      email: 'empresa@empresa.com',
      phone: '123',
      coordinate_x: 0,
      coordinate_y: 0,
      createdAt: '2024-03-07T23:15:57.149Z',
      updatedAt: '2024-03-07T23:15:57.149Z',
    };

    // Copiar a lista de clientes para evitar a modificação da lista original
    let clientesRestantes = [empresa, ...clientes];

    // Ponto de partida
    let rota = [clientesRestantes.shift()];

    // Enquanto houverem clientes restantes
    while (clientesRestantes.length > 0) {
      let clienteAtual = rota[rota.length - 1];
      let clienteMaisProximo;
      let distanciaMaisCurta = Infinity;

      // Encontrar o cliente mais próximo do cliente atual

      for (let cliente of clientesRestantes) {
        console.log(cliente);
        const distancia = calcularDistancia(clienteAtual, cliente);
        if (distancia < distanciaMaisCurta) {
          distanciaMaisCurta = distancia;
          clienteMaisProximo = cliente;
        }
      }

      // Adicionar o cliente mais próximo à rota e removê-lo da lista de clientes restantes
      rota.push(clienteMaisProximo);
      clientesRestantes = clientesRestantes.filter(
        (cliente) => cliente !== clienteMaisProximo
      );
    }

    return rota.filter((cliente) => cliente.id !== '1');
  };

  // Calcular a rota otimizada
  return calcularRotaOtimizada(req.body);
};

module.exports = {
  routeClientsServices,
};
