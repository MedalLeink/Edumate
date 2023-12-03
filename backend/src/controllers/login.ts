import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/helpers";

const databaseFolder = path.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path.join(databaseFolder, "userDB.json");

export const loginUser = async (req: Request, res: Response) => {
  try {
    //fetch login details from frontend
    const { email, password } = req.body;
    const databaseData = fs.readFileSync(databaseFile, "utf-8");

    let database;
    //To check if database exist
    if (!databaseData) {
      return res.status(404).json({
        status: "Failed",
        message: "Unable to fetch information",
      });
    } else {
      database = JSON.parse(databaseData);
    }
    //Check if user account exist
    const checkUser = database.find((user: any) => user.email === email);
    if (!checkUser) {
      return res.status(404).json({
        status: "Not found",
        message: `This email or password does not exist`,
      });
    }
    //check if user password matches
    const validate = await bcrypt.compare(password, checkUser.password);

    if (validate) {
      const data = {
        userId: checkUser.id,
        email: checkUser.email,
        level: checkUser.level,
      };
      const token = generateToken(data);

      return res.status(200).json({
        message: `Welcome back ${checkUser.firstName}`,
        token: token,
        checkUser,
      });
    }
    return res.status(400).json({
      status: "Unsuccessful",
      message: "Login attempt failed",
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal sever error",
    });
  }
};
