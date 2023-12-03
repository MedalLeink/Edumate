"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBook = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path_1.default.join(databaseFolder, "userDB.json");
const editBook = async (req, res) => {
    try {
        let database = [];
        const userId = req.user.id;
        const userRole = req.user.role;
        const databaseContent = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (databaseContent) {
            database = JSON.parse(databaseContent);
        }
        else {
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
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return res.status(200).json({
            status: "Successful",
            message: "You have successfully updated your account",
            database
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.editBook = editBook;
