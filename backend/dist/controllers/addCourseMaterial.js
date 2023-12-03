"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCourseMaterial = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../src/Database/courseDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'materialsDB.json');
const AddCourseMaterial = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        const { title, level, description } = req.body;
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
        const findMaterial = database.find((assignment) => assignment.title === title);
        if (findMaterial) {
            return res.status(400).json({
                status: `failed`,
                message: `${title} already exist`
            });
        }
        let materialID;
        if (database.length === 0) {
            materialID = 1;
        }
        else {
            materialID = database.length + 1;
        }
        const newMaterial = {
            title,
            level,
            dateAdded: new Date(),
            description,
            materialId: materialID,
            ownerId: userId
        };
        database.push(newMaterial);
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return res.status(200).json({
            status: `successful`,
            message: `Material added successfully`,
            newMaterial
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.AddCourseMaterial = AddCourseMaterial;
