import express from 'express';
import prisma from './client';

const app = express();
const port = 5000;

app.get('/', async (_, res) => {
  await prisma.club.create({
    data: {
      author: 'test-author',
      country: 'test-country',
      division: 'test-division',
      voivodeship: 'test-voivodeship',
    },
  });

  const testQuery = await prisma.club.findMany();

  res.send(testQuery);
});

app.listen(port, () => console.log(`Running on port ${port}`));
