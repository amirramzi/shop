const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constant");

function RandomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };

    const option = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}
function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };

    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, option, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}
function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        reject(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createHttpError.NotFound("کاربر یافت نشد"));
      resolve(mobile);
    });
  });
}
module.exports = {
  RandomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
};
