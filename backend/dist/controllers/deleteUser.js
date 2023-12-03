"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/userDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'userDB.json');
const deleteUser = async (request, response) => {
    try {
        const email = request.params.email;
        let database = [];
        if (!email) {
            return response.status(400).json({
                status: 'Bad request',
                message: 'Student email is required for deletion'
            });
        }
        const databaseData = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (!databaseData) {
            return response.status(404).json({
                status: `Failed`,
                message: `Cannot access the Database`,
            });
        }
        else {
            database = JSON.parse(databaseData);
        }
        const index = database.findIndex((item) => item.email === email);
        if (database[index].email !== email) {
            return response.status(403).json({
                status: 'Forbidden',
                message: 'You are not authorized to delete this user'
            });
        }
        if (index) {
            database.splice(index, 1);
        }
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return response.status(200).json({
            status: `Successful`,
            message: `This user has been deleted successfully.`,
        });
    }
    catch (err) {
        console.log(err.message);
        response.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.deleteUser = deleteUser;
