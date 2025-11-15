import { createContext, useContext, useState, useEffect } from "react";
import { getAllProductsHandler, getSingleProductHandler } from "../api/product";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bouquets, setBouquets] = useState([]);
  const [stem, setStem] = useState([]);
  const [gifts, setGifts] = useState([]);

  // ✅ Fetch all products
  const fetchAllProducts = async (query = "") => {
    setLoading(true);
    const res = await getAllProductsHandler(query);

    if (res?.ok) {
      const all = res.data;

      // ✅ Update full list
      setProducts(all);

      // ✅ Categorize using latest data
      setBouquets(all.filter((item) => item.category === "bouquet"));
      setStem(all.filter((item) => item.category === "stem"));
      setGifts(all.filter((item) => item.category === "gift"));
    }

    setLoading(false);
  };

  // ✅ Fetch single product
  const fetchSingleProduct = async (productId) => {
    setLoading(true);
    const res = await getSingleProductHandler(productId);
    setLoading(false);
    return res;
  };

  // ✅ Initial load
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchAllProducts,
        fetchSingleProduct,
        setProducts,
        bouquets,
        stem,
        gifts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
