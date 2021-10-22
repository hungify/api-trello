import Joi from 'joi';
import { getDB } from '*/config/mongodb';
import { ObjectId } from 'mongodb';

const boardCollectionName = 'boards';

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log('error: ', error);
  }
};

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data);

    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(validateValue);

    return result;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const BoardModel = { createNew, findOneById };
