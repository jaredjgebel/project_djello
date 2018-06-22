const lodash = require('lodash');
const models = require('../sequelize/models');

module.exports = async function truncate() {
   return await Promise.all(
      lodash.map(Object.keys(models), (key) => {
         if (['sequelize', 'Sequelize'].includes(key)) return null;
         return models[key].destroy({ where: {}, force: true });
      })
   );
}