'use strict';

module.exports = (sequelize, DataTypes) => {


  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ListIds: DataTypes.ARRAY(DataTypes.INTEGER),

  },
    // {
    //   validate: {
    //     notInArray() {
    //       function hasDuplicates(array) {
    //         if (!array) return true;
    //         return (new Set(array)).size !== array.length;
    //       }


    //       // const QueryInterface = sequelize.getQueryInterface();

    //       // const listIds = QueryInterface.sequelize.query(`SELECT ListIds from "Boards" WHERE "id" = ${this.dataValues.id}`);

    //       // console.log(this.dataValues);

    //     }
    //   }
    // }
  );

  return Board;
};