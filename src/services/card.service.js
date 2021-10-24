import { CardModel } from '~/models/card.model';
import { ColumnModel } from '~/models/column.model';

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);
    const columnId = newCard.columnId.toString();
    const newCardId = newCard._id.toString();

    await ColumnModel.pushCardOrder(columnId, newCardId);
    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
