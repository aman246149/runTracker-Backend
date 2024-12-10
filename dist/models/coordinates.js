"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../global/database"));
const location_1 = __importDefault(require("./location"));
class Coordinate extends sequelize_1.Model {
}
Coordinate.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    locationId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: location_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    point: {
        type: sequelize_1.DataTypes.GEOMETRY('POINT'),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'coordinates',
});
location_1.default.hasMany(Coordinate, { foreignKey: 'locationId' });
Coordinate.belongsTo(location_1.default, { foreignKey: 'locationId' });
exports.default = Coordinate;
//# sourceMappingURL=coordinates.js.map