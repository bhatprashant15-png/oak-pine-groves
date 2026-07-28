import lionsMane from "@/assets/product-lions-mane.jpg";
import oyster from "@/assets/product-oyster.jpg";
import morel from "@/assets/product-morel.jpg";

export type Product = {
  id: string;
  name: string;
  latin: string;
  image: string;
  description: string;
  benefits: string[];
  /** Price in INR (rupees) */
  price: number;
  weight: string;
};

export const products: Product[] = [
  {
    id: "lions-mane",
    name: "Lion's Mane",
    latin: "Hericium erinaceus",
    image: lionsMane,
    description:
      "A dual-extracted powder from cool-grown fruiting bodies, milled fine and slow-dried to protect its delicate compounds. Earthy, faintly sweet, with a seashell softness on the palate.",
    benefits: ["Focus & memory", "Nerve regeneration", "Calm clarity"],
    price: 1499,
    weight: "100 g · 40 servings",
  },
  {
    id: "oyster",
    name: "Oyster",
    latin: "Pleurotus ostreatus",
    image: oyster,
    description:
      "Cultivated on hardwood from the Kumaon hills and harvested at first bloom. A savoury, mineral-rich blend that folds into broths, rice and morning tonics.",
    benefits: ["Immune support", "Heart & cholesterol", "Plant protein"],
    price: 999,
    weight: "120 g · 48 servings",
  },
  {
    id: "morel",
    name: "Moreal",
    latin: "Morchella esculenta",
    image: morel,
    description:
      "Wild-foraged Himalayan morels, sun-cured on pine racks and stone-ground. Deep, smoky and rare — our most prized harvest, released in small seasonal lots.",
    benefits: ["Vitamin D & iron", "Antioxidant rich", "Gut wellness"],
    price: 2499,
    weight: "60 g · 24 servings",
  },
];

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (id: string) => products.find((p) => p.id === id);
