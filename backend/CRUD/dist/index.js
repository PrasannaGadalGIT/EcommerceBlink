"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
const cors = require('cors');
const userRoute = require('./routes/users');
let corsOptions = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use('/', userRoute);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
