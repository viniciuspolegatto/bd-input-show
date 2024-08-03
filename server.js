const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');
});

// Rota para adicionar um novo cadastro
app.post('/add', (req, res) => {
  const { email, cpf, nome } = req.body;
  const query = 'INSERT INTO CADASTRO (email, cpf, nome) VALUES (?, ?, ?)';
  connection.query(query, [email, cpf, nome], (err, result) => {
    if (err) throw err;
    res.redirect('/search.html');
  });
});

// Rota para buscar um cadastro por CPF
app.post('/search', (req, res) => {
  const { cpf } = req.body;
  const query = 'SELECT * FROM CADASTRO WHERE cpf = ?';
  connection.query(query, [cpf], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect(`/results.html?cpf=${cpf}`);
    } else {
      res.send('<script>alert("CPF NÃO ENCONTRADO, FAVOR CADASTRAR");window.location.href="/search.html";</script>');
    }
  });
});

// Rota para buscar todos os cadastros
app.get('/all', (req, res) => {
  const query = 'SELECT * FROM CADASTRO LIMIT 10';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para obter dados de um CPF específico
app.get('/details', (req, res) => {
  const { cpf } = req.query;
  const query = 'SELECT * FROM CADASTRO WHERE cpf = ?';
  connection.query(query, [cpf], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para excluir um cadastro por CPF
app.post('/delete', (req, res) => {
  const { cpf } = req.body;
  const query = 'DELETE FROM CADASTRO WHERE cpf = ?';
  connection.query(query, [cpf], (err, result) => {
    if (err) throw err;
    res.redirect('/search.html');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
