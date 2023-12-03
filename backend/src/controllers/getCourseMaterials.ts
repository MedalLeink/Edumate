import path from 'path';
import {Request, Response} from 'express';
import fs from 'fs';
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/courseDatabase')
const databaseFile = path.join(databaseFolder, 'materialsDB.json')

export const getMaterials = async(request:JwtPayload, response:Response) => {
    try{
        const level = request.user.level
        const databaseDocument = fs.readFileSync(databaseFile, "utf-8")
        if(!databaseDocument){
            return response.status(400).json({
                message: `Unable to read from database`
            })
        }
        let database = JSON.parse(databaseDocument)
        const materialFinder = database.find((material:any) => material.level === level)
        if(!materialFinder){
            return response.status(404).json({
                message: `Assignment does not exist`
            })
        }
        return response.status(200).json({
            message: `${materialFinder.title} found successfully`,
            materialFinder
        }) 
    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}