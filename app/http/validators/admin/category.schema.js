const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی مناسب نمیباشد")),
  parent: Joi.string()
    .pattern(MongoIDPattern)
    .error(new Error("شناسه وارد شده صحیح نمیباشد")),
});
const editCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی مناسب نمیباشد")),
});
module.exports = {
  addCategorySchema,
  editCategorySchema,
};
