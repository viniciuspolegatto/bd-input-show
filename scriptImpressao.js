const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj;
  const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
  const options = { method: 'GET', headers: { Accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send(`Erro ao buscar dados do CNPJ: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
