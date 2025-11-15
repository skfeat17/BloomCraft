import React, { use } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../context/ProductContext.jsx";
import { useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

const products = [
  {
    id: 1,
    title: "Rose Blush Bouquet",
    desc: "Soft pink handmade roses",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
  },
  {
    id: 2,
    title: "Ivory Lily Stem",
    desc: "Single stem elegance",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80",
  },
  {
    id: 3,
    title: "Pastel Peony Set",
    desc: "Set of 3 handcrafted peonies",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80",
  },
];

const categories = [
  {
    title: "Bouquets",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
  },
  {
    title: "Single Stems",
    image:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=900&q=80",
  },
  {
    title: "Gift Sets",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
  },
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

const LandingPage = () => {



  return (
    <div className="w-full">

      {/* ✅ HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="overflow-hidden rounded-xl shadow">
          <img
            src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=1200&q=80"
            alt="Flowers"
            className="w-full h-[350px] md:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
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
                key={index}
                className="rounded-xl overflow-hidden shadow group bg-white hover:shadow-lg transition"
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
            Our Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg w-full h-52 object-cover"
                />

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600">{item.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-semibold">₹{item.price}</span>
                  <button className="px-4 py-2 bg-[#f7dbe7] hover:bg-[#f3cadd] text-gray-800 rounded-full text-sm transition flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
<div className="mt-12 text-center">
  <Link to="/shop">
    <p
      className=" text-[#4F8C71] inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
    >
      Explore more of our products
      <ArrowRight size={20} />
    </p>
  </Link>
</div>

        </div>
      </section>

      {/* ✅ WHY CHOOSE US */}
      <section className="bg-[#F2F7F5] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            Why Shop With Blossom Craft?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold text-[#4F8C71] mb-3">
                Handmade Quality
              </h3>
              <p className="text-gray-600">
                Every flower is carefully crafted with attention to detail.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#4F8C71] mb-3">
                Long Lasting
              </h3>
              <p className="text-gray-600">
                Unlike real flowers, our blooms stay beautiful forever.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#4F8C71] mb-3">
                Perfect Gifts
              </h3>
              <p className="text-gray-600">
                Elegant, thoughtful and unique handmade gifts for loved ones.
              </p>
            </div>
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
      <section className="bg-[#FAF8F6] py-16 mb-30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mt-3">
            Get updates on new arrivals, special discounts and more!
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
      </section>

    </div>
  );
};

export default LandingPage;
