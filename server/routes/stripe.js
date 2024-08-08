import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    console.log('Request received to create checkout session');
    const { items } = req.body;
    console.log('Items:', items);

    const line_items = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100, // Stripe expects the amount in cents, thi'll convert it
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.MODE === 'production'
                ? process.env.VITE_PROD_URL
                : process.env.VITE_DEV_URL}?success=true`,
            cancel_url: `${process.env.MODE === 'production'
                ? process.env.VITE_PROD_URL
                : process.env.VITE_DEV_URL}?canceled=true`,
        });

        console.log('Checkout session created:', session.url);
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send({ error: error.message });
    }
});

export default router;





// ${
//     import.meta.env.MODE === 'production'
//     ? import.meta.env.VITE_PROD_API_URL
//     : import.meta.env.VITE_DEV_API_URL
// }




// ${process.env.MODE === 'production'
//     ? process.env.VITE_PROD_API_URL
//     : process.env.VITE_DEV_API_URL}