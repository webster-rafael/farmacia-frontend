// import * as venom from "venom-bot";
// import { NextApiRequest, NextApiResponse } from "next";

// interface Message {
//   id: string;
//   body: string;
//   notifyName: string;
//   from: string;
//   timestamp: string;
// }

// let receivedMessages: Message[] = []; // Armazenar as mensagens

// let client: venom.Whatsapp | null = null; // Armazenar a instância do cliente

// // Função para iniciar o bot (se não estiver iniciado)
// const startBot = async () => {
//   if (!client) {
//     try {
//       client = await venom.create(
//         "default",
//         (base64Qr: string) => {
//           console.log("QR Code gerado: ", base64Qr);
//         },
//         undefined,
//         {
//           headless: "new", // "new" para a versão headless do navegador
//           logQR: true, // Para logar o QR Code
//           session: "default", // Nome da sessão
//         }
//       );

//       // Escutando as mensagens recebidas
//       client.onMessage((message) => {
//         console.log("Mensagem recebida:", message);
//         // Armazena a mensagem recebida na variável
//         receivedMessages.push({
//           id: message.id, // Garantir que a mensagem tenha um ID único
//           from: message.from,
//           body: message.body,
//           timestamp: new Date(message.timestamp * 1000).toLocaleString(), // Converte o timestamp
//           notifyName: message.notifyName,
//         });
//       });
//     } catch (error) {
//       console.error("Erro ao iniciar o bot:", error);
//     }
//   }
// };

// // Função para enviar uma mensagem
// const sendMessage = async (to: string, message: string) => {
//   if (client) {
//     try {
//       await client.sendText(to, message);
//       console.log("Mensagem enviada:", message);
//     } catch (error) {
//       console.error("Erro ao enviar mensagem:", error);
//     }
//   } else {
//     console.log("Bot não está ativo.");
//   }
// };

// // Função para encerrar o bot
// const stopBot = async () => {
//   if (client) {
//     try {
//       await client.close(); // Encerra a instância do bot
//       client = null; // Limpa a instância
//       console.log("Bot foi encerrado com sucesso.");
//     } catch (error) {
//       console.error("Erro ao encerrar o bot:", error);
//     }
//   }
// };

// // Função para verificar o estado da conexão
// const getConnectionStatus = () => {
//   return client ? "CONNECTED" : "DISCONNECTED";
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     // Verificar o status da conexão antes de retornar as mensagens
//     const connectionStatus = getConnectionStatus();

//     if (connectionStatus === "DISCONNECTED") {
//       await startBot(); // Inicia o bot, se não estiver iniciado
//     }

//     // Retorna o status da conexão e as mensagens
//     res.status(200).json({
//       connectionStatus,
//       messages: receivedMessages,
//     });
//   } else if (req.method === "POST") {
//     // Se o método for POST, o usuário está tentando enviar uma mensagem
//     const { to, message } = req.body;

//     // Envia a mensagem
//     if (!to || !message) {
//       return res
//         .status(400)
//         .json({ message: "Dados inválidos. Envie 'to' e 'message'." });
//     }

//     try {
//       await sendMessage(to, message);
//       res.status(200).json({ message: "Mensagem enviada com sucesso!" });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Erro ao enviar a mensagem.", error: (error as any).message });
//     }
//   } else if (req.method === "DELETE") {
//     // Se o método for DELETE, vamos parar o bot
//     await stopBot();
//     res.status(200).json({ message: "Bot encerrado com sucesso." });
//   } else {
//     res.status(405).json({ message: "Método não permitido." });
//   }
// }
