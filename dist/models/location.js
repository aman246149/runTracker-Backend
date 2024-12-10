"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const activity_1 = __importDefault(require("./activity"));
const database_1 = __importDefault(require("../global/database"));
class Location extends sequelize_1.Model {
}
Location.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    activityId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: activity_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    latLong: {
        type: sequelize_1.DataTypes.GEOMETRY('POINT'),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'locations',
});
activity_1.default.hasMany(Location, { foreignKey: 'activityId' });
Location.belongsTo(activity_1.default, { foreignKey: 'activityId' });
exports.default = Location;
//# sourceMappingURL=location.js.map