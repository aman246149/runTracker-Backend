"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbUrl = process.env.DB_URL;
const sequelize = new sequelize_1.Sequelize(`${dbUrl}`, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map