import app from "./application.js"
import env from "./env"
import pool from "#config/db"

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${env.PORT}`)
      console.log(`swagger http://localhost:${env.PORT}/api-docs`)
    })
    pool
  } catch (err) {
    console.error("❌ Server failed to start", err)
    process.exit(1)
  }
}

startServer()