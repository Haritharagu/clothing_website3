export interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  isNew?: boolean
  discount?: number
  category: string
  size: string[]
  color: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized Wool Blend Coat",
    brand: "Aura Premium",
    price: 189.00,
    image: "/api/placeholder/300/400",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Black", "Beige", "Gray"]
  },
  {
    id: 2,
    name: "Architectural Midi Dress",
    brand: "Essentials",
    price: 145.00,
    image: "/api/placeholder/300/400",
    badge: "NEW SEASON",
    isNew: true,
    category: "Tops",
    size: ["XS", "S", "M", "L"],
    color: ["Black", "Blue", "Red"]
  },
  {
    id: 3,
    name: "Classic Moto Leather Jacket",
    brand: "Leather Studio",
    price: 299.00,
    originalPrice: 360.00,
    discount: 20,
    image: "/api/placeholder/300/400",
    badge: "20% OFF",
    category: "Outerwear",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Black"]
  },
  {
    id: 4,
    name: "Mohair Texture Sweater",
    brand: "Aura Knits",
    price: 89.00,
    image: "/api/placeholder/300/400",
    category: "Tops",
    size: ["XS", "S", "M", "L"],
    color: ["Beige", "Gray", "Tan"]
  },
  {
    id: 5,
    name: "Raw Edge Denim Jacket",
    brand: "Denim Co.",
    price: 120.00,
    image: "/api/placeholder/300/400",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Blue", "Black"]
  },
  {
    id: 6,
    name: "High-Waisted Tailored Pant",
    brand: "Modern Tailor",
    price: 110.00,
    image: "/api/placeholder/300/400",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["Black", "Beige", "Gray"]
  }
]

export const categories = [
  { name: "Tops", count: 128 },
  { name: "Bottoms", count: 80 },
  { name: "Outerwear", count: 42 },
  { name: "Accessories", count: 93 }
]

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

export const colors = [
  { name: "Black", value: "#000000" },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Tan", value: "#D2B48C" },
  { name: "Blue", value: "#0000FF" },
  { name: "Teal", value: "#008080" },
  { name: "Gray", value: "#808080" },
  { name: "Red", value: "#FF0000" }
]
