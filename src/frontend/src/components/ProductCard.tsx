import { Link } from "@tanstack/react-router";
import type { Product } from "../backend.d";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating) ? "text-brand-orange" : "text-gray-300"
          }
          style={{ fontSize: "14px" }}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-brand-body ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function discountPct(orig: bigint, price: bigint) {
  return Math.round((1 - Number(price) / Number(orig)) * 100);
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const pct = discountPct(product.originalPrice, product.price);

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      data-ocid={`product.item.${index}`}
      className="group bg-white border border-brand-border rounded-xl overflow-hidden flex flex-col shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative overflow-hidden bg-brand-light aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {pct > 0 && (
          <span className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full">
            -{pct}%
          </span>
        )}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-brand-dark text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-brand-orange font-bold text-lg">
            ₹{Number(product.price)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ₹{Number(product.originalPrice)}
          </span>
        </div>
        <button
          type="button"
          className="mt-2 w-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg transition-colors"
          onClick={(e) => e.preventDefault()}
          data-ocid={`product.primary_button.${index}`}
        >
          View Product
        </button>
      </div>
    </Link>
  );
}
