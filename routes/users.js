const express = require("express");
const router = express.Router();
const { getAllUsers, showUser } = require("../controllers/users");
const { userAuthMiddleware } = require("../middlewares/userAuth");

// Attaching user auth middleware for all task routes
router.use(userAuthMiddleware);

router.get("/", getAllUsers);
router.get("/showUser", showUser);

module.exports = router;
