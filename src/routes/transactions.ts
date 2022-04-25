import express from 'express';
import controller from '../controllers/transactions';
const router = express.Router();

router.get('/transactions', controller.getAllTransactions);
router.get('/transactions/balance', controller.getBalanceByDate);
// router.put('/posts/:id', controller.updatePost);
// router.delete('/posts/:id', controller.deletePost);
// router.post('/posts', controller.addPost);

export = router;