import ProductModel from "../models/product.model.js";

export default class ProductController {
  // acting as a middleware/request handler
  getProducts(req, res) {
    const products = ProductModel.get();
    res.render("products", { products: products });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }

  getAddForm(req, res) {
    res.render("new-product", { errorMsg: null });
  }

  getUpdateProductView(req, res) {
    const { id } = req.body;
    const productFound = ProductModel.getProductById(id);
    if (productFound) {
      res.render("update-product", { product: productFound, errorMsg: null });
    } else {
      res.status(401).send("Product not found.");
    }
  }

  addNewProduct(req, res) {
    // const { name, price, image } = req.body;
    // let errors = [];
    // if (!title || name.trim() == "") {
    //   errors.push("Name cannot be empty.");
    // }
    // if (!price || parseFloat(price) < 1) {
    //   errors.push("Price must be a positive value.");
    // }
    // try {
    //   const validURL = new URL(image);
    // } catch (err) {
    //   errors.push("Please enter a valid image URL.");
    // }
    // if (errors.length > 0) {
    //   res.render("new-product", { errorMsg: errors[0] });
    // }
    console.log("Called");
    const newProduct = req.body;
    ProductModel.addProduct(newProduct);
    const products = ProductModel.get();
    res.render("products", { products });
  }
}
