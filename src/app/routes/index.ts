import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";
import { VenueRouter } from "../modules/Venue/venue.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/venue',
        route: VenueRouter
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; 