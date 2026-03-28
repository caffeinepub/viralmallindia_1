import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "Portable Fans",
  "Neck Fans",
  "Mini Gadgets",
  "Kitchen Tools",
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-brand-border"
      data-ocid="header.panel"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="font-bold text-xl text-brand-dark tracking-tight shrink-0"
          data-ocid="header.link"
        >
          ViralMall<span className="text-brand-orange">India</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/category/$categoryName"
              params={{ categoryName: cat }}
              className="text-sm font-medium text-brand-body hover:text-brand-dark transition-colors"
              data-ocid="header.link"
            >
              {cat}
            </Link>
          ))}
          <Link
            to="/category/$categoryName"
            params={{ categoryName: "Mini Gadgets" }}
            className="text-sm font-bold text-brand-orange"
            data-ocid="header.link"
          >
            Sale
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 hover:bg-brand-light rounded-md transition-colors"
            onClick={() => navigate({ to: "/" })}
            data-ocid="header.button"
          >
            <Search className="w-5 h-5 text-brand-dark" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-brand-light rounded-md transition-colors"
            data-ocid="header.button"
          >
            <ShoppingBag className="w-5 h-5 text-brand-dark" />
            <span className="sr-only">Cart</span>
          </button>
          <button
            type="button"
            className="md:hidden p-2 hover:bg-brand-light rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="header.button"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brand-border px-4 py-3 flex flex-col gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/category/$categoryName"
              params={{ categoryName: cat }}
              className="text-sm font-medium text-brand-body py-2 border-b border-brand-border"
              onClick={() => setMenuOpen(false)}
              data-ocid="header.link"
            >
              {cat}
            </Link>
          ))}
          <Link
            to="/category/$categoryName"
            params={{ categoryName: "Mini Gadgets" }}
            className="text-sm font-bold text-brand-orange py-2"
            onClick={() => setMenuOpen(false)}
            data-ocid="header.link"
          >
            🔥 Sale
          </Link>
        </div>
      )}
    </header>
  );
}
