const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(admin-panel)]
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
 *          tags: [Category(admin-panel)]
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
 *          tags: [Category(admin-panel)]
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
 *          tags: [Category(admin-panel)]
 *          summary: get all categories
 *          responses:
 *                  200:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(admin-panel)]
 *          summary: get all categories without populate
 *          responses:
 *                  200:
 *                      description: success
 *
 */
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(admin-panel)]
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
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(admin-panel)]
 *          summary: fin category by id
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
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(admin-panel)]
 *          summary: update category by id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *          responses:
 *                  200:
 *                      description: success
 *                  500:
 *                      description: internalServerError
 *
 */
router.post("/add", CategoryController.addCategory);
router.get("/parents", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildOfParents);
router.get("/all", CategoryController.getAllCategory);
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);
router.delete("/remove/:id", CategoryController.removeCategory);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
  CategoryRouter: router,
};
