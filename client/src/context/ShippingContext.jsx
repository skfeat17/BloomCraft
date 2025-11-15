import { createContext,useContext, useEffect, useState } from "react";
import {
  getShippingDetailsHandler,
  addShippingDetailsHandler,
  updateShippingDetailsHandler,
} from "../api/shipping";

const ShippingContext = createContext();
import {useAuth} from "./AuthContext";
import { set } from "react-hook-form";

export const ShippingProvider = ({ children }) => {
  const {isAuthenticated} = useAuth();
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShipping = async () => {
    try {
      setLoading(true);
      const res = await getShippingDetailsHandler(); 
      if (res?.ok) {
        console.log("Fetched shipping details:", res.data);
        setShipping(res.data);
      } else {
        setShipping(null);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      setShipping(null);
      fetchShipping();
  }, [isAuthenticated]);

  useEffect( () => {
    if (!shipping) {
      fetchShipping();
      console.log("Fetching shipping details from API...");
      console.log("Current shipping state:", shipping);
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Add Shipping
  const addShipping = async (shippingData) => {
    const res = await addShippingDetailsHandler(shippingData);

    if (res?.data) {
      setShipping(res.data);
    }

    return res;
  };

  // ✅ Update Shipping
  const updateShipping = async (shippingData) => {
    const res = await updateShippingDetailsHandler(shippingData);

    if (res?.data) {
      setShipping(res.data);
    }

    return res;
  };

  return (
    <ShippingContext.Provider
      value={{
        shipping,
        loading,
        fetchShipping,
        addShipping,
        updateShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => useContext(ShippingContext);
