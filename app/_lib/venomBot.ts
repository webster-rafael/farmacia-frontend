import * as venom from "venom-bot";

// Instância global do cliente
let client: venom.Whatsapp | null = null;

// Função para criar a conexão
export const createConnection = async () => {
  if (!client) {
    try {
      let base64Qr: string = ""; // Inicializa a variável do QR Code

      // Criação da instância do Venom Bot
      client = await venom.create(
        "default",
        (qr: string) => {
          base64Qr = qr; // Guarda o QR Code gerado
          console.log("QR Code gerado:", base64Qr);
        },
        undefined,
        {
          headless: "new", // Para mostrar a janela do navegador
          logQR: true, // Ativa o log do QR
          session: "default", // Nome da sessão
        }
      );

      // Configurações adicionais, como escutar mensagens
      client.onMessage((message) => {
        console.log("Mensagem recebida:", message);
      });

      // Retorna o estado da conexão e o QR Code
      return { state: "CONNECTED", qrCode: base64Qr };
    } catch (error: any) {
      console.error("Erro ao conectar com o bot:", error);
      return {
        state: "ERROR",
        message: error.message,
      };
    }
  } else {
    // Se já existe a conexão, retorna o estado
    return { state: "CONNECTED" };
  }
};

// Função para encerrar a conexão
export const closeConnection = () => {
  if (client) {
    client.close();
    client = null; // Limpa a instância global
  }
};

export const getConnectionStatus = () => {
  return client ? { state: "CONNECTED" } : { state: "DISCONNECTED" };
};
