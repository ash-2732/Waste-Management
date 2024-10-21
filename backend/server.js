import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import router from './routes/authRoute.js';
import cors from 'cors';
import reportWasteRouter from './routes/reportWasteRoute.js';


dotenv.config();

//database connection
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', router);
app.use('/api/v1/reportWaste', reportWasteRouter);

app.get('/', (req, res) => {
    res.send({
        message: 'Server is ready hahahaha'
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serve running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});