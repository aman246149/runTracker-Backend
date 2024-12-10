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
exports.getLocationByActivityId = exports.createLocation = void 0;
const location_1 = __importDefault(require("../models/location"));
const api_response_1 = require("../global/api_response");
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { activityId, latLong } = req.body;
    if (!activityId || !latLong) {
        res.status(400).json((0, api_response_1.createResponse)({
            status: "error",
            statusCode: 400,
            message: "activityId and latLong are required",
        }));
        return;
    }
    const geoJsonLatLong = {
        type: "Point",
        coordinates: latLong,
    };
    try {
        const newLocation = yield location_1.default.create({
            activityId,
            latLong: geoJsonLatLong,
        });
        res.status(201).json((0, api_response_1.createResponse)({
            status: "success",
            statusCode: 201,
            data: newLocation,
        }));
    }
    catch (error) {
        console.error("Error creating location:", error);
        let errorMessage = "Internal Server Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json((0, api_response_1.createResponse)({
            status: "error",
            statusCode: 500,
            message: errorMessage,
        }));
    }
});
exports.createLocation = createLocation;
const getLocationByActivityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { activityId } = req.body;
    if (!activityId) {
        res.status(400).json((0, api_response_1.createResponse)({
            status: 'error',
            statusCode: 400,
            message: 'activityId is required',
        }));
        return;
    }
    try {
        const locations = yield location_1.default.findAll({
            where: { activityId },
            attributes: ['latLong']
        });
        if (locations.length === 0) {
            res.status(404).json((0, api_response_1.createResponse)({
                status: 'error',
                statusCode: 404,
                message: 'No locations found for the given activityId',
            }));
            return;
        }
        const groupedCoordinates = locations.map(location => location.latLong.coordinates);
        res.status(200).json((0, api_response_1.createResponse)({
            status: 'success',
            statusCode: 200,
            data: groupedCoordinates,
        }));
    }
    catch (error) {
        console.error('Error fetching locations:', error);
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
exports.getLocationByActivityId = getLocationByActivityId;
//# sourceMappingURL=locationController.js.map