import { config } from "dotenv";
import mercadopago from "mercadopago";
import { Request, Response } from "express";
import nodemailer from "nodemailer"
// import { User } from "../interface/user.interface";
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const EMAIL_PASSWORD =  process.env.EMAIL_PASSWORD
config();

const handleNotifications = async (req: Request, res: Response) => {
	// const user = req.user as User;
	try {
		const notificationId = req.query.id as string;

		if (!notificationId) {
			return res.status(400).json({ message: "Invalid notification id" });
		}

		const notification = await mercadopago.payment.get(parseFloat(notificationId));

		if (notification && notification.body && notification.body.status === "approved") {
			// Aquí puedes realizar cualquier acción necesaria para procesar el pago aprobado,
			// como actualizar el estado del pedido, enviar un correo electrónico de confirmación, etc.
			console.log("Payment approved:", notification.body);
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: EMAIL_ADDRESS,
				pass: EMAIL_PASSWORD,
			},
		});

		// const userEmail = user.email;

		const mailOptions = {
			from: EMAIL_ADDRESS,
			// to: userEmail,
			subject: "Payment confirmation",
			html: "<p>Your payment has been approved. Thanks for your purchase</p>",
		};

		transporter.sendMail(mailOptions,  (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Confirmation email sent: " + info.response);
			}
		});
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}

mercadopago.configure({
	access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});

export { handleNotifications, mercadopago };
