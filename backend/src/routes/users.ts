import express from "express";
import { registerUser } from "../controllers/registration";
import { loginUser } from "../controllers/login";
import { getAssignment } from "../controllers/getAssignments";
import { AddAssignment } from "../controllers/addAssignment";
import { editAssignment } from "../controllers/editAssignment";
import { AddCourseMaterial } from "../controllers/addCourseMaterial";
import { getMaterials } from "../controllers/getCourseMaterials";
import { AddScore } from "../controllers/addScore";
import { getScore } from "../controllers/getScores";
import { getAllUsers } from "../controllers/getAllUsers";
import { deleteUser } from "../controllers/deleteUser";
import { authoriser } from "../middleware/authorisation";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/addassignment", authoriser, AddAssignment);
router.get("/getassignment/:level", authoriser, getAssignment);
router.put("/editassignment/:id", authoriser, editAssignment);
router.post("/addmaterial", authoriser, AddCourseMaterial);
router.get("/getmaterials/:level", authoriser, getMaterials);
router.post("/addscore", authoriser, AddScore);
router.get("/getscore/:id", authoriser, getScore);
router.get("/getallusers", authoriser, getAllUsers);
router.delete("/deleteuser/:id", authoriser, deleteUser);

export default router;
