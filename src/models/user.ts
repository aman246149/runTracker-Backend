import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../global/database';

interface UserAttributes {
    id: number;
    userName: string;
    email:string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public userName!: string;
    public email!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;
