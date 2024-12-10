import { Request, Response } from "express";
import Location from "../models/location";
import { createResponse } from "../global/api_response";

export const createLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { activityId, latLong } = req.body;

  if (!activityId || !latLong) {
    res.status(400).json(
      createResponse({
        status: "error",
        statusCode: 400,
        message: "activityId and latLong are required",
      })
    );
    return;
  }

  // Ensure latLong is a valid GeoJSON object
  const geoJsonLatLong = {
    type: "Point",
    coordinates: latLong,
  };

  try {
    const newLocation = await Location.create({
      activityId,
      latLong: geoJsonLatLong,
    });

    res.status(201).json(
      createResponse({
        status: "success",
        statusCode: 201,
        data: newLocation,
      })
    );
  } catch (error) {
    console.error("Error creating location:", error);

    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json(
      createResponse({
        status: "error",
        statusCode: 500,
        message: errorMessage,
      })
    );
  }
};



export const getLocationByActivityId = async (req: Request, res: Response): Promise<void> => {
    const { activityId } = req.body;

    if (!activityId) {
        res.status(400).json(createResponse({
            status: 'error',
            statusCode: 400,
            message: 'activityId is required',
        }));
        return;
    }

    try {
        // Use Sequelize findAll method to fetch only latLong values
        const locations = await Location.findAll({
            where: { activityId },
            attributes: ['latLong']
        });

        if (locations.length === 0) {
            res.status(404).json(createResponse({
                status: 'error',
                statusCode: 404,
                message: 'No locations found for the given activityId',
            }));
            return;
        }

        // Extract and format the coordinates
        const groupedCoordinates = locations.map(location => location.latLong.coordinates);

        res.status(200).json(createResponse({
            status: 'success',
            statusCode: 200,
            data: groupedCoordinates,
        }));
    } catch (error) {
        console.error('Error fetching locations:', error);

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
