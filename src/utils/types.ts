import { Request } from 'express';
import { Multer } from 'multer';
import { Params } from 'express-serve-static-core';
import { CloudinaryStorage } from 'cloudinary-storage';


interface CloudinaryParams extends CloudinaryStorage.CloudinaryStorageOptions {
  folder?: string;
}

interface CustomParams extends Params {
  folder?: string;
}

declare global {
  namespace Express {
    interface Request {
      folder?: string;
    }
  }
}

export { CustomParams, CloudinaryParams };


