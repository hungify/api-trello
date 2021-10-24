import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '~/config/mongodb';
import { CardModel } from './card.model';
import { ColumnModel } from './column.model';

const boardCollectionName = 'boards';

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
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

    return await getDB()
      .collection(boardCollectionName)
      .findOne(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(boardId) } },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnNewDocument: true }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  createNew,
  findOneById,
  getFullBoard,
  pushColumnOrder,
  boardCollectionName,
};
