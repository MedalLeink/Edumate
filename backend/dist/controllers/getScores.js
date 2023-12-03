"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/scoresDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'scoresDB.json');
const getScore = async (request, response) => {
    try {
        const email = request.user.studentEmail;
        const databaseDocument = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (!databaseDocument) {
            return response.status(400).json({
                message: `Unable to read from database`
            });
        }
        let database = JSON.parse(databaseDocument);
        const scoreFinder = database.find((score) => score.studentEmail === email);
        if (!scoreFinder) {
            return response.status(404).json({
                message: `Assignment does not exist`
            });
        }
        return response.status(200).json({
            message: `${scoreFinder.title} found successfully`,
            scoreFinder
        });
    }
    catch (err) {
        console.log(err.message);
        return response.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.getScore = getScore;
