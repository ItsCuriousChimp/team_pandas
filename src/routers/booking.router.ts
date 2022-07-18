import { Router } from "express";
import bookingController from "../controllers/bookings.controller";

const router = Router();

router.route("/").get([bookingController.getBookingDetails]);

export default router;
