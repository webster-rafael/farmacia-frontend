import mysql from "mysql2";

// Lê as variáveis de ambiente e converte o valor da porta para número
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT
  ? Number(process.env.DATABASE_PORT)
  : 3306; // Definindo 3306 como padrão
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

// Valida se todos os parâmetros necessários estão definidos
if (!host || !user || !password || !database) {
  throw new Error("Faltando informações de conexão no arquivo .env");
}

// Criação da conexão com o banco de dados
const conexao = mysql.createConnection({
  host: host,
  port: port, // A porta agora é um número
  user: user,
  password: password,
  database: database,
});

// Função para retornar a conexão com o banco
export const getConnection = () => conexao;

// Função para realizar consultas ao banco
interface QueryParams {
  sql: string;
  params?: any[];
}

export const query = ({ sql, params }: QueryParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, params, (err: mysql.QueryError | null, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
