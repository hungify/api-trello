import { cloneDeep } from 'lodash';
import { BoardModel } from '~/models/board.model';

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data);
    const getNewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    );

    return getNewBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    if (!board || !board.columns) throw Error('Board not found !');
    const transformBoard = cloneDeep(board);
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );
    // Add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });
    // Remove cards data from boards
    delete transformBoard.cards;
    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
