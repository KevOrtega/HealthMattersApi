import { config } from "dotenv";
import mercadopago from "mercadopago";
import type {
	CreatePreferencePayload,
	PreferencePayer,
	PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import { Request, Response } from "express";

config();

async function handleNotifications(req: Request, res: Response) {
	try {
		const notificationId = req.query.id as string;

		if (!notificationId) {
			return res.status(400).json({ message: "Invalid notification id" });
		}

		const notification = await mercadopago.payment.get(parseFloat(notificationId));

		if (notification && notification.body && notification.body.status === "approved") {
			// Aquí puedes realizar cualquier acción necesaria para procesar el pago aprobado,
			// como actualizar el estado del pedido, enviar un correo electrónico de confirmación, etc.
			console.log("Pago aprobado:", notification.body);
		}

		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}

async function handler(req: Request, res: Response) {
	try {
		// Aquí es donde configuramos nuestra sesión, estableciendo el token de acceso proporcionado por MP
		mercadopago.configure({
			access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
		});

		// Esta es solo información básica, pero realmente deberás capturar la información importante que MP solicita a continuación
		const { patient, date } = req.body;

		// Aquí creamos la "Preference", esta es la configuración para el pago
		const preference: CreatePreferencePayload = {
			binary_mode: true,
			items: [
				{
					title: "- Nombre de la marca",
					description: `Descripcion del producto ${date.service}`,
					picture_url: "url de imagen",
					quantity: 1,
					currency_id: "ARS",
					unit_price: parseFloat(date.price),
				},
			],
			payer: {
				name: patient.name,
				surname: patient.name.split(" ")[1] ?? " TGB",
				email: patient.email,
			} as PreferencePayer,
			back_urls: {
				success: "https://health-matters.vercel.app/",
				failure: "https://health-matters.vercel.app/",
				pending: "https://health-matters.vercel.app/",
			} as PreferenceBackUrl,
			auto_return: "approved",
		};

		// Aquí configuramos la preferencia, es como enviarla a MP y luego su API devuelve un objeto de respuesta.
		// Solo necesitamos el id de él, por lo que establecemos la respuesta en {global: response.body.id}.
		// Esto enviará un objeto literal donde podemos acceder al ID para nuestro botón de frontend.
		const preferenceCreate = await mercadopago.preferences.create(preference);

		res.status(200).json({ global: preferenceCreate.body.id });
	} catch (error) {
		res.status(500).json({ global: error });
	}
}

export { handleNotifications, handler };
