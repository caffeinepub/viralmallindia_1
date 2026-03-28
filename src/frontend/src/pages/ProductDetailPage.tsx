import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  useAddReview,
  usePlaceOrder,
  useProduct,
  useProductReviews,
} from "../hooks/useQueries";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? "fill-brand-orange text-brand-orange"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return <span className="text-brand-orange">{"★".repeat(count)}</span>;
}

function discountPct(orig: bigint, price: bigint) {
  return Math.round((1 - Number(price) / Number(orig)) * 100);
}

function formatDate(ts: bigint) {
  try {
    const ms = Number(ts);
    const d = ms > 1e15 ? new Date(Math.floor(ms / 1_000_000)) : new Date(ms);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews } = useProductReviews(id);
  const addReview = useAddReview();
  const placeOrder = usePlaceOrder();

  const [codOpen, setCodOpen] = useState(false);
  const [codForm, setCodForm] = useState({ name: "", phone: "", address: "" });
  const [reviewForm, setReviewForm] = useState({
    reviewer: "",
    rating: 5,
    comment: "",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div
          className="max-w-6xl mx-auto px-4 py-20 text-center"
          data-ocid="product.loading_state"
        >
          <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div
          className="max-w-6xl mx-auto px-4 py-20 text-center"
          data-ocid="product.error_state"
        >
          <h2 className="text-2xl font-bold text-brand-dark">
            Product not found
          </h2>
          <Link
            to="/"
            className="text-brand-orange mt-4 inline-block"
            data-ocid="product.link"
          >
            ← Back to home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pct = discountPct(product.originalPrice, product.price);

  async function handleCOD(e: React.FormEvent) {
    e.preventDefault();
    try {
      await placeOrder.mutateAsync({
        orderId: `ORD-${Date.now()}`,
        productId: id,
        customerName: codForm.name,
        phone: codForm.phone,
        address: codForm.address,
        quantity: 1n,
        orderDate: BigInt(Date.now()),
      });
      toast.success("Order placed successfully! We'll call you to confirm.");
      setCodOpen(false);
      setCodForm({ name: "", phone: "", address: "" });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addReview.mutateAsync({
        productId: id,
        reviewer: reviewForm.reviewer,
        rating: BigInt(reviewForm.rating),
        comment: reviewForm.comment,
      });
      toast.success("Review submitted! Thank you.");
      setReviewForm({ reviewer: "", rating: 5, comment: "" });
    } catch {
      toast.error("Failed to submit review.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-brand-body mb-6">
          <Link
            to="/"
            className="hover:text-brand-orange"
            data-ocid="product.link"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/category/$categoryName"
            params={{ categoryName: product.category }}
            className="hover:text-brand-orange"
            data-ocid="product.link"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-body hover:text-brand-dark mb-6 transition-colors"
          data-ocid="product.link"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden bg-brand-light aspect-square"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {pct > 0 && (
              <span className="absolute top-4 right-4 bg-brand-orange text-white text-sm font-black px-3 py-1.5 rounded-full">
                -{pct}% OFF
              </span>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-brand-dark leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={product.rating} />
              <span className="text-sm text-brand-body">
                ({Number(product.reviewCount)} reviews)
              </span>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                ✓ In Stock
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-black text-brand-orange">
                ₹{Number(product.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ₹{Number(product.originalPrice)}
              </span>
              {pct > 0 && (
                <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                  Save {pct}%
                </span>
              )}
            </div>

            {/* Benefits */}
            <ul className="space-y-2">
              {product.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-brand-body"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-lg transition-colors"
                data-ocid="product.primary_button"
              >
                Buy Now
              </button>

              <Dialog open={codOpen} onOpenChange={setCodOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 bg-brand-dark hover:bg-gray-800 text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-lg transition-colors"
                    data-ocid="product.secondary_button"
                  >
                    Cash on Delivery
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" data-ocid="cod.dialog">
                  <DialogHeader>
                    <DialogTitle className="font-black text-brand-dark">
                      Order via Cash on Delivery
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleCOD}
                    className="flex flex-col gap-4 mt-2"
                  >
                    <div>
                      <Label
                        htmlFor="cod-name"
                        className="text-brand-dark font-bold text-sm mb-1 block"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="cod-name"
                        placeholder="Enter your full name"
                        value={codForm.name}
                        onChange={(e) =>
                          setCodForm((f) => ({ ...f, name: e.target.value }))
                        }
                        required
                        data-ocid="cod.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cod-phone"
                        className="text-brand-dark font-bold text-sm mb-1 block"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="cod-phone"
                        placeholder="10-digit mobile number"
                        type="tel"
                        value={codForm.phone}
                        onChange={(e) =>
                          setCodForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        required
                        data-ocid="cod.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cod-address"
                        className="text-brand-dark font-bold text-sm mb-1 block"
                      >
                        Delivery Address
                      </Label>
                      <Textarea
                        id="cod-address"
                        placeholder="Full address with pincode"
                        value={codForm.address}
                        onChange={(e) =>
                          setCodForm((f) => ({ ...f, address: e.target.value }))
                        }
                        required
                        rows={3}
                        data-ocid="cod.textarea"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCodOpen(false)}
                        className="flex-1 border-2 border-brand-border text-brand-body font-bold uppercase text-xs py-3 rounded-lg hover:bg-brand-light transition-colors"
                        data-ocid="cod.cancel_button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={placeOrder.isPending}
                        className="flex-1 bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white font-bold uppercase text-xs py-3 rounded-lg transition-colors"
                        data-ocid="cod.confirm_button"
                      >
                        {placeOrder.isPending ? "Placing..." : "Place Order"}
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-brand-border">
              <h3 className="font-bold text-brand-dark text-sm uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-brand-body text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section
          className="border-t border-brand-border pt-10"
          data-ocid="reviews.section"
        >
          <h2 className="text-2xl font-black uppercase text-brand-dark mb-6">
            Customer Reviews
          </h2>

          {(reviews ?? []).length === 0 ? (
            <p className="text-brand-body mb-8" data-ocid="reviews.empty_state">
              No reviews yet. Be the first!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {(reviews ?? []).map((r, i) => (
                <div
                  key={`${r.reviewer}-${i}`}
                  className="bg-white border border-brand-border rounded-xl p-5 shadow-card"
                  data-ocid={`reviews.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-sm">
                        {r.reviewer[0] || "?"}
                      </div>
                      <span className="font-bold text-sm text-brand-dark">
                        {r.reviewer}
                      </span>
                    </div>
                    <span className="text-xs text-brand-body">
                      {formatDate(r.date)}
                    </span>
                  </div>
                  <div className="mb-2">
                    <Stars count={Number(r.rating)} />
                  </div>
                  <p className="text-sm text-brand-body leading-relaxed">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Add Review Form */}
          <div
            className="bg-brand-light rounded-xl p-6"
            data-ocid="review.panel"
          >
            <h3 className="font-black text-brand-dark text-lg mb-4">
              Write a Review
            </h3>
            <form onSubmit={handleReview} className="flex flex-col gap-4">
              <div>
                <Label className="font-bold text-sm text-brand-dark mb-1 block">
                  Your Name
                </Label>
                <Input
                  placeholder="Enter your name"
                  value={reviewForm.reviewer}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, reviewer: e.target.value }))
                  }
                  required
                  data-ocid="review.input"
                />
              </div>
              <div>
                <Label className="font-bold text-sm text-brand-dark mb-2 block">
                  Rating
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setReviewForm((f) => ({ ...f, rating: s }))
                      }
                      className={`text-2xl transition-transform hover:scale-110 ${s <= reviewForm.rating ? "text-brand-orange" : "text-gray-300"}`}
                      data-ocid="review.toggle"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-bold text-sm text-brand-dark mb-1 block">
                  Your Review
                </Label>
                <Textarea
                  placeholder="Share your experience with this product..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  required
                  rows={4}
                  data-ocid="review.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={addReview.isPending}
                className="self-start bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-lg transition-colors"
                data-ocid="review.submit_button"
              >
                {addReview.isPending ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
