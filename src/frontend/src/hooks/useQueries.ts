import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Order, Product, Review } from "../backend.d";
import { useActor } from "./useActor";

const SEED_KEY = "viralmall_seeded_v1";

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Portable Mini Air Cooler Fan",
    category: "Portable Fans",
    price: 599n,
    originalPrice: 999n,
    imageUrl: "/assets/generated/product-air-cooler.dim_600x600.jpg",
    benefits: [
      "360° cooling airflow",
      "USB rechargeable",
      "Ultra-quiet motor",
      "3 speed settings",
      "Compact & portable",
    ],
    rating: 4.5,
    reviewCount: 128n,
    inStock: true,
    description:
      "Beat the heat with our bestselling mini air cooler. Perfect for desks, bedside, and travel.",
  },
  {
    id: "p2",
    name: "Smart Tower Fan with Remote",
    category: "Portable Fans",
    price: 1199n,
    originalPrice: 1999n,
    imageUrl: "/assets/generated/product-tower-fan.dim_600x600.jpg",
    benefits: [
      "Remote control included",
      "12-hour timer",
      "Auto-oscillation",
      "LCD display",
      "Energy-saving mode",
    ],
    rating: 4.7,
    reviewCount: 89n,
    inStock: true,
    description:
      "Premium tower fan with smart features. Control from your couch with the included remote.",
  },
  {
    id: "p3",
    name: "Rechargeable Neck Fan",
    category: "Neck Fans",
    price: 799n,
    originalPrice: 1299n,
    imageUrl: "/assets/generated/product-neck-fan.dim_600x600.jpg",
    benefits: [
      "Hands-free cooling",
      "Bladeless safe design",
      "8-hour battery life",
      "2 speed modes",
      "Lightweight 160g",
    ],
    rating: 4.6,
    reviewCount: 214n,
    inStock: true,
    description:
      "Stay cool hands-free! Wearable bladeless neck fan perfect for outdoors, cooking, and commutes.",
  },
  {
    id: "p4",
    name: "Mini Desk Fan",
    category: "Mini Gadgets",
    price: 399n,
    originalPrice: 699n,
    imageUrl: "/assets/generated/product-desk-fan.dim_600x600.jpg",
    benefits: [
      "USB powered",
      "360° rotation head",
      "Silent operation",
      "Compact desktop size",
      "Flexible neck",
    ],
    rating: 4.3,
    reviewCount: 176n,
    inStock: true,
    description:
      "The perfect desk companion. Silent USB-powered fan keeps you cool while you work.",
  },
  {
    id: "p5",
    name: "Handheld Fan",
    category: "Mini Gadgets",
    price: 249n,
    originalPrice: 449n,
    imageUrl: "/assets/generated/product-handheld-fan.dim_600x600.jpg",
    benefits: [
      "Ultra-portable",
      "Built-in battery",
      "3 speed settings",
      "Foldable design",
      "Multiple colors",
    ],
    rating: 4.2,
    reviewCount: 302n,
    inStock: true,
    description:
      "Take the breeze with you everywhere. Foldable handheld fan fits in any bag or pocket.",
  },
  {
    id: "p6",
    name: "Vegetable Chopper",
    category: "Kitchen Tools",
    price: 349n,
    originalPrice: 599n,
    imageUrl: "/assets/generated/product-veggie-chopper.dim_600x600.jpg",
    benefits: [
      "Chops in seconds",
      "BPA-free container",
      "Easy to clean",
      "Sharp stainless blades",
      "1.2L capacity",
    ],
    rating: 4.4,
    reviewCount: 156n,
    inStock: true,
    description:
      "Save 10x prep time with our viral vegetable chopper. Perfect for salads, onions, and more.",
  },
];

const SEED_REVIEWS: {
  productId: string;
  reviewer: string;
  rating: bigint;
  comment: string;
}[] = [
  {
    productId: "p1",
    reviewer: "Priya S.",
    rating: 5n,
    comment:
      "Amazing product! Keeps me cool all day at my desk. Very quiet too.",
  },
  {
    productId: "p1",
    reviewer: "Rahul M.",
    rating: 4n,
    comment:
      "Good value for money. Battery lasts around 6 hours. Highly recommend!",
  },
  {
    productId: "p2",
    reviewer: "Anita K.",
    rating: 5n,
    comment: "The remote control is a game changer. Love the timer feature!",
  },
  {
    productId: "p2",
    reviewer: "Vijay P.",
    rating: 5n,
    comment: "Best tower fan I've bought. Very powerful and stylish design.",
  },
  {
    productId: "p3",
    reviewer: "Deepa R.",
    rating: 5n,
    comment:
      "Perfect for cooking! Hands-free cooling is exactly what I needed.",
  },
  {
    productId: "p3",
    reviewer: "Kiran T.",
    rating: 4n,
    comment: "Great for morning walks. Lightweight and comfortable.",
  },
  {
    productId: "p4",
    reviewer: "Suresh B.",
    rating: 4n,
    comment: "Works great for my office desk. Very silent - nobody notices it!",
  },
  {
    productId: "p4",
    reviewer: "Meena L.",
    rating: 5n,
    comment: "Super quiet and effective. Great buy for work from home.",
  },
  {
    productId: "p5",
    reviewer: "Arun J.",
    rating: 4n,
    comment:
      "Perfect for travel. Fits in my bag easily. 3 speed modes are useful.",
  },
  {
    productId: "p5",
    reviewer: "Sita D.",
    rating: 4n,
    comment: "Good product. Battery could be better but otherwise great!",
  },
  {
    productId: "p6",
    reviewer: "Pooja N.",
    rating: 5n,
    comment: "Cuts vegetables in seconds! Made cooking so much faster.",
  },
  {
    productId: "p6",
    reviewer: "Ramesh C.",
    rating: 5n,
    comment: "Excellent quality. Blades are very sharp and easy to clean.",
  },
];

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useProductReviews(productId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviewsByProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      reviewer,
      rating,
      comment,
    }: {
      productId: string;
      reviewer: string;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addReview(productId, reviewer, rating, comment);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["reviews", vars.productId] });
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (order: Order) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(order);
    },
  });
}

export function useSeedData() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["seed"],
    queryFn: async () => {
      if (!actor) return null;
      const alreadySeeded = localStorage.getItem(SEED_KEY);
      if (alreadySeeded) return null;
      await Promise.all(PRODUCTS.map((p) => actor.addProduct(p)));
      for (const r of SEED_REVIEWS) {
        await actor.addReview(r.productId, r.reviewer, r.rating, r.comment);
      }
      localStorage.setItem(SEED_KEY, "1");
      return null;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
}
