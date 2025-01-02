import express from "express";
import noteslist from "../Modal/notesSchema.js";

// to create a list of notes
export const toCreate = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content, "datat");
    if (!title || !content) {
      return res.json("pls enter all the required fields");
    }
    const listData = await noteslist.create({
      title: title,
      content: content,
    });
    res.status(200).json({ message: "Item created successfully", listData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//to get a prticular Note

export const getNote = async (req, res) => {
  try {
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
    const data = await noteslist.find();
    res.status(200).json({ message: "all notes found", Data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//to delete the particular note
export const deleteNote = async (req, res) => {
  try {
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
    const { title } = req.params;
    const searchedData = await noteslist.find({ title: { $regex: title } });
    if (!searchedData[0]) {
      return res.status(404).json({ message: "No result found" });
    }
    res
      .status(200)
      .json({
        message: `Notes found by title name: ${title}`,
        Data: searchedData,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
