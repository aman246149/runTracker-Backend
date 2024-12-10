"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.post('/create', activityController_1.createActivity);
router.get('/get', activityController_1.getActivityByUserID);
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map