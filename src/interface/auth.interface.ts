export interface Auth {
	email: string;
	password: string;
	medicalLicense?: string
	isDoctor?: boolean;
}
