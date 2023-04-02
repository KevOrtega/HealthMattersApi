import { Auth } from "./auth.interface";

export interface User extends Auth {
	name: string;
	description: string;
	medicalLicense?: string;
	lastname: string;
	specialties: string;
	phoneNumber: number;
	password: string;
}
