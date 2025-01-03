import express from "express";
import user from "../Modal/userSchema.js";
import jwt from "jsonwebtoken";
const securityKey = "privatekey";
// to register the user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password) {
      return res.json("Please fill all the required fields");
    }

    // check if user already exists
    const alreadyExists = await user.findOne({ email: email });
    if (alreadyExists) {
      return res.json("Email already exists");
    }

    // add user to db
    const data = await user.create({
      name: name,
      email: email,
      password: password,
    });
    res.json("User registered successfully");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//to login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.json("Please fill all the required fields");
    }

    // check if user exists
    const userlogin = await user.findOne({ email: email });
    if (!userlogin) {
      return res.json("User does not exist");
    }

    // check password
    if (userlogin.password === password) {
      jwt.sign(
        {
          name: userlogin.password,
          email: userlogin.password,
        },
        securityKey,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ messege: "logedIn", token ,userlogin});
        }
      );
    } else {
      return res.json("Invalid password");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
