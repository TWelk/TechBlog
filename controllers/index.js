const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const postRoutes = require("./postRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/posts", postRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
