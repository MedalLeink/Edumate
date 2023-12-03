import { Response } from "express"
import path from 'path'
import fs from 'fs'
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/assignmentDatabase');
const databaseFile = path.join(databaseFolder, 'assignmentDB.json');

export const AddAssignment = async(req: JwtPayload, res: Response) => {
    try{
        interface Assignment{
            title: string
            description: string
            level: string
            dateAdded: Date
            assignmentId: number
            ownerId: string
        }
        const userId = req.user.userId
         if(!fs.existsSync(databaseFolder)){
            fs.mkdirSync(databaseFolder)
        }
        if(!fs.existsSync(databaseFile)){
            fs.writeFileSync(databaseFile, "[]", "utf-8")
        }
        const {title, description, level} = req.body
        let database:Assignment[] = []
        const databaseContent = fs.readFileSync(databaseFile, 'utf-8')
        try{
            if(!databaseContent){
                return res.status(400).json({
                    status: `Unsuccessful`,
                    message: `Information not found in the database`
                })
            }else{
                database = JSON.parse(databaseContent)
            }
        }catch(parseError){
            console.log(parseError)
            database = []
        }
        const findAssignment = database.find((assignment:Assignment)=> assignment.title === title)
        if(findAssignment){
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            })
        }
        let assignmentID: number;
        if (database.length === 0) {
            assignmentID = 1
        }else{
            assignmentID = database.length + 1
        }
        const newAssignment:Assignment = {
            title,
            level,
            dateAdded: new Date(),
            description,
            assignmentId: assignmentID,
            ownerId: userId
        }
        database.push(newAssignment)
        fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8")
        return res.status(200).json({
            status: `successful`,
            message: `Assignment added successfully`,
            newAssignment
        })
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({
            message: `Internal Server Error`
        })
    }

}