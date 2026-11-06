const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', app: 'MediTriage' }));
}).listen(3000, () => console.log('MediTriage en puerto 3000'));
