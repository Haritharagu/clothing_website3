# Aura Fashion E-commerce Platform

A premium fashion e-commerce platform specializing in modern, elegant clothing and accessories.

## Features

- **Modern Design**: Dark theme with gold accents reflecting premium craftsmanship
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Product Catalog**: Browse and filter products by category, size, color, and price
- **Shopping Cart**: Add items to cart with real-time updates
- **Wishlist**: Save favorite products for later
- **Search Functionality**: Global search with autocomplete
- **Newsletter Signup**: Email subscription for exclusive updates
- **Sorting Options**: Sort products by price, popularity, rating, and more
- **Pagination**: Navigate through large product catalogs efficiently

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **State Management**: React hooks
- **Responsive Design**: Mobile-first approach

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles and design system
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── shop/              # Shop page with filters
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── ProductCard.tsx    # Product display card
│   ├── HeroSection.tsx    # Homepage hero banner
│   ├── Filters.tsx        # Product filtering sidebar
│   ├── SortDropdown.tsx   # Product sorting options
│   └── Pagination.tsx     # Pagination component
└── data/
    └── products.ts        # Product data and configurations
```

## Design System

### Color Palette
- **Primary Gold**: #D4A537 (brand accents, CTAs, active states)
- **Dark Background**: #1A1A1A (main background)
- **Dark Gray**: #4A4A4A (secondary text, borders)
- **White**: #FFFFFF (primary text)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights
- **Body Text**: Regular weights with clear hierarchy

### Components
- **Buttons**: Primary (gold background) and Secondary (gold border)
- **Cards**: Dark background with hover effects
- **Forms**: Dark gray inputs with gold focus states

## Pages

### Homepage (`/`)
- Hero section with seasonal collection banner
- Featured products grid
- Newsletter signup
- Full site navigation

### Shop Page (`/shop`)
- Advanced filtering by category, size, color, and price
- Product sorting options
- Paginated product grid
- Responsive filter sidebar

## Features Implemented

✅ Project setup with Next.js and TypeScript
✅ TailwindCSS configuration with custom design system
✅ Responsive header with navigation and search
✅ Homepage with hero section and product grid
✅ Product cards with wishlist functionality
✅ Advanced filtering and sorting system
✅ Pagination component
✅ Footer with newsletter signup
✅ Mobile-responsive design

## Future Enhancements

- Customer reviews and ratings
- Quick view modal for products
- Product zoom functionality
- User authentication system
- Shopping cart management
- Checkout process
- Order tracking
- Personalized recommendations
- Multiple currency support
- International shipping options

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
