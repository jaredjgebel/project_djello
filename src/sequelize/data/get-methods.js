const path = require('path');
const Sequelize = require('sequelize');
const models = require('../models');
const User = models.User;
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const Op = Sequelize.Op;

const getUser = async (userId) => {
   try {
      const user = await User.findById(userId);
      return user.dataValues;
   } catch (err) {
      throw new Error(err);
   }
}

// retrieves all boards for user
const getUserBoards = async (userId) => {
   try {
      const userBoards = [];
      const user = await User.findById(userId);
      if (user.dataValues.BoardIds[0]) {
         // if a user has boards, iterate and return them
         for (let board of user.dataValues.BoardIds) {
            const boardInfo = await Board.findById(board);
            userBoards.push(boardInfo.dataValues);
         }

         return userBoards;
      } else {
         // otherwise return null
         return null;
      }

   } catch (err) {
      throw new Error(err);
   }
}

const getLists = async (boardId) => {
   try {
      const lists = [];
      const board = await Board.findById(boardId);

      if (!board.dataValues.ListIds[0]) {
         return null;
      } else {
         for (let id of board.ListIds) {
            const list = await List.findById(id);
            lists.push(list.dataValues);
         }

         return lists;
      }
   } catch (err) {
      throw new Error(err);
   }
}

const getCards = async (listId) => {
   try {
      const cards = [];
      const list = await List.findById(listId);

      if (!list.dataValues.CardIds[0]) {
         return null;
      } else {
         for (let id of list.CardIds) {
            const card = await Card.findById(id);
            cards.push(card.dataValues);
         }

         return cards;
      }
   } catch (err) {
      throw new Error(err);
   }
}

// return users assigned to a given card
const getCardAssignees = async (cardId) => {
   try {
      const assignees = [];
      const cardResponse = await Card.findById(cardId);


      if (!cardResponse.dataValues.AssigneeIds[0]) {
         return null;

      } else {
         for (assigneeId of cardResponse.dataValues.AssigneeIds) {
            const userResponse = await User.findById(assigneeId);
            assignees.push(userResponse.dataValues);
         }
         return assignees;
      }

   } catch (err) {
      throw new Error(err);
   }
}

const getHistories = async (cardId) => {
   try {
      const histories = [];
      const card = await Card.findById(cardId);

      for (let id of card.HistoryIds) {
         const history = await History.findById(id);
         histories.push(history.dataValues);
      }

      return histories;
   } catch (err) {
      throw new Error(err);
   }
};

module.exports = {
   getUser,
   getUserBoards,
   getLists,
   getCards,
   getHistories,
   getCardAssignees,
}