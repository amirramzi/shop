const createHttpError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const {
  RandomNumberGenerator,
  SignAccessToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبار سنجی برای شما ارسال شد",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد ارسال شد صحیح نمیباشد");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createHttpError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await SignAccessToken(user._id);
      return res.json({
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Rules: ["USER"],
    }));
  }
  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, "0", null, undefined, NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = new UserAuthController();
