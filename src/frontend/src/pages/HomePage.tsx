import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Headphones, RefreshCcw, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useAllProducts, useSeedData } from "../hooks/useQueries";

const CATEGORIES = [
  { name: "Portable Fans", icon: "🌬️", desc: "USB & rechargeable fans" },
  { name: "Neck Fans", icon: "🔋", desc: "Hands-free wearable fans" },
  { name: "Mini Gadgets", icon: "⚡", desc: "Compact everyday gadgets" },
  { name: "Kitchen Tools", icon: "🍴", desc: "Smart kitchen essentials" },
];

const WHY_FEATURES = [
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "100% Genuine Products",
    desc: "All products are quality-checked and authentic.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "Easy Returns",
    desc: "Hassle-free 7-day return policy on all orders.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payments",
    desc: "Your payment info is always safe and encrypted.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Support",
    desc: "We're here whenever you need help.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    stars: 5,
    text: "Got my neck fan in 2 days! Absolutely love it. Works perfectly for my morning walks. Fast delivery and great packaging!",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    stars: 5,
    text: "The air cooler fan is incredible. Keeps my entire workspace cool. COD made it super easy to order!",
  },
  {
    name: "Anita Patel",
    location: "Bengaluru",
    stars: 5,
    text: "Vegetable chopper is a game changer! Saves so much time in the kitchen. Highly recommend to everyone.",
  },
  {
    name: "Vijay Kumar",
    location: "Hyderabad",
    stars: 4,
    text: "Super fast delivery and authentic products. The handheld fan is great for summer travel. Will order again!",
  },
];

const FAQS = [
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes! We offer Cash on Delivery (COD) across India. You pay only when the product is delivered to your doorstep.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3-5 business days. Express delivery is available in major cities within 1-2 days.",
  },
  {
    q: "Can I return a product?",
    a: "Yes, we offer a 7-day hassle-free return policy. Just reach out to our support team and we'll arrange a pickup.",
  },
  {
    q: "Are the products genuine?",
    a: "Absolutely! All products on ViralMallIndia are 100% authentic and quality-checked before shipping.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive an SMS with a tracking link. You can also contact us for real-time updates.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes! We ship to all states and union territories across India. Free shipping is available on all orders.",
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

function Stars({ count }: { count: number }) {
  return <span className="text-brand-orange">{"★".repeat(count)}</span>;
}

export function HomePage() {
  useSeedData();
  const { data: products, isLoading } = useAllProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-brand-light" data-ocid="hero.section">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                🔥 #1 Trending Store in India
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight mb-5 uppercase">
                India's Most
                <br />
                <span className="text-brand-orange">Viral Products</span>
                <br />
                Store
              </h1>
              <p className="text-brand-body text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
                Get the hottest trending products delivered to your doorstep.
                COD Available.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-lg transition-colors"
                  data-ocid="hero.primary_button"
                >
                  Shop Now →
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-lg transition-colors"
                  data-ocid="hero.secondary_button"
                >
                  View Trending
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-brand-orange/10 rounded-3xl transform rotate-3" />
                <img
                  src="/assets/generated/product-air-cooler.dim_600x600.jpg"
                  alt="Trending Product"
                  className="relative w-full rounded-3xl shadow-card-hover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section
        className="bg-brand-dark text-white"
        data-ocid="features.section"
      >
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 py-2">
              <span className="text-2xl">📦</span>
              <div>
                <div className="font-bold text-sm uppercase tracking-wide text-brand-orange">
                  Cash on Delivery
                </div>
                <div className="text-xs text-gray-400">
                  Pay when you receive
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 py-2 sm:border-x sm:border-gray-700 sm:px-6">
              <span className="text-2xl">🚚</span>
              <div>
                <div className="font-bold text-sm uppercase tracking-wide text-brand-orange">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-400">On all orders</div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 py-2">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="font-bold text-sm uppercase tracking-wide text-brand-orange">
                  Fast Delivery
                </div>
                <div className="text-xs text-gray-400">3-5 business days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-14 md:py-20" data-ocid="trending.section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-dark">
                Trending Products
              </h2>
              <p className="text-brand-body mt-1">
                Our most viral picks right now
              </p>
            </div>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              data-ocid="trending.loading_state"
            >
              {SKELETON_KEYS.map((k) => (
                <div
                  key={k}
                  className="bg-brand-light rounded-xl aspect-[3/4] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              data-ocid="trending.list"
            >
              {(products ?? []).map((p, i) => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ProductCard product={p} index={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-14 bg-brand-light" data-ocid="categories.section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-dark mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                to="/category/$categoryName"
                params={{ categoryName: cat.name }}
                data-ocid={`categories.item.${i + 1}`}
                className="bg-white border border-brand-border rounded-xl p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <div className="font-bold text-brand-dark text-sm">
                  {cat.name}
                </div>
                <div className="text-xs text-brand-body mt-1">{cat.desc}</div>
                <div className="text-brand-orange text-xs font-bold mt-3 group-hover:underline">
                  Shop →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14" data-ocid="why.section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-dark mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                data-ocid={`why.item.${i + 1}`}
                className="text-center p-6 bg-white border border-brand-border rounded-xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-full mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-brand-dark text-sm mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-brand-body leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-brand-light" data-ocid="reviews.section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-dark mb-8">
            Loved by Indians
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                data-ocid={`reviews.item.${i + 1}`}
                className="bg-white border border-brand-border rounded-xl p-5 shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-3">
                  <Stars count={t.stars} />
                </div>
                <p className="text-sm text-brand-body leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-brand-dark">
                      {t.name}
                    </div>
                    <div className="text-xs text-brand-body">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14" data-ocid="faq.section">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-dark mb-8 text-center">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border border-brand-border rounded-xl px-5 data-[state=open]:bg-brand-light"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="font-bold text-brand-dark text-sm py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-body text-sm pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
