"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAssignment = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/assignmentDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'assignmentDB.json');
const AddAssignment = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        const { title, description, level } = req.body;
        let database = [];
        const databaseContent = fs_1.default.readFileSync(databaseFile, 'utf-8');
        try {
            if (!databaseContent) {
                return res.status(400).json({
                    status: `Unsuccessful`,
                    message: `Information not found in the database`
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
        const findAssignment = database.find((assignment) => assignment.title === title);
        if (findAssignment) {
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            });
        }
        let assignmentID;
        if (database.length === 0) {
            assignmentID = 1;
        }
        else {
            assignmentID = database.length + 1;
        }
        const newAssignment = {
            title,
            level,
            dateAdded: new Date(),
            description,
            assignmentId: assignmentID,
            ownerId: userId
        };
        database.push(newAssignment);
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return res.status(200).json({
            status: `successful`,
            message: `Assignment added successfully`,
            newAssignment
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.AddAssignment = AddAssignment;
