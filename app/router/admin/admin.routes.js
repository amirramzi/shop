const { CategoryRouter } = require("./category");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *    -  name: Admin-Panel
 *       description: action of admin (add , remove, edit and any do)
 *    -  name: Category(admin-panel)
 *       description: all route for category section
 */
router.use("/category", CategoryRouter);

module.exports = {
  AdminRoutes: router,
};
