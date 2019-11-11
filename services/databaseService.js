import mongoose from "mongoose";
import InternalError from './../errors/internalError';
import ValidationError from './../errors/validationError';
import NotFoundError from './../errors/notFoundError';

class DatabaseService {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query, limit, skip) {
    try {
      limit = limit ? Number(limit) : 10;
      skip = skip ? Number(skip) : 0;
      if (query._id) query._id = new mongoose.mongo.ObjectId(query._id);
      let items = await this.model.find(query).skip(skip).limit(limit);
      return items;
    } catch (error) {
      return Promise.reject(new InternalError(`Error occurred while getting item with query: ${query}, skip: ${skip}, limit: ${limit}, error: ${error.message}`));
    }
  }

  async get(query) {
    try {
      if (query._id) query._id = new mongoose.mongo.ObjectId(query._id);
      let item = await this.model.findOne(query);
      return item;
    } catch (error) {
      return Promise.reject(new InternalError(`Error occurred while getting item with query: ${query}, error: ${error.message}`));
    }
  }

  async insert(data, appendParams) {
    try {
      let item = await this.model.create(Object.assign(data, appendParams));
      return item.toObject();
    } catch (error) {
      if (error.errors) for (const errorName in error.errors) return Promise.reject(new ValidationError(error.errors[errorName].path));
      return Promise.reject(new InternalError(`Error occurred while insert item with error: ${error.message}`));
    }
  }

  async update(id, data, appendParams) {
    try {
      let item = await this.model.findByIdAndUpdate(id, Object.assign(data, appendParams), { new: false });
      if (!item) return Promise.reject(new NotFoundError(id));
      return item.toObject();
    } catch (error) {
      if (error.errors) for (const errorName in error.errors) return Promise.reject(new ValidationError(error.errors[errorName].path));
      return Promise.reject(new InternalError(`Error occurred while update item with id: ${id}, error: ${error.message}`));
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item) return Promise.reject(new NotFoundError(id));
      return item.toObject();
    } catch (error) {
      return Promise.reject(new InternalError(`Error occurred while update delete with id: ${id}, error: ${error.message}`));
    }
  }
}

export default DatabaseService;
