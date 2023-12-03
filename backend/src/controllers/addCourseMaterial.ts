import { Response } from "express"
import path from 'path'
import fs from 'fs'
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/courseDatabase');
const databaseFile = path.join(databaseFolder, 'materialsDB.json');

export const AddCourseMaterial = async(req: JwtPayload, res: Response) => {
    try{
        interface Material{
            title: string
            level: string
            dateAdded: Date
            description: string
            materialId: number
            ownerId: string
        }
        const userId = req.user.userId
         if(!fs.existsSync(databaseFolder)){
            fs.mkdirSync(databaseFolder)
        }
        if(!fs.existsSync(databaseFile)){
            fs.writeFileSync(databaseFile, "[]", "utf-8")
        }
        const {title, level, description} = req.body
        let database:Material[] = []
        const databaseContent = fs.readFileSync(databaseFile, 'utf-8')
        try{
            if(!databaseContent){
                return res.status(400).json({
                    status: `unsuccessful`,
                    message: `unsuccessful`
                })
            }else{
                database = JSON.parse(databaseContent)
            }
        }catch(parseError){
            console.log(parseError)
            database = []
        }
        const findMaterial = database.find((assignment:Material)=> assignment.title === title)
        if(findMaterial){
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            })
        }
        let materialID: number;
        if (database.length === 0) {
            materialID = 1
        }else{
            materialID = database.length + 1
        }
        const newMaterial:Material = {
            title,
            level,
            dateAdded: new Date(),
            description,
            materialId: materialID,
            ownerId: userId
        }
        database.push(newMaterial)
        fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8")
        return res.status(200).json({
            status: `successful`,
            message: `Material added successfully`,
            newMaterial
        })
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({
            message: `Internal Server Error`
        })
    }
}