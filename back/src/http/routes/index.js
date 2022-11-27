import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json("Hello world !");
});

router.get('/message', (req, res) => {
  res.json({message: 'MyMessage'});
});

export default router;
