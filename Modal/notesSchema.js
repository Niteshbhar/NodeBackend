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
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",  // referencing the user schema for user_id field
    required: true,
  }
});
const noteslist=mongoose.model("noteslist",notes);
export default noteslist;