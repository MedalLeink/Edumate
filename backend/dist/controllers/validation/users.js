"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userRegister = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    email: zod_1.default.string().email({
        message: "Email is not valid"
    }),
    password: zod_1.default.string().min(6, { message: "Password must contain at least 6 characters" }),
    level: zod_1.default.string(),
    role: zod_1.default.string()
});
