"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../utilities/helpers");
const databaseFolder = path_1.default.join(__dirname, "../../src/Database/userDatabase");
const databaseFile = path_1.default.join(databaseFolder, "userDB.json");
const loginUser = async (req, res) => {
    try {
        //fetch login details from frontend
        const { email, password } = req.body;
        const databaseData = fs_1.default.readFileSync(databaseFile, "utf-8");
        let database;
        //To check if database exist
        if (!databaseData) {
            return res.status(404).json({
                status: "Failed",
                message: "Unable to fetch information",
            });
        }
        else {
            database = JSON.parse(databaseData);
        }
        //Check if user account exist
        const checkUser = database.find((user) => user.email === email);
        if (!checkUser) {
            return res.status(404).json({
                status: "Not found",
                message: `This email or password does not exist`,
            });
        }
        //check if user password matches
        const validate = await bcryptjs_1.default.compare(password, checkUser.password);
        if (validate) {
            const data = {
                userId: checkUser.id,
                email: checkUser.email,
                level: checkUser.level,
            };
            const token = (0, helpers_1.generateToken)(data);
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
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: "failed",
            message: "Internal sever error",
        });
    }
};
exports.loginUser = loginUser;
