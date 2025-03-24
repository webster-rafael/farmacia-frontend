import { MessageProps } from "@/types/types";
import { create } from "zustand";

interface MessageStore {
  messages: MessageProps[];
  loading: boolean;
  fetchMessages: () => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  loading: false,

  fetchMessages: async () => {
    set({ loading: true });

    try {
      const response = await fetch("http://localhost:8000/getMessages");
      const data = await response.json();

      console.log("Resposta da API:", data); // Log para debug

      // Verifica se 'messages' existe na resposta antes de atualizar o estado
      if (data && Array.isArray(data.messages)) {
        set({ messages: data.messages });
      } else {
        console.error("Resposta inválida: 'messages' não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
