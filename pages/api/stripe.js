/**
 * Stripe API checkout page docs
 * https://stripe.com/docs/checkout/quickstart?client=next
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                //Generated with Stripe Dashboard
                shipping_options: [
                    { shipping_rate: 'shr_1MPu6ZEeTc5pXR3PI1dE8r6B' },
                    { shipping_rate: 'shr_1MPu7oEeTc5pXR3PJCWv2X1m' },
                    { shipping_rate: 'shr_1MPu8QEeTc5pXR3PTAack8m6' }
                ],
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: '{{PRICE_ID}}',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}