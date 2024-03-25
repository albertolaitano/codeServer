import express from "express";
import productManager from "./data/fs/ProductManager.fs.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

//middleware
server.use(express.urlencoded({ extended: true }));

//router
server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
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

server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await productManager.read(category);
    if (all) {
      return res.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
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

server.get("/api/products/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
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
