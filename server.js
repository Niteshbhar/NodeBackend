import express from "express";
import connections from "./db/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port=3000;

// Middleware for json data
app.use(express.json());
app.use("/Notes/",notesRoutes);
app.use("/User/",userRoutes);
connections();
//for connecting db
app.listen(port,()=>
    {
        console.log(`Server is running at http://localhost:${port}`);
    });