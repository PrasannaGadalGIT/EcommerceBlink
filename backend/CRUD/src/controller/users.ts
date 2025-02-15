
import { PrismaClient } from "@prisma/client";
import {Request, Response}from "express"
const client = new PrismaClient();

const createUser =  async(req : Request, res : Response) => {
    const {
        firstName,
        lastName,
        email,
        password,
        walletAddress,
        } = req.body;
    const users = await client.users.create({
        data : {
    
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            walletAddress : walletAddress,
            
        }
    });
    res.json({message : users})

}

const deleteProfile = async(req: Request, res: Response) => {
    const {id} = req.params;
    const data = await client.users.delete({
        where: {
          user_id: 1,
        },
      }
    )

    console.log(id)

    res.json({
        message : data
    })

}
module.exports = {createUser, deleteProfile}
