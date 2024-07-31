import express from 'express'
import { getAllProducts } from '../controllers/productController.js'

const router = express.Router()

router.get('/shopmanager/products', getAllProducts)

export default router