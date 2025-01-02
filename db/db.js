import mongoose from "mongoose";

const connections = () => {
  const url =
    "mongodb+srv://niteshbhardwaj2001:B1XSKp0UWMAbLGoY@cluster0.15ssesm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connections;
