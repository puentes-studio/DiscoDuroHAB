import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(process.env.UPLOADS_DIR))
app.use(fileUpload());
app.use(routes);
app.use(errorController);
app.use(morgan(dev));

app.listen(8080,()=>{
    console.log('Server running on port 8080: http://localhost:8080');
});