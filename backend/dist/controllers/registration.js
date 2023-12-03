"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const helpers_1 = require("../utilities/helpers");
const users_1 = require("./validation/users");
const databaseFolder = path_1.default.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path_1.default.join(databaseFolder, "userDB.json");
const registerUser = async (req, res) => {
    try {
        //create database
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        //collect user input
        const { firstName, lastName, email, password, level, role } = req.body;
        console.log("reg", req.body);
        let database = [];
        //read database
        const databaseContent = fs_1.default.readFileSync(databaseFile, "utf-8");
        try {
            if (!databaseContent) {
                return res.status(400).json({
                    status: "unsuccessful",
                    message: "Unsuccessful",
                });
            }
            else {
                database = JSON.parse(databaseContent);
            }
        }
        catch (parseError) {
            console.log(parseError);
            database;
        }
        const searchEmail = database.find((user) => user.email === email);
        const validateUser = users_1.userRegister.safeParse(req.body);
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
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        //generate userid
        const userId = (0, uuid_1.v4)();
        const newUser = {
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
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
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
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: "failed",
            message: "Internal sever error",
        });
    }
};
exports.registerUser = registerUser;
