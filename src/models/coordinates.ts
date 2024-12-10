import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../global/database';
import Location from './location';

interface CoordinateAttributes {
    id: number;
    locationId: number;
    point: { type: string, coordinates: [number, number] };
}

interface CoordinateCreationAttributes extends Optional<CoordinateAttributes, 'id'> { }

class Coordinate extends Model<CoordinateAttributes, CoordinateCreationAttributes> implements CoordinateAttributes {
    public id!: number;
    public locationId!: number;
    public point!: { type: string, coordinates: [number, number] };
}

Coordinate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        locationId: {
            type: DataTypes.INTEGER,
            references: {
                model: Location,
                key: 'id',
            },
            allowNull: false,
        },
        point: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'coordinates',
    }
);

// Define the relationship between Location and Coordinate
Location.hasMany(Coordinate, { foreignKey: 'locationId' });
Coordinate.belongsTo(Location, { foreignKey: 'locationId' });

export default Coordinate;
