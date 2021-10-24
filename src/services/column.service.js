import { BoardModel } from '~/models/board.model';
import { ColumnModel } from '~/models/column.model';

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);

    const boardId = newColumn.boardId.toString();
    const newColumnId = newColumn._id.toString();

    await BoardModel.pushColumnOrder(boardId, newColumnId);

    return newColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    const result = await ColumnModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
