# Oak & Pine E-commerce

Create a modern, premium, fully responsive eCommerce website for a mushroom brand named “Oak & Pine”.

The brand sells organic medicinal and gourmet mushrooms like Lion’s Mane, Oyster, and Shiitake. The design should feel luxurious, nature-inspired, and minimal, similar to high-end skincare brands.

🎨 Design Requirements:

Color palette: deep forest green, earthy brown, beige, off-white, subtle gold accents

Premium UI with smooth animations and soft shadows

Nature-inspired visuals (forest, wood, mushrooms, mist)

Elegant typography (modern serif + clean sans-serif)

🏠 Pages:

1. Homepage

Hero section with tagline:

“Nature’s Intelligence, Grown Pure”

Featured products

Benefits (Brain • Immunity • Wellness)

CTA: “Shop Now”

2. Products Page

Include products:

Lion’s Mane

Oyster

Moreal

Each product must have:

Image

Description

Health benefits

Price in ₹ (INR)

Quantity selector

“Add to Cart” button

3. Cart Page

Show selected products

Update quantity

Show total price

“Proceed to Checkout” button

💳 Payment Gateway Integration (IMPORTANT)

Integrate Razorpay payment gateway (India).

Features:

Secure checkout flow

Accept payments via:

UPI

Debit/Credit Cards

Net Banking

Wallets

Implementation Requirements:

Use Razorpay Checkout API

Add “Pay Now” button

Generate test API key placeholders:

RAZORPAY_KEY_ID = "your_key_here"

On clicking “Pay Now”:

Open Razorpay payment popup

Pass amount dynamically from cart total

Use INR currency

After successful payment:

Show “Payment Successful” message

Redirect to confirmation page

⚙️ Tech Stack:

Use React (preferred) OR HTML/CSS/JS

Backend: Node.js + Express

Create API route: /create-order (to generate Razorpay order)

Keep code clean and well-commented

📦 Extra Features:

Mobile-first responsive design

Smooth scrolling animations

Testimonials section

Contact page (Uttarakhand, India)

Footer with social links

🔐 Bonus (Very Important):

Add basic validation for checkout form

Use environment variables for API keys

Add loading animation during payment

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59618263-918e-4b73-947d-04152962c260).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
