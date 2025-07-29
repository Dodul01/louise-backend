import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";
import { VenueRouter } from "../modules/Venue/venue.route";
import { GiftRouter } from "../modules/Gift/gift.route";
import { ReviewRouter } from "../modules/Review/review.route";

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
    },
    {
        path: '/gift',
        route: GiftRouter
    },
    {
        path: '/review',
        route: ReviewRouter
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; 