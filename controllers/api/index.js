const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/posts", blogPostRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
