// testBot.ts
const venom = require('venom-bot');

venom
  .create('session-farmacia', undefined, undefined, { headless: false })
  .then((client: any) => {
    console.log("Bot iniciado com sucesso!");
    client.onMessage((message: any) => {
      console.log(`Mensagem recebida: ${message.body}`);
    });
  })
  .catch((error: any) => {
    console.error('Erro ao iniciar o bot:', error);
  });
