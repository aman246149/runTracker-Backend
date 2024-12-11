import { DataTypes, Model, Optional } from 'sequelize';
import User from './user';
import sequelize from '../global/database';

interface ActivityAttributes {
    id: number;
    userId: number;
    startTime: Date;
    endTime?: Date;
    createdAt: Date;
    startCoordinates: { type: string, coordinates: [number, number] };
}

interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'id' | 'createdAt'> { }

class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
    public id!: number;
    public userId!: number;
    public startTime!: Date;
    public endTime?: Date;
    public createdAt!: Date;
    public startCoordinates!: { type: string, coordinates: [number, number] };
}

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        startCoordinates: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'activities',
    }
);

// Define the one-to-many relationship between User and Activity
User.hasMany(Activity, { foreignKey: 'userId' });
Activity.belongsTo(User, { foreignKey: 'userId' });

export default Activity;
