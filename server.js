// server.js
const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy/cnpj/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj;
  const options = {
    hostname: 'receitaws.com.br',
    path: `/v1/cnpj/${cnpj}`,
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  https.request(options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      res.send(JSON.parse(data));
    });
  }).end();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
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