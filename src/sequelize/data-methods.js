const models = require('./models');
const Card = models.Card;
const History = models.History;

export const getHistories = async (cardId) => {
   try {
      const histories = [];
      const card = await Card.findById(cardId);

      for (let id of card.HistoryIds) {
         const history = await History.findById(id);
         histories.push(history.dataValues);
      }

      return histories;
   } catch (err) {
      console.log(err);
   }
};

// const getCards = async (listId) => {

// }

getHistories(15)
   .then(histories => console.log(histories));
   // .catch(err => console.err(err))


// return new Promise((resolve, reject) => {
//             Card.findById(cardId)
//                .then((card) => {
//                   // console.log(card);
//                   resolve(card.HistoryIds);
//                })
//                .catch((err) => {
//                   reject(err);
//                })
//          })