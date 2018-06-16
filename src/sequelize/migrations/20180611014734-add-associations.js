'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cards have many Histories
    await queryInterface.addColumn(
      'Cards',
      'HistoryIds',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )


    // Lists have many Cards
    await queryInterface.addColumn(
      'Lists',
      'CardIds',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    // Boards have many Lists
    await queryInterface.addColumn(
      'Boards', // name of Source model
      'ListIds', // added key
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    // Users have many Boards
    // Board have many Users
    await queryInterface.createTable(
      'UserBoards',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        UserIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        BoardIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        }
      }
    )

    // Cards have many Users
    // Users have many Cards
    return queryInterface.createTable(
      'UserCards',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        UserIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        CardIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Cards',
      'HistoryIds'
    )

    await queryInterface.removeColumn(
      'Lists',
      'CardIds'
    )

    await queryInterface.removeColumn(
      'Boards',
      'ListIds'
    )

    await queryInterface.dropTable('UserCards')

    return queryInterface.dropTable('UserBoards')

  }
};
