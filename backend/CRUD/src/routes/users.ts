import express from "express"
const UserController = require('../controller/users')
import { PrismaClient } from "@prisma/client";
import {Request, Response}from "express"
const client = new PrismaClient();
const app = express()

app.post("/users", UserController.createUser)

app.post("/users/:id", UserController.deleteProfile)

module.exports = app