import { Request, Response } from 'express';
import Activity from '../models/activity';
import { createResponse } from '../global/api_response';

export const createActivity = async (req: Request, res: Response): Promise<void> => {
    const { userId, startTime, endTime, startCoordinates } = req.body;

    if (!userId || !startTime  || !startCoordinates) {
        res.status(400).json(createResponse({
            status: 'error',
            statusCode: 400,
            message: 'userId, startTime, endTime, and startCoordinates are required',
        }));
        return;
    }

    // Ensure startCoordinates is a valid GeoJSON object
    const geoJsonCoordinates = {
        type: "Point",
        coordinates: startCoordinates
    };

    try {
        const newActivity = await Activity.create({
            userId,
            startTime,
            endTime,
            startCoordinates: geoJsonCoordinates
        });

        res.status(201).json(createResponse({
            status: 'success',
            statusCode: 201,
            data: newActivity,
        }));
    } catch (error) {
        console.error('Error creating activity:', error);

        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        res.status(500).json(createResponse({
            status: 'error',
            statusCode: 500,
            message: errorMessage,
        }));
    }
};





export const getActivityByUserID = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
        res.status(400).json(createResponse({
            status: 'error',
            statusCode: 400,
            message: 'userId is required',
        }));
        return;
    }

    try {
        const activities = await Activity.findAll({
            where: { userId },
        });


        res.status(200).json(createResponse({
            status: 'success',
            statusCode: 200,
            data: activities,
        }));
    } catch (error) {
        console.error('Error fetching activities:', error);

        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        res.status(500).json(createResponse({
            status: 'error',
            statusCode: 500,
            message: errorMessage,
        }));
    }
};
