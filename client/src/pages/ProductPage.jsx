import { useParams, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext.jsx";

export default function ProductPage() {
  const { fetchSingleProduct, products, loading: globalLoading } = useProducts();

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [found, setFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [recommended, setRecommended] = useState([]);

  // ✅ Fetch main product
  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await fetchSingleProduct(id);
      if (res?.ok) {
        setProduct(res.data);
        setSelectedImg(res.data.images[0]);
        setFound(true);
      } else {
        setFound(false);
      }

      setLoading(false);
    })();
  }, [id]);

  // ✅ Fetch Recommended (3 random items)
  useEffect(() => {
    if (!products || products.length === 0) return;
    if (!product) return;

    // filter out current product
    const others = products.filter((p) => p._id !== product._id);

    // random shuffle
    const shuffled = others.sort(() => 0.5 - Math.random());

    // pick top 3
    setRecommended(shuffled.slice(0, 3));
  }, [product, products]);

  // ✅ Skeleton Loader
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <div className="bg-gray-300 h-[420px] w-full rounded-xl"></div>
            <div className="flex gap-4 mt-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-8 bg-gray-300 w-2/3 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 w-1/3 rounded mb-4"></div>
            <div className="h-5 bg-gray-300 w-full rounded mb-2"></div>
            <div className="h-5 bg-gray-300 w-5/6 rounded mb-6"></div>
            <div className="h-12 bg-gray-300 rounded-full w-full"></div>
          </div>

        </div>
      </section>
    );
  }

  // ✅ Product Not Found
  if (!found || !product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#4F8C71] font-medium hover:underline">
          Go Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">

      {/* MAIN PRODUCT */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* Left: Images */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <img
              src={selectedImg}
              alt={product.title}
              className="w-full h-64 sm:h-72 md:h-[420px] rounded-lg object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition
                  ${img === selectedImg ? "border-[#4F8C71] scale-105" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>

          <p className="text-xl mt-4 font-semibold text-gray-700">
            RM {product.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <button className="mt-8 flex items-center justify-center gap-2 bg-[#f7dbe7] hover:bg-[#f3cadd] text-gray-800 py-3 rounded-full transition font-medium">
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>

          <Link
            to="/shop"
            className="mt-4 text-[#4F8C71] font-medium hover:underline"
          >
            Back to Shop
          </Link>
        </div>

      </div>

      {/* ✅ RECOMMENDED SECTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">You may also like</h2>

        {globalLoading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-gray-200 h-72 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition block"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="mt-4 font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                  {item.description}
                </p>

                <p className="mt-2 font-semibold text-gray-700">RM {item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
