// import { Request, Response } from "express";
// import { google } from "googleapis";

// const clientID = "572795232684-0uq56f2t2a5i987qmnkflimbq4l4o93e.apps.googleusercontent.com";
// const clientSecret = "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";
// const redirectURI = "https://health-matters.vercel.app/login";

// const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);

// export const googleLoginController = (_req: Request, res: Response) => {
// 	const authURL = oauth2Client.generateAuthUrl({
// 		access_type: "offline",
// 		scope: ["https://www.googleapis.com/auth/userinfo.profile"],
// 	});
// 	res.send(authURL);
// };
