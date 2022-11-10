const db = require('../index');
const {Model, DataTypes} = require('sequelize');
const logger = require('../../logger');

class Rule extends Model {
    static associate() {

    }
}

Rule.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'Rule',
    }
);

module.exports = Rule;