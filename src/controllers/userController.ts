import { Request, Response } from 'express';
import { createResponse } from '../global/api_response';
import User from '../models/user';


export const createUser = async (req: Request, res: Response) => {
    const { userName, email } = req.body;

    if (!userName || !email) {
        res.status(400).json(createResponse({
            status: 'error',
            statusCode: 400,
            message: 'userName and email are required',
        }));
        
    }

    try {
        const newUser = await User.create({ userName, email });
        res.status(201).json(createResponse({
            status: 'success',
            statusCode: 201,
            data: newUser,
        }));
    } catch (error) {
        console.error('Error saving user to database:', error);

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




export const getUser = async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
             res.status(400).json(createResponse({
                status: 'error',
                statusCode: 400,
                message: 'User email is required',
            }));
        }

        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
             res.status(404).json(createResponse({
                status: 'error',
                statusCode: 404,
                message: 'User not found',
            }));
        }

        res.status(200).json(createResponse({
            status: 'success',
            statusCode: 200,
            message: 'User fetched successfully',
            data: user,
        }));
    } catch (error) {
        console.error('Error fetching user:', error);

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
