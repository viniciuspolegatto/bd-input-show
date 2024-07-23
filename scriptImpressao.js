document.addEventListener("DOMContentLoaded", function () {
  console.log('Página - Busca CNPJ');

  const botaoImpressaoCnpj = document.querySelector("#botaoImpressaoCnpj");
  const botaoVoltarIndexImpressao = document.querySelector("#botaoVoltarIndexImpressao");
  const entradaDoCnpj = document.querySelector("#cnpj"); // Captura o valor do input CNPJ
  const entradaDoCep = document.querySelector("#cep"); // Captura o valor do input CEP

  botaoImpressaoCnpj.addEventListener("click", async function () {
    const cnpjDigitado = entradaDoCnpj.value;
    const cepDigitado = entradaDoCep.value;

    console.log(`CNPJ: ${cnpjDigitado}`);
    console.log(`CEP: ${cepDigitado}`);

    try {
      // Buscar dados do CNPJ usando o proxy
      const cnpjUrl = `/proxy/cnpj/${cnpjDigitado}`;
      const cnpjResponse = await fetch(cnpjUrl);
      if (!cnpjResponse.ok) {
        throw new Error(`Erro ao buscar dados do CNPJ: ${cnpjResponse.statusText}`);
      }
      const cnpjData = await cnpjResponse.json();

      const razaoSocial = cnpjData.nome;
      const telefone = cnpjData.telefone;
      const enderecoCompleto = `${cnpjData.logradouro}, ${cnpjData.numero}, ${cnpjData.bairro}, ${cnpjData.municipio} - ${cnpjData.uf}, ${cnpjData.cep}`;

      // Buscar dados do CEP na API ViaCEP
      const cepUrl = `https://viacep.com.br/ws/${cepDigitado}/json/`;
      const cepResponse = await fetch(cepUrl);
      if (!cepResponse.ok) {
        throw new Error(`Erro ao buscar dados do CEP: ${cepResponse.statusText}`);
      }
      const cepData = await cepResponse.json();

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

  botaoVoltarIndexImpressao.addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});
