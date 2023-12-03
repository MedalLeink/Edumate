"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAssignment = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, "../../src/Database/assignmentDatabase");
const databaseFile = path_1.default.join(databaseFolder, "assignmentDB.json");
const editAssignment = async (request, response) => {
    try {
        const userId = request.user.userid;
        const assignmentId = request.params.id;
        if (!assignmentId) {
            return response.status(400).json({
                status: "Bad request",
                message: "Assignment ID is required for editing",
            });
        }
        let database = [];
        const databaseContent = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (databaseContent) {
            database = JSON.parse(databaseContent);
        }
        else {
            return response.status(400).json({
                status: "Operation failed",
                message: "Information not found in the database",
            });
        }
        const index = database.findIndex((item) => item.assignmentId === assignmentId);
        if (database[index].ownerId !== userId) {
            return response.status(403).json({
                status: "Forbidden",
                message: "You are not authorized to edit this assignment",
            });
        }
        const { title, level, description, score } = request.body;
        database[index] = {
            ...database[index],
            title,
            level,
            description,
            score,
        };
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return response.status(200).json({
            status: `Operation successful`,
            message: `This assignment has been edited successfully.`,
            database,
        });
    }
    catch (err) {
        console.log(err.message);
        response.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
exports.editAssignment = editAssignment;
