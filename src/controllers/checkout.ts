import { CreatePreferencePayload, PreferencePayer } from "mercadopago/models/preferences/create-payload.model";
import { Request, Response } from "express";
import ServiceModel from "../models/services";
import { mercadopago } from "../utils/payments";
import { buyServiceRequest } from "../interface/service.interface";

export async function buyServices(req: Request, res: Response) {
	try {
		const { services, patient, path_success, path_failure, path_pending }: buyServiceRequest = req.body;
		const services_found = await Promise.all(
			services.map(async ({ id, price, date }) => {
				const service = await ServiceModel.findById(id);

				return { ...service, _id: id, price, date };
			})
		);

		if (!services.length || !patient)
			throw new Error("services (id, price and date) and patient (name, surname, email) are required");

		const preference: CreatePreferencePayload = {
			items: services_found.map((service) => ({
				id: service?._id.toString(),
				title: service?.name,
				description: service?.description,
				quantity: 1,
				unit_price: service.price,
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
