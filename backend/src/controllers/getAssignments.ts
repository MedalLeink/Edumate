import path from 'path';
import {Request, Response} from 'express';
import fs from 'fs';
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/assignmentDatabase')
const databaseFile = path.join(databaseFolder, 'assignmentDB.json')

export const getAssignment = async(request:JwtPayload, response:Response) => {
    try{
        const level = request.user.level
        const databaseDocument = fs.readFileSync(databaseFile, "utf-8")
        if(!databaseDocument){
            return response.status(400).json({
                message: `Unable to read from database`
            })
        }
        let database = JSON.parse(databaseDocument)
        const assignmentFinder = database.find((assignment:any) => assignment.level === level)
        if(!assignmentFinder){
            return response.status(404).json({
                message: `Assignment does not exist`
            })
        }
        return response.status(200).json({
            message: `${assignmentFinder.title} found successfully`,
            assignmentFinder
        }) 
    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}