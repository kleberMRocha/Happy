import express from 'express';
import path from 'path';
import './database/conections';
import route from  './routes/routes';
import cors from 'cors';
import errorHandler from './errors/handler';
const app = express();


app.use(cors());
app.use(express.json());
app.use(route);
app.use(errorHandler);

app.use('/upload',express.static(path.join(__dirname,'..','upload')));
app.listen(4000, () => console.log('server UP'));


