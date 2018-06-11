'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // HISTORIES
    const histories = [];
    for (let i = 0; i < 10; i++) {
      histories.push({
        text: 'This user created this card for this board.'
      })
    }

    await queryInterface.bulkInsert('Histories', histories);

    const historiesQuery = await queryInterface.sequelize.query(`SELECT id from "Histories";`)
    console.log(historiesQuery);
    const historyRows = historiesQuery[0];



    // USERS
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
        photo: faker.internet.avatar(),
      });
    }

    await queryInterface.bulkInsert('Users', users);

    const userQuery = await queryInterface.sequelize.query(`SELECT id from "Users";`);
    console.log('userQuery', userQuery);
    const userRows = userQuery[0];

    // LISTS
    const lists = [];
    for (let i = 0; i < 10; i++) {
      lists.push({
        title: faker.random.words(),
        description: faker.lorem.sentence(),
      })
    }

    await queryInterface.bulkInsert('Lists', lists);

    const listsQuery = await queryInterface.sequelize.query(`SELECT id from "Lists";`);
    console.log('listsQuery', listsQuery);
    const listRows = listsQuery[0];

    // CARDS
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push({
        title: faker.company.bsNoun(),
        description: faker.company.bsAdjective(),
        assignees: [userRows[i].id],
        complete: faker.random.boolean(),
        history: [historyRows[i].id],
      });
    }

    await queryInterface.bulkInsert('Cards', cards);

    const cardsQuery = await queryInterface.sequelize.query(`SELECT id from "Cards";`);
    console.log('cardsQuery', cardsQuery);
    const cardRows = cardsQuery[0];



    // CREATE BOARDS
    const boards = [];

    for (let i = 0; i < 10; i++) {
      boards.push({
        title: `To-Do ${i}`,
        description: faker.lorem.sentence(),
        lists: [listRows[i].id]
      });
    }

    await queryInterface.bulkInsert('Boards', boards);

    const boardsQuery = await queryInterface.sequelize.query(`SELECT id from "Boards";`);
    console.log('boardsQuery', boardsQuery);
    const boardRows = boardsQuery[0];
    console.log(boardRows);

    // Add boards to user
    const userBoards = [];
    for (let i = 0; i < 10; i++) {
      userBoards.push({
        boards: [boardRows[i].id]
      });
    }

    return await queryInterface.addColumn('Users', 'Boards', userBoards, {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
      
    */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Boards', null, {});
    await queryInterface.bulkDelete('Lists', null, {});
    await queryInterface.bulkDelete('Cards', null, {});
    return queryInterface.bulkDelete('Histories', null, {});
  }
};
