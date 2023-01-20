import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';

env.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

