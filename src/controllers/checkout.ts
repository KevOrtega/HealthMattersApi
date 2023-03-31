import { CreatePreferencePayload, PreferencePayer } from "mercadopago/models/preferences/create-payload.model";
import { Request, Response } from "express";
import ServiceModel from "../models/services";
import { mercadopago } from "../utils/payments";

export async function buyServices(req: Request, res: Response) {
	try {
		const { id: services_id } = req.params;
		const services_id_arr = services_id.split(",");
		const services = await Promise.all(services_id_arr.map((id) => ServiceModel.findById(id)));

		const {
			patient,
			path_success,
			path_failure,
			path_pending,
		}: {
			patient: { name: string; surname: string; email: string };
			path_success?: string;
			path_failure?: string;
			path_pending?: string;
		} = req.body;

		if (!services.length || !patient) throw new Error("serviceId and patient are required");

		const preference: CreatePreferencePayload = {
			items: services.map((service) => ({
				id: service?._id.toString(),
				title: service?.name,
				description: service?.description,
				quantity: 1,
				unit_price: service?.price,
			})),
			binary_mode: true,
			payer: patient as PreferencePayer,
			auto_return: "approved",
			back_urls: { success: path_success, failure: path_failure, pending: path_pending },
		};

		const {
			body: { init_point },
		} = await mercadopago.preferences.create(preference);

		res.json({ global: init_point });
	} catch (error) {
		res.status(300).send(error);
	}
}
