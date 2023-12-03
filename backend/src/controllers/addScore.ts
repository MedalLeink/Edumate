import { Response } from "express"
import path from 'path'
import fs from 'fs'
import { JwtPayload } from "jsonwebtoken"

const databaseFolder = path.join(__dirname, '../../src/Database/scoresDatabase');
const databaseFile = path.join(databaseFolder, 'scoreDB.json');

export const AddScore = async(req: JwtPayload, res: Response) => {
    try{
        interface Score{
            title: string
            level: string
            studentEmail: string
            dateAdded: Date
            score: string
            ownerId: string
        }
        const userId = req.user.userid
         if(!fs.existsSync(databaseFolder)){
            fs.mkdirSync(databaseFolder)
        }
        if(!fs.existsSync(databaseFile)){
            fs.writeFileSync(databaseFile, "[]", "utf-8")
        }
        const {title, level, studentEmail, score} = req.body
        let database:Score[] = []
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
        const findScore = database.find((score:Score)=> score.title === title)
        if(findScore){
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            })
        }
        const newScore:Score = {
            title,
            level,
            studentEmail,
            dateAdded: new Date(),
            score,
            ownerId: userId
        }
        database.push(newScore)
        fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8")
        return res.status(200).json({
            status: `successful`,
            message: `Assignment added successfully`,
            newScore
        })
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({
            message: `Internal Server Error`
        })
    }

}