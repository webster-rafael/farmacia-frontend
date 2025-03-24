const venom = require("venom-bot");
import axios from "axios";
import { userProgress } from "./userProgress";

console.log("Iniciando o bot...");
venom
  .create("session-farmacia", undefined, undefined, {
    headless: false,
  })
  .then(
    (client: {
      onMessage: (arg0: (message: any) => Promise<void>) => void;
      sendText: (arg0: any, arg1: string) => any;
    }) => {
      console.log("Bot iniciado com sucesso!");

      client.onMessage(
        async (message: { isGroupMsg: boolean; from: any; body: string }) => {
          if (message.isGroupMsg === false) {
            let user = message.from;
            let userMessage = message.body ? message.body.toLowerCase() : "";

            // Verifica se o usuário já está no fluxo de cadastro
            if (!userProgress[user]) {
              userProgress[user] = { step: 0, data: {} };
              await client.sendText(
                user,
                "Olá! Eu sou o Farmacinho 🤖. Para começar, preciso do seu CPF. Digite ele aí para a gente! 💻"
              );
              console.log(`Iniciando o fluxo para o usuário: ${user}`);
              return;
            }

            const { step, data } = userProgress[user];

            // Fluxo de coleta de dados
            switch (step) {
              case 0: // Pergunta CPF
                if (userMessage.length === 11) {
                  data.cpf = userMessage;
                  userProgress[user].step++;
                  await client.sendText(
                    user,
                    "✅ CPF recebido com sucesso! Agora, me diga seu nome, por favor. 😉"
                  );
                  console.log(`CPF recebido para o usuário ${user}`);
                } else {
                  await client.sendText(
                    user,
                    "⚠️ O CPF não parece válido. Digite um CPF com 11 números, sem pontuação! 😅"
                  );
                }
                break;

              case 1: // Pergunta Nome
                if (userMessage.length > 1 && userMessage.length < 45) {
                  data.name = userMessage;
                  userProgress[user].step++;
                  await client.sendText(
                    user,
                    `Maravilha, ${data.name}! 😎 Agora, me passe seu sobrenome.`
                  );
                  console.log(`Nome recebido para o usuário ${user}`);
                } else {
                  await client.sendText(
                    user,
                    "⚠️ Por favor, insira um nome válido. 🤔 Não vale só um 'A' ou algo curto, hein! 😁"
                  );
                }
                break;

              case 2: // Pergunta Sobrenome
                if (userMessage.length > 1 && userMessage.length < 45) {
                  data.last_name = userMessage;
                  userProgress[user].step++; // Avança para o próximo passo
                  await client.sendText(
                    user,
                    `Perfeito, ${data.name} ${data.last_name}! 💥 Agora, me fale o seu número de telefone (somente os números, por favor).`
                  );
                } else {
                  await client.sendText(
                    user,
                    "⚠️ Sobrenome inválido! Digite um sobrenome válido, com mais de 1 letra. 😉"
                  );
                }
                break;

              case 3: // Pergunta Telefone
                if (userMessage.match(/^\d{2}\d{9}$/)) {
                  data.phone = userMessage;
                  userProgress[user].step++; // Avança para o próximo passo
                  await client.sendText(
                    user,
                    `📱 Número de telefone recebido! Agora, por favor, me envie seu e-mail. ✉️`
                  );
                } else {
                  await client.sendText(
                    user,
                    "⚠️ Número de telefone inválido! Digite apenas os números, sem espaços ou outros caracteres."
                  );
                }
                break;

              case 4: // Pergunta E-mail
                if (userMessage.includes("@")) {
                  data.email = userMessage;
                  userProgress[user].step++; // Avança para o próximo passo
                  await client.sendText(
                    user,
                    `📧 E-mail recebido com sucesso! Agora, me diga sua data de nascimento. Exemplo: 01-01-2000. 🎂`
                  );
                } else {
                  await client.sendText(
                    user,
                    "⚠️ E-mail inválido! Por favor, insira um e-mail válido com @. 😬"
                  );
                }
                break;

              case 5: // Pergunta Data de nascimento
                const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/; // Expressão regular para verificar o formato DD-MM-YYYY

                if (userMessage.match(dateRegex)) {
                  const match = userMessage.match(dateRegex);
                  if (match) {
                    const [day, month, year] = match.slice(1); // Pega o dia, mês e ano
                    const formattedDate = `${year}-${month}-${day}`; // Formata para YYYY-MM-DD
                    data.date_birth = formattedDate;
                    userProgress[user].step++; // Avança para o próximo passo
                    await client.sendText(
                      user,
                      `🎉 Data de nascimento recebida com sucesso! Agora, por favor, me diga sua cidade. 🏙️`
                    );
                  } else {
                    await client.sendText(
                      user,
                      "⚠️ A data não está no formato correto. Tente novamente no formato DD-MM-YYYY. 🗓️"
                    );
                  }
                }
                break;

              case 6: // Pergunta Cidade
                if (userMessage.length > 1 && userMessage.length < 45) {
                  data.city = userMessage;
                  userProgress[user].step++; // Avança para o próximo passo
                  await client.sendText(
                    user,
                    `🗺️ Cidade registrada! Agora, por último, me passe a sigla do seu estado. Exemplo: MS. 🌎`
                  );
                } else {
                  await client.sendText(
                    user,
                    "⚠️ Cidade inválida! Por favor, digite uma cidade válida. 🏙️"
                  );
                }
                break;

              case 7: // Pergunta Estado
                if (userMessage.length > 1 && userMessage.length < 45) {
                  data.state = userMessage;

                  try {
                    // Enviar dados ao backend via a rota "/users"
                    const response = await axios.post(
                      "http://localhost:3000/users",
                      data
                    );
                    console.log(
                      `Cadastro finalizado para o usuário ${user}`,
                      data
                    );

                    await client.sendText(
                      user,
                      `🎉 Uhul! Cadastro finalizado com sucesso, ${data.name}! 🥳 Estamos preparando tudo para te atender. 👨‍⚕️💊`
                    );
                  } catch (error) {
                    console.error("Erro ao enviar dados para o backend", error);
                    await client.sendText(
                      user,
                      "🚨 Oops, ocorreu um erro ao realizar seu cadastro. Tente novamente mais tarde. 😞"
                    );
                  }

                  // Não fechar o bot aqui se você quer manter a sessão aberta para novos usuários
                  // client.close(); // Isso pode ser opcional dependendo do fluxo desejado
                } else {
                  await client.sendText(
                    user,
                    "⚠️ Estado inválido! Digite a sigla do seu estado corretamente. 🏞️"
                  );
                }
                break;

              default:
                break;
            }
          }
        }
      );
    }
  )
  .catch((error: any) => {
    console.error("Erro ao iniciar o bot:", error);
  });
