import { config } from "dotenv";
import mercadopago from "mercadopago";
import { Request, Response } from "express";
import { User } from "../interface/user.interface";

config();

const handleNotifications = async (req: Request, res: Response) => {
	try {
		const notificationId = req.query.id as string;

		if (!notificationId) {
			return res.status(400).json({ message: "Invalid notification id" });
		}

		const notification = await mercadopago.payment.get(parseFloat(notificationId));

		if (notification && notification.body && notification.body.status === "approved") {
			console.log("Payment approved:", notification.body);
		}
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
};
mercadopago.configure({
	access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});

export { handleNotifications, mercadopago };
