import express from "express";
import noteslist from "../Modal/notesSchema.js";

const verifyToken = (token) => {
  try {
    if (!token) return res.status(403).json({ message: "Token not provided" });
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Token not valid" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

// to create a list of notes
export const toCreate = async (req, res) => {
  try {
    // verifyToken(req.body.token);
    const { title, content } = req.body;
    // console.log(title, content, "data");
    if (!title || !content) {
      return res.json("pls enter all the required fields");
    }
    const listData = await noteslist.create({
      title: title,
      content: content,
      userId: req.body.userId,
    });
    res.status(200).json({ message: "Item created successfully", listData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//to get a prticular Note

export const getNote = async (req, res) => {
  try {
    //verifyToken(req.body.token);
    const { id } = req.params;
    console.log(id, "idcddd");
    const data = await noteslist.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note found", Data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// to get the all the notes items
export const getAllNotes = async (req, res) => {
  try {
    //verifyToken(req.body.token);
    const userId = req.body.userId;
    const data = await noteslist.find({ userId: userId });
    if (!data[0]) {
      return res.status(404).json({ message: "No notes found" }); //if no notes found in the user's list, return a 404 error message.  //you can customize this message as per your needs.  //for example, you might want to return a message indicating that the user has no notes or something like that.  //in this case, the error message will be "No notes found".  //you can modify this as per your requirement.  //this error message is just an example and you can modify it as per your needs.  //this error message will be returned when there are no notes found in the user's list.  //you can customize this message as per your needs.  //for example, you might want to return a message indicating that the user has no notes or something like that.  //in this case, the error message will be "No notes found".  //you can modify
    }
    res.status(200).json({ message: "all notes found", Data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//to delete the particular note
export const deleteNote = async (req, res) => {
  try {
    //verifyToken(req.body.token);
    const { id } = req.params;
    const deletedData = await noteslist.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//to update the particular note
export const updateNote = async (req, res) => {
  try {
    //verifyToken(req.body.token);
    const { id } = req.params;
    // const updatedNote = {
    //   title: req.body.title,
    //   content: req.body.content,
    // };
    // console.log(updatedNote, "updatedNote");
    const updatedData = await noteslist.findByIdAndUpdate(id, {
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//to find data by title
export const searchedNote = async (req, res) => {
  try {
    //verifyToken(req.body.token);
    const { title } = req.params;
    const { userId } = req.body;
    console.log(title, userId, "data");
    const searchedData = await noteslist.find({
      title: { $regex: title },
      userId: userId,
    });
    if (!searchedData[0]) {
      return res.status(404).json({ message: "No result found" });
    }
    res.status(200).json({
      message: `Notes found by title name: ${title}`,
      Data: searchedData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
