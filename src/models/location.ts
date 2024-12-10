import { DataTypes, Model, Optional } from 'sequelize';
import Activity from './activity';
import sequelize from '../global/database';

interface LocationAttributes {
    id: number;
    activityId: number;
    latLong: { type: string, coordinates: [number, number] };
}

interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'> { }

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
    [x: string]: any;
    public id!: number;
    public activityId!: number;
    public latLong!: { type: string, coordinates: [number, number] };
}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        activityId: {
            type: DataTypes.INTEGER,
            references: {
                model: Activity,
                key: 'id',
            },
            allowNull: false,
        },
        latLong: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'locations',
    }
);

// Define the one-to-many relationship between Activity and Location
Activity.hasMany(Location, { foreignKey: 'activityId' });
Location.belongsTo(Activity, { foreignKey: 'activityId' });

export default Location;
