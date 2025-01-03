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
notesRoutes.get("/", getAllNotes);
notesRoutes.get("/:id", getNote);
notesRoutes.get("/result/:title", searchedNote);
notesRoutes.post("/", toCreate);
notesRoutes.delete("/:id", deleteNote);
notesRoutes.patch("/:id", updateNote);
export default notesRoutes;
