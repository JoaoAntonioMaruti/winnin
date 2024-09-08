import PgBoss from 'pg-boss';
import { config } from './../config';

const boss = new PgBoss(config.databaseConnectionUrl);

async function sendToQueue() {
  try {
    await boss.start();
    await boss.send('reddit-task', { message: 'Hello, World!' });
    console.log('Tarefa enviada para a fila');
  } catch (error) {
    console.error('Erro ao enviar tarefa para a fila:', error);
  } finally {
    // Dê um tempo para garantir que a tarefa seja processada antes de parar
    await new Promise(resolve => setTimeout(resolve, 5000));
    await boss.stop();
  }
}

async function worker() {
  try {
    await boss.start();
    console.log('Processador de tarefas iniciado');

    boss.work('reddit-task', async (job: any) => {
      console.log('Processando tarefa:', job.data.message);
      // Simule o processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      return 'Done';
    });
  } catch (error) {
    console.error('Erro no worker:', error);
  }
}
export { worker, sendToQueue };
