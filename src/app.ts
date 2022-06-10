import express from 'express';

import usersRoutes from './routes/users';

const app = express();

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.sendStatus(400);
    }

    return next();
  });
});

app.use('/api/users', usersRoutes);

app.use((req, res) => {
  const err = {
    status: 404,
    message: 'URL not found',
  };

  res.status(404).json(err);
});

// eslint-disable-next-line
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    res.status(err.status || 500).send(err.message);
  }
});

export default app;
