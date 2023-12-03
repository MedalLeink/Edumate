"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_1 = require("../controllers/registration");
const login_1 = require("../controllers/login");
const getAssignments_1 = require("../controllers/getAssignments");
const addAssignment_1 = require("../controllers/addAssignment");
const editAssignment_1 = require("../controllers/editAssignment");
const addCourseMaterial_1 = require("../controllers/addCourseMaterial");
const getCourseMaterials_1 = require("../controllers/getCourseMaterials");
const addScore_1 = require("../controllers/addScore");
const getScores_1 = require("../controllers/getScores");
const getAllUsers_1 = require("../controllers/getAllUsers");
const deleteUser_1 = require("../controllers/deleteUser");
const authorisation_1 = require("../middleware/authorisation");
const router = express_1.default.Router();
router.post("/register", registration_1.registerUser);
router.post("/login", login_1.loginUser);
router.post("/addassignment", authorisation_1.authoriser, addAssignment_1.AddAssignment);
router.get("/getassignment/:level", authorisation_1.authoriser, getAssignments_1.getAssignment);
router.put("/editassignment/:id", authorisation_1.authoriser, editAssignment_1.editAssignment);
router.post("/addmaterial", authorisation_1.authoriser, addCourseMaterial_1.AddCourseMaterial);
router.get("/getmaterials/:level", authorisation_1.authoriser, getCourseMaterials_1.getMaterials);
router.post("/addscore", authorisation_1.authoriser, addScore_1.AddScore);
router.get("/getscore/:id", authorisation_1.authoriser, getScores_1.getScore);
router.get("/getallusers", authorisation_1.authoriser, getAllUsers_1.getAllUsers);
router.delete("/deleteuser/:id", authorisation_1.authoriser, deleteUser_1.deleteUser);
exports.default = router;