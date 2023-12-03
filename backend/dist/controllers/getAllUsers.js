"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/userDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'userDB.json');
const getAllUsers = async (req, res) => {
    try {
        let database = fs_1.default.readFileSync(databaseFile, 'utf-8');
        if (!database)
            return res.status(404).json({ message: `Database not valid` });
        database = JSON.parse(database);
        return res.status(200).json({ message: `Users fetched successfully`, database });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
exports.getAllUsers = getAllUsers;
