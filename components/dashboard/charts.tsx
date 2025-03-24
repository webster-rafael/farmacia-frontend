"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";

export function LineChart() {
  const [lineData, setLineData] = useState([]);

  // Função assíncrona para buscar a quantidade de mensagens por dia da semana
  const fetchMessagesByDay = async () => {
    try {
      const res = await fetch("http://localhost:8000/messagesByDay");
      const data = await res.json();
      setLineData(data); // Atualiza os dados no estado
    } catch (error) {
      console.error("Erro ao buscar mensagens por dia da semana:", error);
    }
  };

  // UseEffect para carregar os dados do gráfico ao montar o componente
  useEffect(() => {
    fetchMessagesByDay(); // Chama a função quando o componente é montado
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          name="Mensagens"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function BarChart() {
  interface FormattedBarData {
    name: string;
    value: number;
  }

  interface DayData {
    date: string;
    count: number;
  }

  const [barData, setBarData] = useState<FormattedBarData[]>([]);

  // Função para pegar os dados dos usuários dos últimos 5 dias
  useEffect(() => {
    const fetchUsersLast5Days = async () => {
      try {
        const res = await fetch("http://localhost:8000/usersLast5Days");
        const data = await res.json();

        // Função para formatar a data para "dd/mm"
        const formatDate = (date: string) => {
          const [year, month, day] = date.split("-"); // Pegando a data do backend
          return `${day}/${month}`; // Formatando para "dd/mm"
        };

        // Criando a lista de dados formatados para os últimos 5 dias
        const formattedBarData: FormattedBarData[] = data.last5Days.map(
          (dayData: DayData) => {
            const formattedDate = formatDate(dayData.date); // Formatando a data para "dd/mm"
            return {
              name: formattedDate, // Exibe a data formatada
              value: dayData.count, // Contagem de usuários
            };
          },
        );

        setBarData(formattedBarData); // Atualiza os dados no estado
      } catch (error) {
        console.error("Erro ao buscar usuários dos últimos 5 dias:", error);
      }
    };

    fetchUsersLast5Days();
  }, []); // Dependências vazias para rodar apenas uma vez na montagem

  const maxValue = Math.max(...barData.map((d) => d.value), 0) + 1;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" allowDecimals={false}/>
        <YAxis domain={[0, maxValue]} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--primary))" name={"Usuários"} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
