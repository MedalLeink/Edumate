import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const databaseFolder = path.join(__dirname, '../../src/Database/userDatabase')
const databaseFile = path.join(databaseFolder, 'userDB.json')

export const deleteUser = async(request:Request, response:Response) => {
    try{
        interface User {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        }

        const email = request.params.email
        
        let database:User[] = [];

        if(!email){
            return response.status(400).json({
                status: 'Bad request',
                message: 'Student email is required for deletion'
            });
        }

        const databaseData = fs.readFileSync(databaseFile, "utf-8");

        if (!databaseData) {
            return response.status(404).json({
              status: `Failed`,
              message: `Cannot access the Database`,
            });
        } else {
            database = JSON.parse(databaseData);
        }

        const index = database.findIndex((item) => item.email === email);

        if (database[index].email !== email){
            return response.status(403).json({
                status: 'Forbidden',
                message: 'You are not authorized to delete this user'
            });
        }
        if (index) {
            database.splice(index, 1);
        }

        fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8")

        return response.status(200).json({
            status: `Successful`,
            message: `This user has been deleted successfully.`,
            
        })
    }catch(err:any){
        console.log(err.message)
        response.status(500).json({
            message: `Internal Server Error`
        })
    }
}