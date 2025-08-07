import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import socketIo from "./app/helper/socketHelper";

let server: HttpServer;
export let io: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        server = app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);

            io = socketIo(server)
        })
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
}

main();

process.on("unhandledRejection", (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }

    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});