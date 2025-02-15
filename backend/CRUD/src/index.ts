import { PrismaClient } from "@prisma/client";
import express from "express"
const app = express();
const client = new PrismaClient();

const cors = require('cors')
const userRoute = require('./routes/users')

let corsOptions = {
    origin : ['http://localhost:3000'],
 }

 app.use(cors(corsOptions))
app.use(express.json())

app.use('/', userRoute)
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})