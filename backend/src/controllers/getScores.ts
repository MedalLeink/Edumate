import path from 'path';
import {Request, Response} from 'express';
import fs from 'fs';
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/scoresDatabase')
const databaseFile = path.join(databaseFolder, 'scoresDB.json')

export const getScore = async(request:JwtPayload, response:Response) => {
    try{
        const email = request.user.studentEmail
        const databaseDocument = fs.readFileSync(databaseFile, "utf-8")
        if(!databaseDocument){
            return response.status(400).json({
                message: `Unable to read from database`
            })
        }
        let database = JSON.parse(databaseDocument)
        const scoreFinder = database.find((score:any) => score.studentEmail === email)
        if(!scoreFinder){
            return response.status(404).json({
                message: `Assignment does not exist`
            })
        }
        return response.status(200).json({
            message: `${scoreFinder.title} found successfully`,
            scoreFinder
        }) 
    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}