import {Router} from 'express';
import orphnages from '../controller/orphanages';
import multer from 'multer';
import uploadConfig from '../config/upload';

const route = Router();
const upload = multer(uploadConfig);

route.post('/orphanages',upload.array('images'),orphnages.create);
route.get('/orphanages',orphnages.index);
route.get('/orphanages/:id',orphnages.show);

export default route;