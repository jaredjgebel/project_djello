const faker = require('faker');
const models = require('../../sequelize/models');

const data = async (props = {}) => {
   const defaultProps = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
   };
   return Object.assign({}, defaultProps, props);
};

module.exports = async (props = {}) =>
   models.List.create(await data(props));