import * as venom from "venom-bot";
import { NextApiRequest, NextApiResponse } from "next";

let client: venom.Whatsapp | null = null; // Armazenar a instância do cliente

// Função para encerrar a instância do Venom Bot
const stopBot = async () => {
  if (client) {
    try {
      await client.close(); // Encerra a instância do bot
      client = null; // Limpa a instância
      console.log("Bot foi encerrado com sucesso.");
    } catch (error) {
      console.error("Erro ao encerrar o bot:", error);
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Verifica se o bot já está rodando, se não, apenas responde
    if (!client) {
      return res.status(400).json({ message: "Bot não está ativo." });
    }

    // Caso o bot esteja ativo, encerra a instância
    await stopBot();

    // Responde com sucesso após o encerramento
    res.status(200).json({ message: "Bot encerrado com sucesso." });
  } else {
    res.status(405).json({ message: "Método não permitido." });
  }
}
