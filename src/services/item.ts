import { Doctor } from "../interfaces/doctor.interface";
import ItemModel from "../models/item";

const inserItem = async (item: Doctor): Promise<Doctor> => {
	const response = await ItemModel.create(item);
	return response;
};

// const inserItem = async(item: Doctor) => {
//    const response = await ItemModel.create(item)
//    return response
// };

const getDrs = async () => {
	const response = await ItemModel.find({});
	return response;
};

export { inserItem, getDrs };
