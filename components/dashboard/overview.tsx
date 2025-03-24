"use client";

import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    name: "Saúde do sistema",
    value: 98,
    description: "Desempenho geral do sistema",
  },
  {
    name: "Tempo de atividade da API",
    value: 99.9,
    description: "Disponibilidade do serviço",
  },
  {
    name: "Carga de fila",
    value: 45,
    description: "Capacidade da fila de mensagens",
  },
];

export function Overview() {
  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="space-y-2">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{metric.name}</p>
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
            <p className="font-bold">{metric.value}%</p>
          </div>
          <Progress value={metric.value} />
        </div>
      ))}
    </div>
  );
}