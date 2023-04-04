export type iServiceToBuy = {
	id: string;
	price: number;
	date: Date;
};

export type iPatient = {
	name: string;
	surname: string;
	email: string;
};

export type buyServiceRequest = {
	services: iServiceToBuy[];
	patient: iPatient;
	path_success?: string;
	path_failure?: string;
	path_pending?: string;
};
