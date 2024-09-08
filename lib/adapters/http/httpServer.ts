import { createServer } from 'http';

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
  } else {
    res.end('Página não encontrada');
  }
});

const PORT = 4000 || process.env.APP_PORT;

server.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
});
