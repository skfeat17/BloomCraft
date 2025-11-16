import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import useRandomIndex from "../utils/useRandomIndex.js";
import { useNavigate } from "react-router-dom";
const categories = [
  {
    title: "Bouquets",
    image:
      "https://i.ytimg.com/vi/Xgwb2yWvQn8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAaK60JhCoGZPRLniTp1HKVI8xRVw",
    link: "/bouquets"
  },
  {
    title: "Single Stems",
    image:
      "https://i.ytimg.com/vi/sPikUh3ueWw/maxresdefault.jpg",
    link: "/stems"
  },
  {
    title: "Gift Sets",
    image:
      "https://i.ytimg.com/vi/hSr0TZJjBIM/maxresdefault.jpg",
    link: "/gifts"
  },
];

const heroImage = [
  "https://preview.redd.it/i-make-pipe-cleaners-flowers-whenever-i-feel-anxious-turns-v0-rugbnmv57dyd1.png?auto=webp&s=0d8431f42c2b982103257b3dd353f073fe61d391",
  "https://i.etsystatic.com/41761855/r/il/a1f211/6933647206/il_1080xN.6933647206_moph.jpg",
  "https://diyjoy.com/wp-content/uploads/2025/04/How-to-Make-a-Flower-Bouquet-Using-Pipe-Cleaners.png",
  "https://fuzzypipe.com/cdn/shop/articles/26361729660736_.pic.png?v=1729729453",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3nPr-jPnNIHXAA0vCgxy1rq8Xtf05W2pgQ&s",
  "https://shoprebel.studio/wp-content/uploads/2025/01/download-25.jpeg",
  "https://m.media-amazon.com/images/I/61ujFnjD9iL._AC_UF350,350_QL80_.jpg",
  "https://i.ytimg.com/vi/cnmdGbx0SIc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gEyg2MA8=&rs=AOn4CLBRR3OsILADFmBmy-KpZd6Oas8HfA",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-p8cIgcZ1eraXI_v-d7lSDKfOXb2q5BPRw&s",
];

const testimonials = [
  {
    name: "Aarushi",
    text: "The flowers look so real and delicate. Perfect for home décor!",
  },
  {
    name: "Michelle",
    text: "Loved the packaging and quality. Will order again!",
  },
  {
    name: "Salman",
    text: "The bouquet was beautiful. My girlfriend loved it!",
  },
];

// ✅ Simple Skeleton Loader
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow p-5 animate-pulse">
    <div className="w-full h-52 bg-gray-200 rounded-lg"></div>
    <div className="mt-4 h-5 bg-gray-200 w-3/4 rounded"></div>
    <div className="mt-2 h-4 bg-gray-200 w-1/2 rounded"></div>
    <div className="mt-6 flex justify-between">
      <div className="h-5 w-16 bg-gray-200 rounded"></div>
      <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { products, loading, fetchAllProducts } = useProducts();
  const [randomProducts, setRandomProducts] = useState([]);

  // ✅ Random hero image index that changes every 3 seconds
  const randomHeroIndex = useRandomIndex(heroImage.length, 3000);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const getRandomProducts = () => {
    if (!products || products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    if (products.length > 0) {
      setRandomProducts(getRandomProducts());
    }
  }, [products]);

  return (
    <div className="w-full">
      {/* ✅ HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-xl shadow">
          <img
            src={heroImage[randomHeroIndex]}
            alt="Flowers"
            className="w-full h-[350px] md:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Handmade Flowers Crafted with{" "}
            <span className="text-[#4F8C71]">Love</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Delicate, natural, and long-lasting handmade blooms perfect for décor, gifting, and special occasions.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#4F8C71] text-white rounded-full text-lg hover:bg-[#41785f] transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ CATEGORY SECTION */}
      <section className="bg-[#FAF8F6] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <div
                onClick={() => navigate(cat.link)}
                key={index}
                className="rounded-xl overflow-hidden shadow group bg-white hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-[#4F8C71]">
                    {cat.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FEATURED PRODUCTS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {loading
              ? Array(3)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} />)
              : randomProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop">
              <p className="text-[#4F8C71] inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:opacity-80 transition">
                Explore more of our products
                <ArrowRight size={20} />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            What Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <p className="text-gray-600 text-lg italic">"{t.text}"</p>
                <h4 className="mt-4 text-xl font-semibold text-[#4F8C71]">
                  - {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ NEWSLETTER */}
      {/* <section className="bg-[#FAF8F6] py-16 mb-30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mt-3">
            Get updates on new arrivals, special discounts, and more!
          </p>

          <div className="mt-8 flex gap-3 flex-col sm:flex-row justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 border rounded-full w-full sm:w-80"
            />
            <button className="px-6 py-3 bg-[#4F8C71] text-white rounded-full hover:bg-[#41785f] transition">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;
