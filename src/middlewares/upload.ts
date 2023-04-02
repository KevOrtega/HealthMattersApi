import fileUpload, { UploadedFile } from 'express-fileupload';

const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  });

  export { uploadMiddleware }