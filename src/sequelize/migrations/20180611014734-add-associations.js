'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cards have many Histories
    await queryInterface.addColumn(
      'Cards',
      'HistoryIds',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Histories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )


    // Lists have many Cards
    await queryInterface.addColumn(
      'Lists',
      'CardIds',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cards',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    // Boards have many Lists
    await queryInterface.addColumn(
      'Boards', // name of Source model
      'ListIds', // added key
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lists', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    // Users have many Boards
    // Board have many Users
    await queryInterface.createTable(
      'UserBoards',
      {
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
          primaryKey: true,
        },
        BoardIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          primaryKey: true,
        }
      }
    )

    // Cards have many Users
    // Users have many Cards
    return queryInterface.createTable(
      'UserCards',
      {
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
          primaryKey: true,
        },
        CardIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          primaryKey: true,
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
