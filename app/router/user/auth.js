const UserAuthController = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: user-auth
 *  description: get all need data for index page
 */
/**
 * @swagger
 *  /user/get-otp:
 *       post:
 *           tags: [user-auth]
 *           summary: login user in user panel with phone number
 *           description: one time password(otp) login
 *           parameters:
 *           -   name: mobile
 *               description: fa-IRI phone number
 *               in: formData
 *               required: true
 *               type: string
 *           responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unatuthorization
 *              500:
 *                  description: internal server error
 *
 */
/**
 * @swagger
 *  /user/check-otp:
 *       post:
 *           tags: [user-auth]
 *           summary: login user in user panel with phone number
 *           description: one time password(otp) login
 *           parameters:
 *           -   name: mobile
 *               description: fa-IRI phone number
 *               in: formData
 *               required: true
 *               type: string
 *           -   name: code
 *               description: enter sms code
 *               in: formData
 *               required: true
 *               type: string
 *           responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unatuthorization
 *              500:
 *                  description: internal server error
 *
 */

router.post("/get-otp", UserAuthController.getOtp);
router.post("/check-otp", UserAuthController.checkOtp);

module.exports = {
  UserAuthRoutes: router,
};
