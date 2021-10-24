import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '~/config/mongodb';

const cardCollectionName = 'cards';

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also Object Id when create new
  columnId: Joi.string().required(), // also Object Id when create new
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
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);

    return await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};
export const CardModel = { createNew, findOneById, cardCollectionName };
