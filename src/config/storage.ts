import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;

cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "uploads",
		allowed_formats: ["jpg", "png"],
	},
});

export { storage };
