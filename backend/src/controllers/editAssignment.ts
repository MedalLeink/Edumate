import { Response } from "express";
import path from "path";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

const databaseFolder = path.join(__dirname, "../../src/Database/assignmentDatabase");
const databaseFile = path.join(databaseFolder, "assignmentDB.json");

export const editAssignment = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    interface assignmentInfo {
      title: string;
      level: string;
      dateAdded: Date;
      description: string;
      score: string;
      assignmentId: number;
      ownerId: string;
    }

    const userId = request.user.userid;

    const assignmentId = request.params.id;

    if (!assignmentId) {
      return response.status(400).json({
        status: "Bad request",
        message: "Assignment ID is required for editing",
      });
    }

    let database: assignmentInfo[] = [];
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    if (databaseContent) {
      database = JSON.parse(databaseContent);
    } else {
      return response.status(400).json({
        status: "Operation failed",
        message: "Information not found in the database",
      });
    }

    const index = database.findIndex(
      (item) => item.assignmentId === assignmentId
    );

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

    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");

    return response.status(200).json({
      status: `Operation successful`,
      message: `This assignment has been edited successfully.`,
      database,
    });
  } catch (err: any) {
    console.log(err.message);
    response.status(500).json({
      message: `Internal Server Error`,
    });
  }
};
