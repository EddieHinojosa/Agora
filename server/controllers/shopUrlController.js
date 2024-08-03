import slugify from "slugify";
import User from '../models/User'

export const updateShop = async (req, res) => {
    try {
        const { userId, newShopName } = req.body;
        const slug = slugify(newShopName, { lower: true, strict: true })
        const urlExists = await User.findOne({ shopUrl: slug })

        let shopUrl
        if (urlExists) {
            const uniqueId = new mongoose.Types.ObjectId().toString();
            shopUrl = `${slug}-${uniqueId}`;
        } else {
            shopUrl = slug
        }

        await User.findByIdAndUpdate(userId, { shopName: newShopName, shopUrl })
        res.status(200).json({ message: 'Shop URL was a success!', shopUrl })
    } catch (error) {
        res.status(500).json({ message: 'error:', error })
    }
}