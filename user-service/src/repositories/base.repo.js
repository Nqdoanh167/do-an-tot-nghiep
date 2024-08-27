/** @format */

const {BadRequestError} = require('../core/error.response');
const {getSelectData, unGetSelectData} = require('../utils');

class BaseRepo {
   static async getAll(Model, query) {
      const {sort, page, limit, select,filter,filterCount} = query;
      const skip = (page - 1) * limit;
      const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1};
      const docs = await Model.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean();
      const total = await Model.countDocuments(filterCount);
      return {data:docs, total};
   }

   static async getOne(Model, query) {
      const {unSelect,filter}=query
      const doc = await Model.findOne(filter).select(unGetSelectData(unSelect)).lean();
      if (!doc) {
         throw new BadRequestError('Document not found');
      }
      return doc;
   }

   static async createOne(Model, data) {
      const newDoc = await Model.create(data);
      return newDoc;
   }

   static async deleteOne(Model,id) {
      const doc = await Model.findByIdAndDelete(id);
      if (!doc) {
         throw new BadRequestError('Document not found');
      }
      return null;
   }

   static async updateOne(Model,query, data) {
      const {unSelect,filter}=query
      const doc = await Model.updateOne(filter, data, {
         new: true,
         runValidators: true,
      });
      if (!doc) {
         throw new BadRequestError('Document not found');
      }
      return  await Model.findOne(filter).select(unGetSelectData(unSelect)).lean();
   }
}

module.exports = BaseRepo;
