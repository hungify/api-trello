import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '~/config/mongodb';

const cardCollectionName = 'cards';

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
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

    return await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};
export const CardModel = { createNew, findOneById };
