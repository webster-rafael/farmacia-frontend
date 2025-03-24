// pages/api/whatsapp.ts

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dados mockados (substitua com a lógica real de obtenção dos dados)
  const data = {
    messagesSent: 1234,
    deliveryRate: 98.5,
    responseRate: 85.2,
    activeUsers: 456,
  };

  res.status(200).json(data);  // Retorna os dados no formato JSON
}
