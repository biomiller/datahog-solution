import express from "express"

const app = express()
const PORT = 3001

app.listen(PORT, () => console.log(`App running on port ${PORT}`))