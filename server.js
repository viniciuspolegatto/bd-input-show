let endpoint1 = 'https://receitaws.com.br/v1/cnpj/29735567000198';
let endpoint = 'https://raw.githubusercontent.com/guilhermeonrails/api-frontend/main/produtos.json'

async function buscarCnpjAPI() {
  try {
    let res = await fetch(endpoint);  // Aguarda a resposta da requisição
    let data = await res.json();      // Extrai o JSON da resposta

    console.log(data);                // Faz algo com os dados recebidos
  } catch (error) {
    console.error('Erro ao buscar CNPJ:', error);
  }
}

buscarCnpjAPI();