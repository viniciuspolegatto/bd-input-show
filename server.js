// Nome do Arquivo: server.js

const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST, //bgnymdsubmecgymv1d9v-mysql.services.clever-cloud.com
  user: process.env.MYSQL_USER, //uoz9zbjbmoc2wluj
  password: process.env.MYSQL_PASS, //noXqoLIyeVMPH1aPKFSp
  database: process.env.MYSQL_DB //bgnymdsubmecgymv1d9v
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para busca de CNPJ
app.get('/cnpj/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj;
  const options = {
    method: 'GET',
    hostname: 'receitaws.com.br',
    path: `/v1/cnpj/${cnpj}`,
    headers: { Accept: 'application/json' }
  };

  const apiReq = https.request(options, (apiRes) => {
    const chunks = [];
    apiRes.on('data', (chunk) => { chunks.push(chunk); });
    apiRes.on('end', () => {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  apiReq.on('error', (e) => { res.status(500).send(e.message); });
  apiReq.end();
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para adicionar dados ao banco de dados
app.post('/addData', (req, res) => {
  const { nome, cpf, email, tel, endereco } = req.body;
  const query = 'INSERT INTO ClientesSEBRAE (nome, cpf, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
  
  console.log('Dados recebidos:', { nome, cpf, email, tel, endereco });

  db.query(query, [nome, cpf, email, tel, endereco], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados: ' + err.message);
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados adicionados ao banco de dados');
  });
});

// Rota para buscar todos os dados cadastrados
app.get('/buscarCadastro/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT nome, cpf, telefone FROM ClientesSEBRAE WHERE cpf LIKE ?';
  
  db.query(query, [cpf + '%'], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    res.json(results);
  });
});

// Rota para buscar informações detalhadas de um CPF específico
app.get('/buscarPorCpf/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT * FROM ClientesSEBRAE WHERE cpf = ?';
  
  db.query(query, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
