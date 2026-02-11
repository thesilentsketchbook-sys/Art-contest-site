// Stripe setup (replace with your keys)
const stripe = Stripe('pk_test_...'); // Your publishable key from Stripe
const priceId = 'price_...'; // Your price ID from Stripe

document.getElementById('pay-button').addEventListener('click', async () => {
    const form = document.getElementById('submission-form');
    if (!form.checkValidity()) {
        alert('Please fill all fields.');
        return;
    }

    // Create checkout session (in a real app, do this on a server; for demo, simulate)
    const response = await fetch('/create-checkout-session', { // You'll need a backend for production
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
    });
    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) alert(result.error.message);
});

// Smooth scroll function
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
