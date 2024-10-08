import express from "express";
import Stripe from "stripe";

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log("Request received to create checkout session");
  const { items } = req.body;
  console.log("Items:", items);

  let stripeApiKey = process.env.VITE_STRIPE_SECRET_KEY;

  const line_items = items.map((item) => {
    // Creates only if the attribute is selected
    let descriptionParts = [];
    if (item.selectedSize) {
      descriptionParts.push(`Size: ${item.selectedSize}`);
    }
    if (item.selectedColor) {
      descriptionParts.push(`Color: ${item.selectedColor}`);
    }
    if (item.selectedMaterial) {
      descriptionParts.push(`Material: ${item.selectedMaterial}`);
    }
    if (item.selectedScent) {
      descriptionParts.push(`Scent: ${item.selectedScent}`);
    }

    const description = descriptionParts.join(", ");

    const lineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [0],
        },
        unit_amount: item.price * 100, // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    };

    // Adds the description only if it is not empty
    if (description) {
      lineItem.price_data.product_data.description = description;
    }

    return lineItem;
  });

  try {
    const stripe = new Stripe(stripeApiKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${
        process.env.MODE === "production"
          ? process.env.VITE_PROD_APP_URL
          : process.env.VITE_DEV_APP_URL
      }`,
      cancel_url: `${
        process.env.MODE === "production"
          ? process.env.VITE_PROD_APP_URL
          : process.env.VITE_DEV_APP_URL
      }`,
    });

    console.log("Checkout session created:", session.url);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
