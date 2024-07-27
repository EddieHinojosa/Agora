const Checkout = () => {
    const handleCheckout = () => {
        fetch("http://localhost:5173/create-checkout-session/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 2 },
                    { id: 2, quantity: 5 },
                    { id: 3, quantity: 1 },
                ],
            }),
        })
            .then((res) => {
                if (res.ok) return res.json();
                return res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
                window.location = url;
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