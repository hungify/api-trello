import Joi from 'joi';
import { getDB } from '*/config/mongodb';
import { ObjectId } from 'mongodb';

const cardCollectionName = 'column';

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
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
      .collection(cardCollectionName)
      .insertOne(validateValue);
    return result;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const CardModel = { createNew, findOneById };
