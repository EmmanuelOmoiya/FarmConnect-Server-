const express = require("express");
const router = express.Router();
const product = require("../controller/product");

router.get("/", product.getAllProducts);
router.get("/categories", product.getProductCategories);
router.get("/category/:product", product.getProductsInCategory);
router.get("/farms", product.getProductFarms);
router.get("/farm/:farm", product.getProductsInFarms);
router.get("/farmers", product.getFarmers);
router.get("/farmer/:farmer", product.getProductsByFarmer);
router.get("/farm/product/:product", product.getProductInFarm);
router.get("/location", product.getProductLocation);
router.get("/location/:location", product.getProductsInLocation);
router.get("/:id", product.getProduct);
router.post("/", product.addProduct);
router.put("/:id", product.editProduct);
router.patch("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;