// import * as venom from "venom-bot";
// import { NextApiRequest, NextApiResponse } from "next";

// let client: venom.Whatsapp | null = null;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     // Verifica se já existe uma instância de cliente
//     if (client === null) {
//       try {
//         // Criação da instância do Venom Bot
//         client = await venom.create(
//           "default",
//           (base64Qr: string) => {
//             // Aqui retornamos o QR Code
//             res
//               .status(200)
//               .json({ qrCode: base64Qr, state: "WAITING_FOR_SCAN" });
//           },
//           undefined,
//           {
//             headless: "new", // Evita a tela do navegador abrir
//             logQR: true, // Ativa o log do QR
//             session: "default", // Nome da sessão
//           }
//         );

//         // O cliente foi criado e o QR Code será gerado
//       } catch (error: any) {
//         console.error("Erro ao conectar com o bot:", error);
//         res
//           .status(500)
//           .json({
//             message: "Erro ao conectar com o bot.",
//             error: error.message,
//           });
//       }
//     } else {
//       // Se o cliente já estiver conectado, retorne um estado de "conectado"
//       res.status(200).json({ state: "CONNECTED" });
//     }
//   } else {
//     res.status(405).json({ message: "Método não permitido." });
//   }
// }
