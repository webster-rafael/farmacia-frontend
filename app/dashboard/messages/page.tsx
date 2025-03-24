"use client";
import { MessagesList } from "@/components/dashboard/messages-list";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const MessagesPage = () => {
  const [stats, setStats] = useState({
    messagesReceived: 0, // Mensagens recebidas no dia
  });

  // Função assíncrona para buscar a quantidade de mensagens totais
  const fetchMessagesCount = async () => {
    try {
      const res = await fetch("http://localhost:8000/messagesCount");
      const data = await res.json();
      // Caso queira usar a quantidade total de mensagens em outro estado:
      setStats((prevStats) => ({
        ...prevStats,
        messagesReceived: data.messagesReceived, // Exemplo de como pode ajustar o estado
      }));
    } catch (error) {
      console.error("Erro ao buscar a quantidade de mensagens:", error);
    }
  };

  useEffect(() => {
    // Primeira chamada para carregar as mensagens
    fetchMessagesCount();

    // Intervalo de 20 segundos para buscar novas mensagens
    const interval = setInterval(() => {
      fetchMessagesCount();
    }, 10000); // 20000ms = 20 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-bold">Mensagens</h1>

      <div className="">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Todas as mensagens
          </h3>
          <p className="text-2xl font-bold">{stats.messagesReceived}</p>
        </Card>
      </div>

      <div className="w-full">
        <Card className="w-full p-6">
          <h3 className="mb-4 text-lg font-medium">Todas as mensagens</h3>
          <MessagesList />
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
