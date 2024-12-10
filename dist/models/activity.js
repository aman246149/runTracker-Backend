"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
const database_1 = __importDefault(require("../global/database"));
class Activity extends sequelize_1.Model {
}
Activity.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    startCoordinates: {
        type: sequelize_1.DataTypes.GEOMETRY('POINT'),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'activities',
});
user_1.default.hasMany(Activity, { foreignKey: 'userId' });
Activity.belongsTo(user_1.default, { foreignKey: 'userId' });
exports.default = Activity;
//# sourceMappingURL=activity.js.map