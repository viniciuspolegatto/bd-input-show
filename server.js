const botaoImpressaoCnpj = document.querySelector("#botaoImpressaoCnpj");
const entradaDoCnpj = document.querySelector("#cnpj"); // Captura o valor do input CNPJ
const entradaDoCep = document.querySelector("#cep"); // Captura o valor do input CEP

botaoImpressaoCnpj.addEventListener("click", async function() {
  const cnpjDigitado = entradaDoCnpj.value;
  const cepDigitado = entradaDoCep.value;

  console.log(`CNPJ: ${cnpjDigitado}`);
  console.log(`CEP: ${cepDigitado}`);

  try {
    // Buscar dados do CNPJ usando o proxy
    let cnpjUrl = `/proxy/${cnpjDigitado}`;
    let cnpjResponse = await fetch(cnpjUrl);
    let cnpjData = await cnpjResponse.json();

    // Verifica se a resposta contém um erro
    if (cnpjData.status === "ERROR") {
      throw new Error("CNPJ não encontrado");
    }

    const razaoSocial = cnpjData.nome;
    const telefone = cnpjData.telefone;
    const enderecoCompleto = `${cnpjData.logradouro}, ${cnpjData.numero}, ${cnpjData.bairro}, ${cnpjData.municipio} - ${cnpjData.uf}, ${cnpjData.cep}`;

    // Buscar dados do CEP na API ViaCEP
    let cepUrl = `https://viacep.com.br/ws/${cepDigitado}/json/`;
    let cepResponse = await fetch(cepUrl);
    let cepData = await cepResponse.json();

    if (cepData.erro) {
      throw new Error("CEP não encontrado");
    }

    const enderecoCep = `${cepData.logradouro}, ${cepData.bairro}, ${cepData.localidade} - ${cepData.uf}`;

    // Preenchendo as células da tabela com os valores
    document.getElementById('cnpj-td').textContent = cnpjDigitado;
    document.getElementById('razao-social-td').textContent = razaoSocial;
    document.getElementById('endereco-td').textContent = enderecoCep; // Preferimos usar o endereço retornado pelo CEP
    document.getElementById('telefone-td').textContent = telefone;
    document.getElementById('cep-td').textContent = cepDigitado;

    // Exibindo a tabela
    document.getElementById('data-table').style.display = 'block';
  } catch (error) {
    console.error(error);
    alert(`Erro ao buscar informações: ${error.message}`);
  }
});



/*
const http = require('https');

const options = {
  method: 'GET',
  hostname: 'receitaws.com.br',
  port: null,
  path: '/v1/cnpj/29735567000198',
  headers: {
    Accept: 'application/json'
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
*/