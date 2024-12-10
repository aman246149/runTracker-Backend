import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './global/database';
import userRoutes from './routes/userRoutes';
import activityRoutes from './routes/activityRoutes';
import locationRoutes from './routes/locationRoutes';
require('dotenv').config()




const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes); 
app.use('/api/locations', locationRoutes);

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
