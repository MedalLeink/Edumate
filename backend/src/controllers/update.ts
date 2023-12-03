import { Response } from "express";
import path from "path";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

const databaseFolder = path.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path.join(databaseFolder, "userDB.json");

export const editBook = async (req: JwtPayload, res: Response) => {
  try {
    interface User {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      level: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    }
    let database: User[] = [];
    const userId = req.user.id;
    const userRole = req.user.role;

    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    if (databaseContent) {
      database = JSON.parse(databaseContent);
    } else {
      return res.status(400).json({
        status: "Not found",
        message: "Internal server error",
      });
    }
    const userIndex = database.findIndex((item) => item.id === userId);

    if (userId !== database[userIndex] || userRole !== "teacher") {
      return res.status(400).json({
        status: "Not authorised",
        message: "You are not authorised to edit this profile",
      });
    }

    const { firstName, lastName, email, password, level } = req.body;

    database[userIndex] = {
      ...database[userIndex],
      firstName,
      lastName,
      email,
      password,
      level,
    };

    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");

    return res.status(200).json({
      status: "Successful",
      message: "You have successfully updated your account",
      database
    });
  } catch (error:any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
