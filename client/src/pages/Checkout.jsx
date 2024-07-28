import React from 'react';

const Checkout = () => {
    const handleCheckout = () => {
        fetch("http://localhost:3000/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                //hardcoded items, will be replaced with cart items
                items: [
                    { name: "clarissa's socks", amount: 2000, quantity: 1 },
                    { name: "devon's hawaiian shirts", amount: 5000, quantity: 1 },
                    { name: "Alex's pants", amount: 3000, quantity: 1 },
                ],
            }),
        })
            .then((res) => {
                if (res.ok) return res.json();
                return res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
                window.location = url; // Redirect to Stripe Checkout
            })
            .catch((e) => {
                console.error(e.error);
            });
    };

    return (
        <button onClick={handleCheckout}>
            Checkout
        </button>
    );
};

export default Checkout;
