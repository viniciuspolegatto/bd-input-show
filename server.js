const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const buscaCep = require("busca-cep");
const mysql = require("mysql");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/view/index.html");
});

app.post("/DialogFlow", function(request, response) {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });
  connection.connect();

  let intentName = request.body.queryResult.intent.displayName;

  
if (intentName == "Default_Welcome_Intent") {
   response.json({fulfillmentText: "Olá! 😃"+"\n\n"+"Sou a ISA... Estou em Treinamento no Atendimento Virtual do SEBRAE Barretos"+"\n\n"+"Vim para agilizar, mas se eu tiver dificuldades chamo um(a) atendente, Ok?😉"+"\n\n"+"*Podemos começar?*"});
}

  
if(intentName == 'verifica_cadastro'){
 let cpforigem = request.body.queryResult.parameters["cpf"];
 let cpfContato = cpforigem.replace(/\.|\-/g, '');
 let query = 'select * from cadastro where cpf = "'+cpfContato+'"';
 
 connection.query(query, function (error, results, fields) {

   
if (results[0]) {
     let nomeClienteBD = results[0].nome
     let contato = "Ok!"+"\n\n"+"Verifiquei que o CPF *"+cpforigem+"* está vinculado a *"+nomeClienteBD+"* 👍"+"\n\n"+'Vou passar algumas opções para atendimento rápido, por favor informe o assunto desejado:'+"\n\n"+'*1* - Soluções Técnicas para Empresas 🚀'+"\n"+'*2* - Cursos e Palestras 💼'+"\n"+'*3* - Informações sobre o MEI 👨‍💼👩‍💼'+"\n"+'*4* - Crédito e Programas 💰'+"\n"+'*5* - Controle Finaceiro💲📈';
      response.json({"fulfillmentText": contato });
  } 
   else {
    response.json({"fulfillmentText": '🤓 Verifiquei que faltam algumas informações...  será rápido continuar!'+"\n\n"+'💻 _a ação dará sequência no atendimento e também confirmará que você concorda com a política do SEBRAE sobre segurança dos seus dados, disponível no link:_'+"\n"+'https://minio-cpe.sebrae.com.br/documento/politica-privacidade.pdf'+"\n\n"+'Por favor digite: *FAZER CADASTRO*'});
  }
})
}

 
if (intentName == "fazer_cadastro") {
    
    let nomeContato = request.body.queryResult.parameters["nome"];
    let telefoneContato = request.body.queryResult.parameters["telefone"];
    let nascimentoContato = request.body.queryResult.parameters["nascimento"];
    let cpforigem = request.body.queryResult.parameters["cpf"];
    let cpfContato = cpforigem.replace(/\.|\-/g, '');
    let enderecoContato = request.body.queryResult.parameters["endereco"];
    let numeroimovelContato = request.body.queryResult.parameters["numeroimovel"];
    let emailContato = request.body.queryResult.parameters["email"];
    let assuntoContato = 'Sem Histórico';
    let faturamentoContato = 'Sem Histórico';
    let custovariavelContato = 'Sem Histórico';
    let custofixoContato = 'Sem Histórico';
    let codigoraiox = cpfContato;
  
      let query = 'insert into cadastro values ("'+ nomeContato +'","'+ telefoneContato +'","'+ nascimentoContato +'","'+ cpfContato +'","'+ enderecoContato +'","'+ numeroimovelContato +'","'+ emailContato +'","'+ assuntoContato +'","'+ faturamentoContato +'","'+ custovariavelContato +'","'+ custofixoContato +'","'+ codigoraiox +'" )' ;
    connection.query(query, function(error, results, fields) {
      if (error) throw error;
      connection.end();
    });
  
  
  let cnpj = 'Sem Histórico';
  let comprasaprazoprojetadas = 'Sem Histórico';
  let custodasvendas = 'Sem Histórico';
  let despesadasvendas = 'Sem Histórico';
  let despesasadministrativas = 'Sem Histórico';
  let investimentos = 'Sem Histórico';
  let lucroideal = 'Sem Histórico';
  let lucroidealpercentual = 'Sem Histórico';
  let mes = 'Sem Histórico';
  let pagamentoparafornecedores = 'Sem Histórico';
  let recebimentodeclientes = 'Sem Histórico';
  let saldodeemprestimos = 'Sem Histórico';
  let saldoemcaixa = 'Sem Histórico';
  let telefone = 'Sem Histórico';
  let valoratualdosbens = 'Sem Histórico';
  let valoratualnoestoque = 'Sem Histórico';
  let vendas = 'Sem Histórico';
  let vendasaprazopendentes = 'Sem Histórico';
  let vendasaprazoprojetadas = 'Sem Histórico';
  
    let raio6 = 'insert into raiox values ("'+ cnpj +'","'+ codigoraiox +'","'+ cpfContato +'","'+telefoneContato+'","'+mes+'","'+ vendas +'","'+ custodasvendas +'","'+ despesadasvendas +'","'+ despesasadministrativas+'","'+ investimentos +'","'+ lucroideal +'","'+ lucroidealpercentual +'","'+recebimentodeclientes+'","'+ pagamentoparafornecedores +'","'+vendasaprazoprojetadas+'","'+vendasaprazopendentes+'","'+comprasaprazoprojetadas+'","'+valoratualnoestoque+'","'+valoratualdosbens+'","'+saldoemcaixa+'","'+saldodeemprestimos+'" )' ;
    connection.query(raio6, function(error, results, fields) {
      if (error) throw error;
      connection.end();
      response.json({ fulfillmentText: 'Cadastro realizado com Sucesso!'+"\n\n"+'Seguem algumas opções para atendimento rápido, por favor informe o assunto desejado:'+"\n\n"+'*1* - Soluções Técnicas para Empresas 🚀'+"\n"+'*2* - Cursos e Palestras💼'+"\n"+'*3* - Informações sobre o MEI 👨‍💼👩‍💼'+"\n"+'*4* - Crédito e Programas 💰'+"\n"+'*5* - Controle Finaceiro💲📈'});
    });
}


if (intentName == "finanças") {
var assunto = request.body.queryResult.parameters["financas"];
  
  if (assunto == "raiox") {
    response.json({fulfillmentText: "Ok, entendi *Raio-X*... " + "\n\n" + "A Análise que vou fazer, precisará de algumas informações sobre as movimentações financeiras da sua empresa"+"\n\n"+"Mas fique tranquilo(a), pois esses dados estão protegidos por um código de acesso que você pode criar/alterar sempre que desejar"+"\n\n"+"Preciso que digite _*321*_ para iniciarmos"});
  }
  if (assunto == "fluxodecaixa") {
    response.json({fulfillmentText: "Ok, entendi Fluxo de caixa"+"\n\n"+"Vou solicitar a um(a) consultor(a) que entre em contato"});
  }
  if (assunto == "capitaldegiro") {
    response.json({fulfillmentText: "Ok, entendi que vamos definir qual a Necessidade de Capital de Giro da empresa"+"\n\n"+"Vou solicitar a um(a) consultor(a) que entre em contato"});
  }
  if (assunto == "credito") {
    response.json({fulfillmentText: "Ok, vamos falar sobre cuidados antes de contratar crédito"+"\n\n"+"Vou solicitar a um(a) consultor(a) que entre em contato"});
  } 
  if (assunto == "alterarcodigo") {
    response.json({fulfillmentText: "Ok, vamos iniciar a Alteração do Código de Acesso"+"\n\n"+"Preciso que digite _*1331*_ para validar sua opção"});
  } else {
    response.json({fulfillmentText: "Vou transferir seu pedido para um(a) atendente"});
  }
}

  
if (intentName == "solucoes_tecnicas_individuais") {
var assunto = request.body.queryResult.parameters["solucoestecnicasindividuais"];
  
  if (assunto == "sebraetec") {
    response.json({fulfillmentText: "Ok, entendi *SebraeTEC*"+"\n\n"+"Parceria com SENAI e SENAC voltado ao desenvolvimento de trabalhos técnicos para sua empresa... *Sem custo, pois está 100% financiado pelo SEBRAE*"+"\n\n"+"Use o link abaixo para conversar com o(a) especialista e obter mais informações"+"\n\n"+"https://api.whatsapp.com/send?1=pt_br&phone=551733216493"});
  }
  if (assunto == "inova") {
    response.json({fulfillmentText:  "Ok, entendi *Inova*"+"\n\n"+"Parceria com SENAI e SENAC voltado a ações técnicas e inovadoras para sua empres... *Sem custo, pois está 100% financiado pelo SEBRAE*"+"\n\n"+"Use o link abaixo para conversar com o(a) especialista e obter mais informações"+"\n\n"+"https://api.whatsapp.com/send?1=pt_br&phone=5517981260296"});
  } 
   if (assunto == "ganhosrapidos") {
    response.json({fulfillmentText:  "Ok, entendi *Ganhos Rápidos*"+"\n\n"+"Parceria com o Lean Institute Brasil para entrega de tecnologia e melhoria de processos na sua empresa... *Sem custo, pois está 100% financiado pelo SEBRAE*"+"\n\n"+"Use o link abaixo para conversar com o(a) especialista e obter mais informações"+"\n\n"+"https://api.whatsapp.com/send?1=pt_br&phone=551733216474"});
  }
  if (assunto == "transformacaodigital") {
    response.json({fulfillmentText: "Ok, entendi *Transformação Digital*"+"\n\n"+"Parceria com o Parque Tecnológico da colocar sua empresa nas principais plataformas de e-commerce do Brasil... *Sem custo, pois está 100% financiado pelo SEBRAE*"+"\n\n"+"Use o link abaixo para conversar com o(a) especialista e obter mais informações"+"\n\n"+"https://api.whatsapp.com/send?1=pt_br&phone=551733216474"});
  }  else {
    response.json({fulfillmentText: "Vou transferir seu pedido para um(a) atendente"});
  }
}


  
if (intentName == "CEP") {
    var CEP = request.body.queryResult.parameters["CEP"];
    buscaCep(CEP, { sync: false, timeout: 1000 }).then(endereco => {
      var local = endereco.logradouro +  " - " + endereco.bairro + "\n" + endereco.localidade + " - " + endereco.uf + "\n" + endereco.cep;
      response.json({fulfillmentText: "Ok, seu CEP está confirmado:" + "\n" + local});
    });
}


//ALTERA CADASTRO//ALTERA CADASTRO//ALTERA CADASTRO //contato = 'Nome: '+results[0].Nome+"\n"+'Telefone: '+results[0].Telefone;
if(intentName == 'raio_x'){
 
 let codigoraiox = request.body.queryResult.parameters["codigoraiox"];
 let query = 'select * from raiox where codigoraiox = "'+codigoraiox+'"';

 connection.query(query, function (error, results, fields) {
  
   if (results[0]) {
  response.json({"fulfillmentText": "Código ok = " + codigoraiox + "\n\n"+ "*Informações:* "+"\n\n"+ "_*Mês de Referência:*_ " + results[0].mes + "\n" + "_*Total de Vendas*_ R$ " + results[0].vendas + "\n" + "_*Custo das Vendas:*_ R$ "+ results[0].custodasvendas +"\n"+ "_*Pag/to a Fornecedores :*_ R$ "+results[0].pagamentoparafornecedores+"\n\n"+ "*digite ATUALIZAR para inserir novos valores*" })
  } else {
    response.json({"fulfillmentText": "😬 Acesso Negado!" + "\n\n" + "Digite *321* para tentar novamente"});}
});
}

 else if(intentName == 'raio_x - next'){

 let codigoraiox = request.body.queryResult.outputContexts[0].parameters['codigoraiox'];
 let cnpj = request.body.queryResult.parameters['cnpj'];
 let mes = request.body.queryResult.parameters['mes'];
 let vendas = request.body.queryResult.parameters['vendas'];
 let custodasvendas = request.body.queryResult.parameters['custodasvendas'];
 let despesadasvendas = request.body.queryResult.parameters['despesadasvendas'];
 let despesasadministrativas = request.body.queryResult.parameters['despesasadministrativas'];
 let investimentos = request.body.queryResult.parameters['investimentos'];
 let lucroideal = request.body.queryResult.parameters['lucroideal'];
 let lucroidealpercentual = request.body.queryResult.parameters['lucroidealpercentual'];

 let query = 'update raiox set cnpj = "'+cnpj+'", mes = "'+mes+'", vendas = "'+vendas+'", custodasvendas = "'+custodasvendas+'", despesadasvendas = "'+despesadasvendas+'", despesasadministrativas = "'+despesasadministrativas+'", investimentos = "'+investimentos+'", lucroideal = "'+lucroideal+'", lucroidealpercentual = "'+lucroidealpercentual+'" where codigoraiox = "'+codigoraiox+'"';

 connection.query(query, function (error, results, fields) {
 if (error) throw error;
 connection.end();
 response.json({"fulfillmentText":"Com as informações passadas, já é possível identificar o(s) seguinte(s) dado(s): "+ "\n\n" + "*Ponto de Equilíbrio: R$ _teste_*" + "\n\n" +"Vamos seguir para a Análise de Caixa? "+ "\n\n" +"*SIM* ou *NÃO*"})
 });
 }

   
 else if(intentName == 'raio_x - next - yes'){
 let codigoraiox = request.body.queryResult.outputContexts[0].parameters['codigoraiox'];
 let recebimentodeclientes = request.body.queryResult.parameters['recebimentodeclientes'];
 let pagamentoparafornecedores = request.body.queryResult.parameters['pagamentoparafornecedores'];
 
 let query = 'update raiox set recebimentodeclientes = "'+recebimentodeclientes+'", pagamentoparafornecedores = "'+pagamentoparafornecedores+'" where codigoraiox = "'+codigoraiox+'"';
     
 connection.query(query, function (error, results, fields) {
 if (error) throw error;
 connection.end();
 response.json({"fulfillmentText":"Com as informações passadas, já é possível identificar o(s) seguinte(s) dado(s): "+ "\n\n" + "*Análise de Caixa: R$ _teste_*" + "\n\n" +"Vamos seguir para o Balanço Financeiro? "+ "\n\n" +"*SIM* ou *NÃO*"})
 }); }  

  

 else if(intentName == 'raio_x - next - yes - yes'){
   
 let codigoraiox = request.body.queryResult.outputContexts[0].parameters['codigoraiox'];
 let vendasaprazoprojetadas = request.body.queryResult.parameters['vendasaprazoprojetadas'];
 let vendasaprazopendentes = request.body.queryResult.parameters['vendasaprazopendentes'];
 let comprasaprazoprojetadas = request.body.queryResult.parameters['comprasaprazoprojetadas'];
 let valoratualnoestoque = request.body.queryResult.parameters['valoratualnoestoque'];
 let valoratualdosbens = request.body.queryResult.parameters['valoratualdosbens'];
 let saldoemcaixa = request.body.queryResult.parameters['saldoemcaixa'];
 let saldodeemprestimos = request.body.queryResult.parameters['saldodeemprestimos'];

 let query = 'update raiox set vendasaprazoprojetadas = "'+vendasaprazoprojetadas+'", vendasaprazopendentes = "'+vendasaprazopendentes+'", comprasaprazoprojetadas = "'+comprasaprazoprojetadas+'", valoratualnoestoque = "'+valoratualnoestoque+'", valoratualdosbens = "'+valoratualdosbens+'", saldoemcaixa = "'+saldoemcaixa+'", saldodeemprestimos = "'+saldodeemprestimos+'" where codigoraiox = "'+codigoraiox+'"';

 connection.query(query, function (error, results, fields) {
 if (error) throw error;
 connection.end();
 response.json({"fulfillmentText":"Com as informações passadas, já é possível identificar o(s) seguinte(s) dado(s): "+ "\n\n" + "*Balanço Financeiro: R$ _teste_*" + "\n\n" +"Entraremos em contato em breve"})
 }); }  

 
  

if(intentName == 'alteracodigo'){
 
 let telefone = request.body.queryResult.parameters["telefone"];
 let codigoraiox = request.body.queryResult.parameters["codigoraiox"];
 
  let query = 'select * from raiox where telefone = "'+telefone+'"';
  connection.query(query, function (error, results, fields) {
   
    if (results[0]) {
 
      let vericode = 'select * from raiox where codigoraiox = "'+codigoraiox+'"';
      connection.query(vericode, function (error, results, fields) {
      
        if (results[0]) {
        response.json({"fulfillmentText": "*Cadastro Encontrado*" + "\n\n" + "Continuar com o processo de ateração?" + "\n\n" + "*SIM* ou *NÃO* ?"});
         } else {
    response.json({"fulfillmentText": "😬 Acesso Negado!" + "\n\n" + "Digite *1331* para tentar novamente"});} 
});

   } else {
    response.json({"fulfillmentText": "😬 Acesso Negado!" + "\n\n" + "Digite *1331* para tentar novamente"});}
});
}

  
  else if(intentName == 'alteracodigo - yes'){
 
  let cpforigem = request.body.queryResult.outputContexts[0].parameters['cpf'];
  let cpfContato = cpforigem.replace(/\.|\-/g, '');
  let codigoraioxNOVO = request.body.queryResult.parameters['codigoraioxNOVO']
    
 let query = 'update raiox set codigoraiox = "'+codigoraioxNOVO+'" where cpf = "'+cpfContato+'"';
   
 connection.query(query, function (error, results, fields) {
 if (error) throw error;
 connection.end();
 response.json({"fulfillmentText":"*Código de Acesso Alterado com Sucesso*"+"\n\n"+"_Por favor informe o assunto desejado:_"+"\n\n"+'*1* - Soluções Técnicas para Empresas 🚀'+"\n"+'*2* - Cursos e Palestras💼'+"\n"+'*3* - Informações sobre o MEI 👨‍💼👩‍💼'+"\n"+'*4* - Crédito e Programas 💰'+"\n"+'*5* - Controle Finaceiro💲📈'})
 });
}



  
 if (intentName == "excluirCADASTRO") {
    let cpfContato = request.body.queryResult.parameters["cpf"];
    let query = 'delete from cadastro where cpf = "' + cpfContato + '"';

    connection.query(query, function(error, results, fields) {
      if (error) throw error;
      connection.end();
      response.json({ fulfillmentText: "Contato Apagado com Sucesso!" });
    });
  }


if(intentName == 'cursos'){
 console.log('Procura Cursos');

 let formatoContato = request.body.queryResult.parameters["formato"];
 let query = 'select * from cursos where formato = "'+formatoContato+'"';
 
 connection.query(query, function (error, results, fields) {

   let respostaCURSO = ''
   
   for (let camada = 0; camada < results.length; camada = camada+1){
     let cursoContatoBD = results[camada].temadocurso
     let localcursoBD = results[camada].local
     respostaCURSO = respostaCURSO + "\n\n" + cursoContatoBD + ' em ' +localcursoBD;}
   
 if (results.lenght == 0) {
 respostaCURSO = 'NÃO TEM CURSO'}

response.json({ fulfillmentText: 'Ok!' + "\n\n" + 'Verifiquei que temos a(s) opção(ões) abaixo: ' + respostaCURSO });
 })
}



});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});