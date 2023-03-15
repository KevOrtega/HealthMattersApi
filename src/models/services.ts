import { Schema, Types, Model, model } from "mongoose";

export interface Services {
	title: string;
	description: string;
	price: string;
	address: string;
	phoneNumber: number;
}
