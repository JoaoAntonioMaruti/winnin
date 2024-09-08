import { createServer } from 'http';
import logger from 'infra/logger';

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
  } else {
    res.end('Página não encontrada');
  }
});

const HPPT_PORT = 4000 || process.env.APP_PORT;

server.listen(HPPT_PORT, () => logger.info(`server is running on ${HPPT_PORT}`));
