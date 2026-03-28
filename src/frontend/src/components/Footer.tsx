import { Link } from "@tanstack/react-router";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "viralmall",
  );

  return (
    <footer
      className="bg-brand-dark text-white pt-12 pb-6"
      data-ocid="footer.panel"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-bold text-2xl mb-3">
              ViralMall<span className="text-brand-orange">India</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's #1 trending products store. Get the hottest viral gadgets
              delivered to your door.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: "Portable Fans" }}
                  className="hover:text-brand-orange transition-colors"
                  data-ocid="footer.link"
                >
                  Portable Fans
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: "Neck Fans" }}
                  className="hover:text-brand-orange transition-colors"
                  data-ocid="footer.link"
                >
                  Neck Fans
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: "Mini Gadgets" }}
                  className="hover:text-brand-orange transition-colors"
                  data-ocid="footer.link"
                >
                  Mini Gadgets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: "Kitchen Tools" }}
                  className="hover:text-brand-orange transition-colors"
                  data-ocid="footer.link"
                >
                  Kitchen Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Track Order
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Returns Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  FAQs
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              We Offer
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📦 Cash on Delivery</li>
              <li>🚚 Free Shipping</li>
              <li>⚡ Fast Delivery</li>
              <li>🔄 Easy Returns</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {year} ViralMallIndia. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
