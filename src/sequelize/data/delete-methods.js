const models = require('../models');
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const History = models.History;

const deleteBoard = async (boardId) => {
   try {
      await Board.destroy({
         where: {
            id: boardId,
         },
         limit: 1,
      });

      return `Board successfully deleted.`;

   } catch (err) {
      throw new Error(err);
   }
};

const deleteList = async (listId) => {
   try {
      await List.destroy({
         where: {
            id: listId,
         },
         limit: 1,
      });

      return 'List successfully deleted.';
   } catch (err) {
      throw new Error(err);
   }
};

const deleteCard = async (cardId) => {
   try {
      const card = await Card.findById(cardId);
      const histories = card.dataValues.HistoryIds;

      await Card.destroy({
         where: {
            id: cardId,
         },
         limit: 1,
      });

      if (histories[0]) {
         for (history of histories) {
            await History.destroy({
               where: {
                  id: history.id,
               },
               limit: 1,
            });
         }
      }

      return 'Card and associated histories successfully deleted.';
   } catch (err) {
      throw new Error(err);
   }
};

module.exports = {
   deleteBoard,
   deleteList,
   deleteCard,
}