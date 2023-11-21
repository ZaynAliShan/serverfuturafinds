const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { userAuthMiddleware, userRoleAuth } = require("../middlewares/userAuth");

// Attaching user auth middleware for all product routes
router.use(userAuthMiddleware);

// Routes
router.get("/", getAllProducts);
router.get("/:productID", getSingleProduct);

router.post("/", userRoleAuth, createProduct);
router.patch("/:productID", userRoleAuth, updateProduct);
router.delete("/:productID", userRoleAuth, deleteProduct);

module.exports = router;
