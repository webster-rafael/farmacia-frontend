// Tipo que define os dados que serão coletados do usuário
export interface UserData {
    cpf?: string;
    name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    date_birth?: string;
    city?: string;
    state?: string;
  }
  
  // Tipo que define o progresso do usuário
  export interface UserProgress {
    step: number; // Qual etapa o usuário está no fluxo
    data: UserData; // Dados do usuário coletados até o momento
  }
  
  // Objeto para controlar o progresso de cada usuário, onde a chave é o número de telefone
  export const userProgress: { [key: string]: UserProgress } = {};
  