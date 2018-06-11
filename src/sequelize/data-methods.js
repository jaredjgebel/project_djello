const models = require('./models');
const Card = models.Card;

const getHistories = async (cardId) => {
   try {
      const card = await Card.findById(cardId);
      console.log(card);
   } catch (err) {
      console.error(err);
   }



};

getHistories(1);