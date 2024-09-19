const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const {
  addCategorySchema,
  editCategorySchema,
} = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createHttpError.InternalServerError("خطا سرور");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategoryTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      await this.checkExistCategory(id);
      await editCategorySchema.validateAsync(req.body);
      const resultOfUpdate = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );
      if (resultOfUpdate.modifiedCount == 0)
        throw createHttpError.InternalServerError("بروز رسانی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروز رسانی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      //   const category = await CategoryModel.aggregate([
      //     {
      //       $lookup: {
      //         from: "categories",
      //         localField: "_id",
      //         foreignField: "parent",
      //         as: "children",
      //       },
      //     },
      //     {
      //       $project: {
      //         __v: 0,
      //         "children.__v": 0,
      //         "children.parent": 0,
      //       },
      //     },
      //     {
      //       $match: {
      //         parent: undefined,
      //       },
      //     },
      //   ]);
      //   const category = await CategoryModel.aggregate([
      //     {
      //       $graphLookup: {
      //         from: "categories",
      //         startWith: "$_id",
      //         connectFromField: "_id",
      //         connectToField: "parent",
      //         maxDepth: 5,
      //         depthField: "depth",
      //         as: "children",
      //       },
      //     },
      //     {
      //       $project: {
      //         __v: 0,
      //         "children.__v": 0,
      //         "children.parent": 0,
      //       },
      //     },
      //     {
      //       $match: {
      //         parent: undefined,
      //       },
      //     },
      //   ]);
      const categories = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const findCategory = await CategoryModel.aggregate([
        {
          $match: {
            _id: category._id,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: { findCategory },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([
        { $match: {} },
        { $project: { __v: 0 } },
      ]);
      return res.status(200).json({
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
