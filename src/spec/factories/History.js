const faker = require('faker');
const models = require('../../sequelize/models');

const data = async (props = {}) => {
   const defaultProps = {
      text: faker.lorem.sentence(),
   };
   return Object.assign({}, defaultProps, props);
};

module.exports = async (props = {}) =>
   models.History.create(await data(props));