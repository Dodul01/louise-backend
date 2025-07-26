import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
// import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true
}));

// App router
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send({ message: "Server is running" })
})


// global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);

export default app;