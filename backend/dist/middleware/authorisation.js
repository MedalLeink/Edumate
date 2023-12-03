"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authoriser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        if (decode) {
            request.user = decode;
            next();
        }
        return response.status(400).json({
            message: `Invalid token`,
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.authoriser = authoriser;
