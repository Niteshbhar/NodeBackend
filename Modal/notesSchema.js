import mongoose from "mongoose";
const notes = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const noteslist=mongoose.model("noteslist",notes);
export default noteslist;