import { Request, Response } from "express";
import { google } from "googleapis";

const clientID = "572795232684-0uq56f2t2a5i987qmnkflimbq4l4o93e.apps.googleusercontent.com";
const clientSecret = "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";
const redirectURI = "http://localhost:3001";

const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);

export const logOut = (req: Request, res: Response) => {
	oauth2Client.revokeCredentials((err) => {
		if (err) {
			console.error("Error revoking access token:", err);
			res.status(500).send("Error revoking access token");
		} else {
			console.log("Access token revoked");
			res.send("Closed session");
		}
	});
};
