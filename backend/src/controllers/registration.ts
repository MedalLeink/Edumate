import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { hashPassword } from "../utilities/helpers";
import { userRegister } from "./validation/users";

const databaseFolder = path.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path.join(databaseFolder, "userDB.json");

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    //create database
    if (!fs.existsSync(databaseFolder)) {
      fs.mkdirSync(databaseFolder);
    }
    if (!fs.existsSync(databaseFile)) {
      fs.writeFileSync(databaseFile, "[]", "utf-8");
    }
    //collect user input
    const { firstName, lastName, email, password, level, role } = req.body;
    console.log("reg", req.body);
    let database: User[] = [];

    //read database
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    try {
      if (!databaseContent) {
        return res.status(400).json({
          status: "unsuccessful",
          message: "Unsuccessful",
        });
      } else {
        database = JSON.parse(databaseContent);
      }
    } catch (parseError) {
      console.log(parseError);
      database;
    }

    const searchEmail = database.find((user: User) => user.email === email);
    const validateUser = userRegister.safeParse(req.body);
    if (validateUser.success === false) {
      return res.status(400).json({
        status: "failed",
        message: validateUser.error.issues[0].message,
      });
    }

    if (searchEmail) {
      res.status(400).json({
        status: "Registration failed",
        message: `${email} already exists, please login.`,
      });
      return;
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //generate userid
    const userId = v4();
    const newUser: User = {
      id: userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      level,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    database.push(newUser);
    //write to database
    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");

    if (!newUser) {
      return res.status(400).json({
        status: "error",
        message: "Account not created",
      });
    }
    //send response to frontend
    return res.status(200).json({
      status: "successful",
      message: "Account successfully created",
      newUser,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal sever error",
    });
  }
};
