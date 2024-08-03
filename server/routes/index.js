import express from 'express'

const router = express.Router()

import authRoutes from './auth.js'
import shopRoutes from './shop.js'
import userRoutes from './user.js'
import newProduct from './newProduct.js'
import getProduct from './Products.js'
import authenticateToken from './unifiedAuth.js'

router.use('/auth', authRoutes)
router.use('/shop', shopRoutes)
router.use('/user', userRoutes)
router.use('/newproduct', newProduct)
router.use('/getproduct', getProduct)
router.use('/unifiedauth', authenticateToken)

export default router