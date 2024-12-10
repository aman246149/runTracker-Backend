import { Sequelize } from 'sequelize';
import 'dotenv/config';
const dbUrl = process.env.DB_URL
const sequelize = new Sequelize(`${dbUrl}`,{
    dialect:'postgres',
    logging:false,
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
});

export default sequelize;
