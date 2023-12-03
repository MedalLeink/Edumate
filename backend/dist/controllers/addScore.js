"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddScore = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/scoresDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'scoreDB.json');
const AddScore = async (req, res) => {
    try {
        const userId = req.user.userid;
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        const { title, level, studentEmail, score } = req.body;
        let database = [];
        const databaseContent = fs_1.default.readFileSync(databaseFile, 'utf-8');
        try {
            if (!databaseContent) {
                return res.status(400).json({
                    status: `unsuccessful`,
                    message: `unsuccessful`
                });
            }
            else {
                database = JSON.parse(databaseContent);
            }
        }
        catch (parseError) {
            console.log(parseError);
            database = [];
        }
        const findScore = database.find((score) => score.title === title);
        if (findScore) {
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            });
        }
        const newScore = {
            title,
            level,
            studentEmail,
            dateAdded: new Date(),
            score,
            ownerId: userId
        };
        database.push(newScore);
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return res.status(200).json({
            status: `successful`,
            message: `Assignment added successfully`,
            newScore
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.AddScore = AddScore;
