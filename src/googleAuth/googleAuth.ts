import { Request, Response } from "express";
import { google } from "googleapis";


const CLIENT_ID = "572795232684-0uq56f2t2a5i987qmnkflimbq4l4o93e.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://health-matters.vercel.app/login";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleLoginController = (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  });
  res.redirect(authUrl);
};

export const googleCallbackController = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener tokens de Google');
  }
};
