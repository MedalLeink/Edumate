import path from 'path';
import fs from 'fs'
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const databaseFolder = path.join(__dirname, '../../src/Database/userDatabase')
const databaseFile = path.join(databaseFolder, 'userDB.json')

export const getAllUsers = async (req: JwtPayload, res: Response) => {
    try{
        let database = fs.readFileSync(databaseFile, 'utf-8')
        if(!database) return res.status(404).json({message: `Database not valid`})
        database = JSON.parse(database)
    return res.status(200).json({message: `Users fetched successfully`, database})
    }catch(err){
    console.log(err);
    return res.status(500).json({
    message: `Internal Server Error`,
    });
    }
}