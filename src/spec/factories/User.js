const faker = require('faker');
const models = require('../../sequelize/models');

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 * 
 * @param  {Object} props Properties to use for the user.
 * 
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
   const defaultProps = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
      photo: faker.internet.avatar(),
   };
   return Object.assign({}, defaultProps, props);
};
/**
 * Generates a user instance from the properties provided.
 * 
 * @param  {Object} props Properties to use for the user.
 * 
 * @return {Object}       A user instance
 */
module.exports = async (props = {}) =>
   models.User.create(await data(props));