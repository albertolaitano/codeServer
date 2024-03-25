import express from "express";
import usersManager from "./data/fs/UsersManager.fs.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);

server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));

server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "CODER API ERROR",
      success: false,
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const all = await usersManager.read(role);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        role,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

server.get("/api/users/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await usersManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});
