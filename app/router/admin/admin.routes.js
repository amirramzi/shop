const { CategoryRouter } = require("./category"); 
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: action of admin (add , remove, edit and any do)
 */
router.use("/category", CategoryRouter);

module.exports = {
  AdminRoutes: router,
};
