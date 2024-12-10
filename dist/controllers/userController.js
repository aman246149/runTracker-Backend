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
exports.getUser = exports.createUser = void 0;
const api_response_1 = require("../global/api_response");
const user_1 = __importDefault(require("../models/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email } = req.body;
    if (!userName || !email) {
        res.status(400).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 400,
            message: 'userName and email are required',
        }));
    }
    try {
        const newUser = yield user_1.default.create({ userName, email });
        res.status(201).json((0, api_response_1.createResponse)({
            status: 'success',
            statusCode: 201,
            data: newUser,
        }));
    }
    catch (error) {
        console.error('Error saving user to database:', error);
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
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            res.status(400).json((0, api_response_1.createResponse)({
                status: 'error',
                statusCode: 400,
                message: 'User email is required',
            }));
        }
        const user = yield user_1.default.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json((0, api_response_1.createResponse)({
                status: 'error',
                statusCode: 404,
                message: 'User not found',
            }));
        }
        res.status(200).json((0, api_response_1.createResponse)({
            status: 'success',
            statusCode: 200,
            message: 'User fetched successfully',
            data: user,
        }));
    }
    catch (error) {
        console.error('Error fetching user:', error);
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
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map