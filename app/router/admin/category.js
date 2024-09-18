const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create new category
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *                  201:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of category
 *          responses:
 *                  200:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all children of parents category
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: parent
 *          responses:
 *                  200:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all categories
 *          responses:
 *                  200:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: delete category with objectId
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *                  200:
 *                      description: success
 *
 */
router.post("/add", CategoryController.addCategory);
router.get("/parents", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildOfParents);
router.get("/all", CategoryController.getAllCategory);
router.delete("/remove/:id", CategoryController.removeCategory);

module.exports = {
  CategoryRouter: router,
};
