import { request } from 'http';
import multer from 'multer';
import Multer from 'multer';
import path from 'path';

export default {
    storage: Multer.diskStorage({
        destination:path.join(__dirname,'..','..','upload'),
        filename:(request,file,cb) =>{
            const filename = `${Date.now()}_${file.originalname}`
            cb(null,filename);
        }

    })
}