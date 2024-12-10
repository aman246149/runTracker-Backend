"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./global/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(body_parser_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
app.use('/api/locations', locationRoutes_1.default);
database_1.default.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
//# sourceMappingURL=index.js.map