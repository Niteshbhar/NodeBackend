import express from "express";
import {
  deleteNote,
  getAllNotes,
  getNote,
  searchedNote,
  toCreate,
  updateNote,
} from "../Controller/notes.js";
const notesRoutes = express.Router();
notesRoutes.get("/allData", getAllNotes);
notesRoutes.get("/data/:id", getNote);
notesRoutes.get("/searchedData/:title", searchedNote);
notesRoutes.post("/create", toCreate);
notesRoutes.delete("/deleteData/:id", deleteNote);
notesRoutes.patch("/updateNote/:id", updateNote);
export default notesRoutes;
