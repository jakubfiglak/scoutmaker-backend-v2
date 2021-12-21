import express from 'express';
import morgan from 'morgan';
import countries from './routes/countries';
import regions from './routes/regions';
import { errorHandler } from './middleware/error';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v2/countries', countries);
app.use('/api/v2/regions', regions);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`),
);
