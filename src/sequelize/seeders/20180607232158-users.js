'use strict';
const faker = require('faker');
const { addBoardToUser } = require('../data/utility-methods');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // HISTORIES
    const histories = [];
    for (let i = 0; i < 10; i++) {
      histories.push({
        text: 'This user created this card for this board.'
      });
    }

    await queryInterface.bulkInsert('Histories', histories);

    const historiesQuery = await queryInterface.sequelize.query(`SELECT id from "Histories";`)
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

    users.push({
      first: "Jamie",
      last: "Doe",
      email: "jamiedoe@fake.com",
      photo: `https://s3.amazonaws.com/uifaces/faces/twitter/heykenneth/128.jpg`,
      idToken: process.env.TEST_ACCOUNT_CLIENT_ID,
    })

    await queryInterface.bulkInsert('Users', users);

    const userQuery = await queryInterface.sequelize.query(`SELECT id from "Users";`);
    const userRows = userQuery[0];


    // CARDS
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push({
        title: faker.company.bsNoun(),
        description: faker.company.bsAdjective(),
        complete: faker.random.boolean(),
        HistoryIds: [historyRows[i].id],
        AssigneeIds: [userRows[i].id],
      });
    }

    // Chocolate chip cookies, cardRows 10-13
    cards.push({
      title: 'Chocolate chips',
      description: 'One bag',
      complete: false,
      AssigneeIds: [userRows[0].id],
    });

    cards.push({
      title: 'Flour',
      description: 'Three cups',
      complete: true,
      AssigneeIds: [userRows[1].id],
    });

    cards.push({
      title: 'Butter',
      description: 'Two sticks',
      complete: false,
      AssigneeIds: [userRows[2].id],
    });

    cards.push({
      title: 'Vanilla',
      description: 'One teaspoon',
      complete: false,
    });

    // Pumpkin pie
    cards.push({
      title: 'Pumpkin, canned',
      description: 'Two cups',
      complete: false,
      AssigneeIds: [userRows[0].id],
    });

    cards.push({
      title: 'Flour',
      description: 'Two cups',
      complete: true,
    });

    // Laundry
    cards.push({
      title: 'Sort laundry',
      description: 'By color',
      complete: true,
      AssigneeIds: [userRows[0].id],
    });

    cards.push({
      title: "Don't forget to bring fabric softener",
      complete: false,
    });

    await queryInterface.bulkInsert('Cards', cards);

    const cardsQuery = await queryInterface.sequelize.query(`SELECT id from "Cards";`);
    const cardRows = cardsQuery[0];


    // LISTS
    const lists = [];
    for (let i = 0; i < 10; i++) {
      lists.push({
        title: faker.random.words(),
        description: faker.lorem.sentence(),
        CardIds: [cardRows[i].id],
      });
    }

    // For board "recipes" -- listRows [10], [11]
    lists.push({
      title: 'Chocolate chip cookies',
      description: 'Ingredients',
      CardIds: [cardRows[10].id, cardRows[11].id, cardRows[12].id, cardRows[13].id],
    });

    lists.push({
      title: 'Pumpkin pie',
      description: 'Ingredients',
      CardIds: [cardRows[14].id, cardRows[15].id],
    });

    lists.push({
      title: 'Laundry',
      description: 'Go to laundromat with $30 cash',
      CardIds: [cardRows[16].id, cardRows[17].id]
    })

    await queryInterface.bulkInsert('Lists', lists);

    const listsQuery = await queryInterface.sequelize.query(`SELECT id from "Lists";`);
    const listRows = listsQuery[0];

    // CREATE BOARDS
    const boards = [];

    for (let i = 0; i < 10; i++) {
      boards.push({
        title: `To-Do ${i}`,
        description: faker.lorem.sentence(),
        ListIds: [listRows[i].id],
      });
    }

    boards.push({
      title: 'Recipes',
      description: 'Collect recipes and ingredients',
      ListIds: [listRows[10].id, listRows[11].id],
    });

    boards.push({
      title: 'To-Do',
      description: 'Things to do this week',
      ListIds: [listRows[12].id]
    });

    await queryInterface.bulkInsert('Boards', boards);

    const boardsQuery = await queryInterface.sequelize.query(`SELECT id from "Boards";`);
    const boardRows = boardsQuery[0];

    // Add boards with example lists and cards to "Jamie Doe"
    addBoardToUser(userRows[10].id, boardRows[11].id);
    return addBoardToUser(userRows[10].id, boardRows[10].id);

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Boards', null, {});
    await queryInterface.bulkDelete('Lists', null, {});
    await queryInterface.bulkDelete('Cards', null, {});
    return queryInterface.bulkDelete('Histories', null, {});
  }
};
