"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/create', (req, res) => (0, userController_1.createUser)(req, res));
router.get('/get', (req, res) => (0, userController_1.getUser)(req, res));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map