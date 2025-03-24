"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageStore } from "@/src/store/useStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Componente de lista de mensagens
export function MessagesList() {
  const { messages, fetchMessages, loading } = useMessageStore();
  const pathname = usePathname();

  // Carrega as mensagens assim que o componente for montado
  useEffect(() => {
    // Primeira chamada para carregar as mensagens
    fetchMessages();

    // Intervalo de 20 segundos para buscar novas mensagens
    const interval = setInterval(() => {
      fetchMessages();
    }, 10000); // 20000ms = 20 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    const withoutCountryCode = cleanedNumber.replace(/^55/, "");
    return withoutCountryCode;
  };

  return (
    <ScrollArea
      className={`${
        pathname === "/dashboard/messages" ? "h-[500px]" : "h-[300px]"
      } w-full`}
    >
      <div className="space-y-4">
        {loading ? (
          <div className="">Carregando mensagens...</div>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex w-full flex-col items-center rounded-lg border p-4"
            >
              <div className="flex w-full items-center justify-between py-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex gap-2">
                    <p className="font-medium">
                      {formatPhoneNumber(message.from)}
                    </p>
                    <span>|</span>
                    <p className="font-medium">{message?.notifyName}</p>
                  </div>
                </div>
                <div className="flex text-right">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(message.timestamp)}
                  </p>
                  <p className="text-sm capitalize">{message.status}</p>
                </div>
              </div>
              <p className="w-full text-sm text-zinc-500">{message.body}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-600">
            Nenhuma mensagem encontrada.
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
