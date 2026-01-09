import app from "./app.js"
import env from "./env.js"
import db from "#config/db"
const startServer = async () => {
  try {
    db

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${env.PORT}`)
    })
  } catch (err) {
    console.error("❌ Server failed to start", err)
    process.exit(1)
  }
}

startServer()