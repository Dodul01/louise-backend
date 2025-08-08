import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';
// import router from './app/routes';

// fond-endear-zippy-wisely
// Done! The Stripe CLI is configured for your account with account id acct_1PcPm62MP0L90Yjv

// Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.
// how to run stripe in cli >"C:\Users\allen\Downloads\stripe_1.28.0_windows_x86_64\stripe.exe" login

// whsec_d0c446948ffb18c08edd304e3608a34acad013b585fe382be606e992b2b826cb

const app: Application = express();

app.use('/api/v1/gift/webhook', express.raw({ type: 'application/json' }));

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
    res.send({ message: "Server is running" });
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);

export default app;