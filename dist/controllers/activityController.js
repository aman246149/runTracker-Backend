"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityByUserID = exports.createActivity = void 0;
const activity_1 = __importDefault(require("../models/activity"));
const api_response_1 = require("../global/api_response");
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, startTime, endTime, startCoordinates } = req.body;
    if (!userId || !startTime || !endTime || !startCoordinates) {
        res.status(400).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 400,
            message: 'userId, startTime, endTime, and startCoordinates are required',
        }));
        return;
    }
    const geoJsonCoordinates = {
        type: "Point",
        coordinates: startCoordinates
    };
    try {
        const newActivity = yield activity_1.default.create({
            userId,
            startTime,
            endTime,
            startCoordinates: geoJsonCoordinates
        });
        res.status(201).json((0, api_response_1.createResponse)({
            status: 'success',
            statusCode: 201,
            data: newActivity,
        }));
    }
    catch (error) {
        console.error('Error creating activity:', error);
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 500,
            message: errorMessage,
        }));
    }
});
exports.createActivity = createActivity;
const getActivityByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
        res.status(400).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 400,
            message: 'userId is required',
        }));
        return;
    }
    try {
        const activities = yield activity_1.default.findAll({
            where: { userId },
        });
        res.status(200).json((0, api_response_1.createResponse)({
            status: 'success',
            statusCode: 200,
            data: activities,
        }));
    }
    catch (error) {
        console.error('Error fetching activities:', error);
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 500,
            message: errorMessage,
        }));
    }
});
exports.getActivityByUserID = getActivityByUserID;
//# sourceMappingURL=activityController.js.map