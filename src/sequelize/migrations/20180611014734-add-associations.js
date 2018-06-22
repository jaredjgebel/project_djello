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
    await queryInterface.addColumn(
      'Users',
      'BoardIds',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    // Cards have many Assignees (Users)
    return queryInterface.addColumn(
      'Cards',
      'AssigneeIds',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

    await queryInterface.removeColumn(
      'Users',
      'BoardIds'
    )

    return queryInterface.removeColumn(
      'Cards',
      'AssigneeIds'
    )
  }
};
