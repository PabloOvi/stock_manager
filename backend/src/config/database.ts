import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD as string;
const db_name = process.env.DB_NAME;

if (!db_host || !db_user || !db_name) {
    throw new Error("Faltan variables de entorno para la conexión a la base de datos");
}

const pool = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
