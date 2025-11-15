import { useState } from "react";
import ProductCard from "../../components/ProductCard.jsx";
import { useProducts } from "../../context/ProductContext.jsx";

export default function StemPage() {

  // ✅ Using stem-specific data from ProductContext
  const { stem, loading, fetchAllProducts } = useProducts();

  const [sort, setSort] = useState("");

  const handleSort = async (value) => {
    setSort(value);

    // ✅ Load sorted AND filtered stem products from API
    if (value === "low-high") {
      await fetchAllProducts("?category=stem&sort=price_asc");
    } 
    else if (value === "high-low") {
      await fetchAllProducts("?category=stem&sort=price_desc");
    } 
    else if (value === "new-old") {
      await fetchAllProducts("?category=stem&sort=newest");
    }
    else if (value === "old-new") {
      await fetchAllProducts("?category=stem&sort=oldest");
    } 
    else {
      return;
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 overflow-x-hidden">

      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Stem Flowers</h1>

        {/* <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="border px-4 py-2 rounded-full text-gray-700 focus:outline-none cursor-pointer text-sm"
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="new-old">Newest to Oldest</option>
          <option value="old-new">Oldest to Newest</option>
        </select> */}
      </div>

      {/* ✅ Skeleton Loader */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="border-sm rounded-xl overflow-hidden shadow-sm bg-white animate-pulse flex flex-col"
            >
              <div className="w-full h-56 bg-gray-300"></div>

              <div className="p-4 flex flex-col flex-1">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded-full w-full mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ✅ Show stem products */
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {stem.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </section>
  );
}
