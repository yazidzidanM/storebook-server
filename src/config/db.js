import mysql2 from "mysql2/promise.js"
import dbConfig from "./db.env.js"

const db = mysql2.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
})

db.getConnection()
  .then((conn) => {
    console.log("DATABASE CONNECTED")
    conn.release()
  })
  .catch((err) => console.log(err))

export default db