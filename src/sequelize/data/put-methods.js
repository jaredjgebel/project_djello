const models = require('../models');
const Board = models.Board;
const List = models.List;
const Card = models.Card;

const editBoard = async (boardId, title = '', description = '') => {
   try {
      const boardResponse = await Board.update({
         title,
         description,
      },
         {
            returning: true,
            where: {
               id: boardId,
            },
         });

      const board = boardResponse[1][0].dataValues;

      return board;

   } catch (err) {
      throw new Error(err);
   }
};

const editList = async (listId, title = '', description = '') => {
   try {
      const listResponse = await List.update({
         title,
         description,
      },
         {
            returning: true,
            where: {
               id: listId,
            },
         });

      const list = listResponse[1][0].dataValues;

      return list;

   } catch (err) {
      throw new Error(err);
   }
};

const editCard = async (cardId, title = '', description = '', complete = false) => {
   try {
      const cardResponse = await Card.update({
         title,
         description,
         complete,
      },
         {
            returning: true,
            where: {
               id: cardId,
            },
         });

      const card = cardResponse[1][0].dataValues;

      return card;

   } catch (err) {
      throw new Error(err);
   }
};

module.exports = {
   editBoard,
   editList,
   editCard,
}
