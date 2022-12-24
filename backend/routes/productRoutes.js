import express from 'express';
const router = express.Router();

import  {getAllProducts}  from '../controllers/productsController.js'

router.route('/').get(getAllProducts);

export default router
