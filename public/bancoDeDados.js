// Nome do Arquivo: bancoDeDados.js

const botaoAddDados = document.querySelector("#botaoAdicionarDados");
console.log("1 Botão Add Dados", botaoAddDados);

const listaMontada = document.querySelector("#listaVisualDeDados");
console.log("2 Lista Montada - Lista Visual", listaMontada);

const botaoLimparDados = document.querySelector("#botaoLimparDados");

const entradaDeNome = document.querySelector("#nomeCon");
const entradaDeCpf = document.querySelector("#cpfCon");
const entradaDeEmail = document.querySelector("#emailCon");
const entradaDeTel = document.querySelector("#telCon");
const entradaDeEnd = document.querySelector("#enderecoCon");
console.log("3 - Const Entrada de Nome", entradaDeNome);

let listaDeDados = [];

botaoAddDados.addEventListener("click", function() {
  // Coleta os dados dos campos
  const listaDeDados = [
    entradaDeNome.value,
    entradaDeCpf.value,
    entradaDeEmail.value,
    entradaDeTel.value,
    entradaDeEnd.value
  ];
  console.log("4 - Após Clique do botão", listaDeDados);

  // Constrói o HTML da lista
  let futuroValorInnerHTML = "";
  for (let i = 0; i < listaDeDados.length; i++) {
    console.log("5 - Início do Length", listaDeDados[i]);
    futuroValorInnerHTML += "<li>" + listaDeDados[i] + "</li>";
  }
  
  console.log("6 - Futuro Valor Inner HTML", futuroValorInnerHTML);
  listaMontada.innerHTML = futuroValorInnerHTML;
  console.log("7 - Lista montada.innerHTML", listaMontada);

  // Envia os dados para o servidor
  const data = {
    nome: entradaDeNome.value,
    cpf: entradaDeCpf.value,
    email: entradaDeEmail.value,
    tel: entradaDeTel.value,
    endereco: entradaDeEnd.value
  };

  fetch('/addData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Falha na comunicação com o servidor: ' + response.statusText);
    }
    return response.text();
  })
  .then(text => {
    console.log('Resposta do servidor:', text);
    alert('Informações salvas com sucesso!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Erro ao salvar as informações: ' + error.message);
  });

  let segundoElemento = listaDeDados[3];
  console.log("8 - Item Capturado da Lista Inner", segundoElemento);
});

//------------------------- LIMPAR A LISTA -------------
botaoLimparDados.addEventListener("click", function() {
  listaMontada.innerHTML = "";
  listaDeDados = [];
});
