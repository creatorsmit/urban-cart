import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDatabase } from "./config/dbConnect.js";
dotenv.config({ path: 'backend/config/config.env' });
import errorMiddleware from "./middlewares/errors.js";


//Handle Uncaught Exceptions
process.on('uncaughtException', (err) =>{
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to Uncaught Exceptions');
    process.exit(1);
})



// Connecting to database
connectDatabase();

app.use(express.json());

//Import all routes
import productRoutes from './routes/products.js';
app.use('/api/v1',productRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) =>{
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
})
