const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class RuleAction extends Model {
    static associate(models) {

    }
}

RuleAction.init(
    {
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'RuleAction',
    },
);

module.exports = RuleAction;