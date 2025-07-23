import { Server } from "http";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
    try {
        server = app.listen(config.port, () => {
            console.log(`Server is running on port 3000`);
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