import express from 'express'
import User from '../models/User'

const router = express.Router();

router.get('/users/slug/:slug', async (req, res) => {
    try {
        const user = await User.findOne({ slug: req.params.slug });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})

export default router