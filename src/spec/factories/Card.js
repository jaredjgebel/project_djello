const faker = require('faker');
const models = require('../../sequelize/models');

const data = async (props = {}) => {
   const defaultProps = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      complete: faker.random.boolean(),
   };
   return Object.assign({}, defaultProps, props);
};

module.exports = async (props = {}) =>
   models.Card.create(await data(props));