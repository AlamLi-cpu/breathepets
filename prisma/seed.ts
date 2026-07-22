import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set in .env");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.cartItem.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.product.deleteMany();

  // Seed products
  const products = [
    {
      name: "AutoScooper 12",
      slug: "autoscooper-12",
      description:
        "The ultimate self-cleaning litter box. No app, no Wi-Fi needed — just plug it in and enjoy up to 10 days of hands-free cleanliness. Engineered with multi-layer safety sensors and a sealed waste drawer for maximum odor control.",
      price: 499.99,
      compareAtPrice: 599.99,
      image: "https://placehold.co/600x600/e2e8f0/475569?text=AutoScooper+12",
      images: JSON.stringify([
        "https://placehold.co/600x600/e2e8f0/475569?text=AutoScooper+12",
        "https://placehold.co/600x600/cbd5e1/475569?text=Side+View",
        "https://placehold.co/600x600/d4d4d8/475569?text=Interior",
      ]),
      category: "Litter Box",
      features: JSON.stringify([
        "Self-cleaning cycle",
        "Multi-layer safety sensors",
        "Sealed waste drawer",
        "Up to 10 days clean",
        "No app or Wi-Fi needed",
        "Open-top design for all cats",
      ]),
      inStock: true,
    },
    {
      name: "AutoScooper 11",
      slug: "autoscooper-11",
      description:
        "Our entry-level self-cleaning litter box. Same great engineering with essential features. Perfect for single-cat households looking to upgrade their litter box experience.",
      price: 399.99,
      compareAtPrice: 449.99,
      image: "https://placehold.co/600x600/e2e8f0/475569?text=AutoScooper+11",
      images: JSON.stringify([
        "https://placehold.co/600x600/e2e8f0/475569?text=AutoScooper+11",
        "https://placehold.co/600x600/cbd5e1/475569?text=Side+View",
      ]),
      category: "Litter Box",
      features: JSON.stringify([
        "Self-cleaning cycle",
        "Safety sensors",
        "Waste drawer",
        "Up to 7 days clean",
        "No app or Wi-Fi needed",
      ]),
      inStock: true,
    },
    {
      name: "Waste Bag Refills (12-Pack)",
      slug: "waste-bag-refills",
      description:
        "Custom-fit waste bags designed exclusively for the AutoScooper. Each bag lasts up to 10 days. Carbon-infused for superior odor control.",
      price: 29.99,
      image: "https://placehold.co/600x600/e2e8f0/475569?text=Waste+Bags",
      images: JSON.stringify([
        "https://placehold.co/600x600/e2e8f0/475569?text=Waste+Bags",
      ]),
      category: "Consumables",
      features: JSON.stringify([
        "12 bags per pack",
        "Carbon-infused for odor control",
        "Custom fit for AutoScooper",
        "Each bag lasts up to 10 days",
      ]),
      inStock: true,
    },
    {
      name: "Premium Clumping Litter (20lb)",
      slug: "premium-clumping-litter",
      description:
        "Low-dust, fast-clumping litter formulated specifically for automatic litter boxes. Minimizes tracking and maximizes odor absorption.",
      price: 24.99,
      image: "https://placehold.co/600x600/e2e8f0/475569?text=Premium+Litter",
      images: JSON.stringify([
        "https://placehold.co/600x600/e2e8f0/475569?text=Premium+Litter",
      ]),
      category: "Consumables",
      features: JSON.stringify([
        "Low dust formula",
        "Fast clumping",
        "Superior odor absorption",
        "20lb bag",
      ]),
      inStock: true,
    },
    {
      name: "Odor Control Carbon Filter",
      slug: "carbon-filter",
      description:
        "Replaceable carbon filter that traps odors before they escape the waste drawer. Replace every 30 days for optimal freshness.",
      price: 14.99,
      image: "https://placehold.co/600x600/e2e8f0/475569?text=Carbon+Filter",
      images: JSON.stringify([
        "https://placehold.co/600x600/e2e8f0/475569?text=Carbon+Filter",
      ]),
      category: "Consumables",
      features: JSON.stringify([
        "Activated carbon filtration",
        "Replace every 30 days",
        "Traps odors effectively",
      ]),
      inStock: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products`);
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
