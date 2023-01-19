import Stripe from 'stripe';

/**
 * Stripe API checkout page docs
 * https://stripe.com/docs/checkout/quickstart?client=next
 * https://stripe.com/docs/api/checkout/sessions/object
 */
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  
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
                allow_promotion_codes: true,
                line_items: req.body.map((item) => {
                    //Retrieve image from sanity reference
                    const img = item.image[0].asset._ref;
                    const newImage = img.
                        replace('image-', 'https://cdn.sanity.io/images/xhkgiaiq/production/').
                        replace('-jpg', '.jpg').replace('-png', '.png');
                

                    //Get item price and quantity
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/`,
            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}