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