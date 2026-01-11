import mysql2 from "mysql2/promise.js"
import dbConfig from "./db.env.js"

const pool = mysql2.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: 3300
})

pool.getConnection()
  .then((conn) => {
    console.log("DATABASE CONNECTED")
    conn.release()
  })
  .catch((err) => console.log(err))

export default pool