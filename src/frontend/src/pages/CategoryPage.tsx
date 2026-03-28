import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useProductsByCategory } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

export function CategoryPage() {
  const { categoryName } = useParams({ from: "/category/$categoryName" });
  const { data: products, isLoading } = useProductsByCategory(categoryName);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-brand-body mb-6">
          <Link
            to="/"
            className="hover:text-brand-orange transition-colors"
            data-ocid="category.link"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">{categoryName}</span>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-body hover:text-brand-dark mb-6 transition-colors"
          data-ocid="category.link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase text-brand-dark">
            {categoryName}
          </h1>
          <p className="text-brand-body mt-1">
            {isLoading
              ? "Loading..."
              : `${(products ?? []).length} products found`}
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            data-ocid="category.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="bg-brand-light rounded-xl aspect-[3/4] animate-pulse"
              />
            ))}
          </div>
        ) : (products ?? []).length === 0 ? (
          <div className="text-center py-20" data-ocid="category.empty_state">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-brand-dark mb-2">
              No Products Found
            </h2>
            <p className="text-brand-body">
              Check back later for new arrivals.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            data-ocid="category.list"
          >
            {(products ?? []).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
