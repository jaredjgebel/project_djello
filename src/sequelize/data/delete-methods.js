const models = require('../models');
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const History = models.History;
const {
   removeBoardFromUser,
   removeListFromBoard,
   removeCardFromList,
} = require('./utility-methods');

const deleteBoard = async (userId, boardId) => {
   try {
      await Board.destroy({
         where: {
            id: boardId,
         },
         limit: 1,
      });

      const user = await removeBoardFromUser(userId, boardId);

      return user;

   } catch (err) {
      throw new Error(err);
   }
};

const deleteList = async (boardId, listId) => {
   try {
      await List.destroy({
         where: {
            id: listId,
         },
         limit: 1,
      });

      const board = await removeListFromBoard(boardId, listId);

      return board;
   } catch (err) {
      throw new Error(err);
   }
};

const deleteCard = async (listId, cardId) => {
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

      const list = await removeCardFromList(listId, cardId);

      return list;
   } catch (err) {
      throw new Error(err);
   }
};

module.exports = {
   deleteBoard,
   deleteList,
   deleteCard,
}