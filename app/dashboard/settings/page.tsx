"use client";
import Image from "next/image";
import { useState } from "react";

const SettingsPage = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  // Função para fazer a requisição para pegar o QR Code
  const fetchQRCode = async () => {
    setLoading(true); // Inicia o carregamento

    try {
      const response = await fetch("http://localhost:8000/create-connection"); // URL da sua API no Next.js
      const data = await response.json();
      console.log(data);

      if (data.qrCode) {
        setQrCode(data.qrCode); // Armazena o QR Code no estado
      }
      if (data.state === "CONNECTED") {
        setConnected(true);
      }
    } catch (error) {
      console.error("Erro ao pegar o QR Code:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="flex min-h-[calc(90vh-20%)] flex-col items-center justify-center p-4 text-black">
      <h1 className="mb-6 text-3xl font-semibold">Gerar QR Code do WhatsApp</h1>

      {/* Botão para gerar o QR Code */}
      <button
        onClick={() => {
          fetchQRCode();
        }}
        disabled={loading || connected}
        className="mb-6 rounded-lg bg-black px-6 py-3 font-semibold text-white transition duration-300 hover:bg-gray-700"
      >
        {loading
          ? "Gerando QR Code..."
          : connected
            ? "Bot já conectado"
            : "Gerar QR Code"}
      </button>

      {qrCode ? (
        // Exibe o QR Code como imagem usando a string base64
        <div className={`text-center ${connected && "hidden"}`}>
          <h2 className="mb-4 text-xl font-medium">QR Code Gerado</h2>
          <Image width={200} height={200} src={qrCode} alt="QR Code" />
        </div>
      ) : connected ? (
        <p className="text-lg text-gray-600">
          Você já tem uma instância conectada.
        </p>
      ) : (
        <p className="text-lg text-gray-600">
          Pressione o botão para gerar o QR Code.
        </p>
      )}
    </div>
  );
};

export default SettingsPage;
