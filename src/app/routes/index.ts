import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";
import { VenueRouter } from "../modules/Venue/venue.route";
import { GiftRouter } from "../modules/Gift/gift.route";
import { ReviewRouter } from "../modules/Review/review.route";
import { PrivacyRoute } from "../modules/PrivacyPolicy/privacyPolicy.route";
import { TermsRoute } from "../modules/TermsAndConditions/TermsAndConditions.route";
import { ProfileRouter } from "../modules/Profile/profile.route";
import { HelpAndSupportRouter } from "../modules/HelpAndSupport/HelpAndSupport.route";
import { OverviewRouter } from "../modules/Overview/oveview.route";

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
    {
        path: '/privacy',
        route: PrivacyRoute
    },
    {
        path: '/terms',
        route: TermsRoute
    },
    {
        path: '/profile',
        route: ProfileRouter
    },
    {
        path: '/help-and-support',
        route: HelpAndSupportRouter
    },
    {
        path: '/overview',
        route: OverviewRouter
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; 