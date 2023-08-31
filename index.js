import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
const server = express();

// the data that is sent is in encoded format which the server does not understands so we need to parse the data
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set("view engine", "ejs"); // specify the name of the view engine we are using
server.set("views", path.join(path.resolve(), "src", "views")); // specify the directory in which the server will find those views

server.use(ejsLayouts); // middleware to make sure we are using this layout for our views

import ProductController from "./src/controllers/product.controller.js";
// import validateRequest from "./src/middlewares/validation.middleware.js";
import validateFormData from "./src/middlewares/validation.middleware.js";

const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post("/", validateFormData, productController.addNewProduct);
server.get("/update-product", productController.getUpdateProductView);

server.listen(5200, () => {
  console.log("Server is listening at port 5200!");
});
