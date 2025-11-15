import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
const Header = () => {
  const { cartItems, addToCart } = useCart();
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    console.log("Cart Items:", cartItems);
    setCount(cartItems.length);
  }, [cartItems]);



  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `text-lg transition ${isActive
      ? "text-[#4F8C71] font-semibold"
      : "text-gray-700 hover:text-[#4F8C71]"
    }`;
  const redirect = isAuthenticated ? "/account" : "/login";
  return (
    <header className="w-full bg-white sticky top-0 z-50 ">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 items-center">

        {/* MOBILE MENU BUTTON */}
        <div className="flex md:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={30} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex md:justify-start justify-center items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="ShiCraft Logo"
              className="h-7 w-7 object-contain  hidden md:block"
            />
            <span className="text-2xl font-bold tracking-tight text-[#4F8C71]">
              ShiCraft
            </span>
          </Link>
        </div>


        {/* MOBILE ICONS */}
        <div className="flex md:hidden justify-end gap-5">
          <Link to={redirect}>
            <User size={26} />
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart size={26} />
            {count > 0 && <span className="absolute -top-1 -right-2 bg-[#4F8C71] text-white text-[10px] px-1.5 rounded-full">
              {count}
            </span>}
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12 text-lg font-medium ml-10">

          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          {/* ✅ SHOP stays a simple link (NO dropdown) */}
          <NavLink to="/shop" className={navLinkClasses}>
            Shop
          </NavLink>

          {/* ✅ NEW CATEGORY DROPDOWN */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-[#4F8C71] transition flex items-center gap-1">
              Category <span className="text-sm mt-1">▾</span>
            </button>

            <div className="absolute left-0 mt-2 bg-white border-gray-300 rounded-xl shadow-lg w-48 p-3
                 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <NavLink
                to="/bouquets"
                className="block px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Bouquets
              </NavLink>
              <NavLink
                to="/stems"
                className="block px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Single Stems
              </NavLink>
              <NavLink
                to="/gifts"
                className="block px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Gift Sets
              </NavLink>
            </div>
          </div>

          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
        </nav>

        {/* DESKTOP ACCOUNT + CART */}
        <div className="hidden md:flex items-center gap-8 ml-auto">

          <Link
            to={redirect}
            className="flex items-center gap-3 border rounded-full px-5 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <User size={22} /> Account
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-3 border rounded-full px-5 py-2 text-gray-700 hover:bg-gray-100 transition relative"
          >
            <ShoppingCart size={22} />
            Cart
            {count > 0 &&
              <span className="absolute -top-1 -right-3 bg-[#4F8C71] text-white px-2 py-0.5 text-xs rounded-full">
                {count}
              </span>
            }
          </Link>

        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] bg-white shadow-xl p-7 z-[999] 
          transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button className="mb-6" onClick={() => setOpen(false)}>
          <X size={30} />
        </button>

        {/* MOBILE MENU LINKS */}
        <div className="flex flex-col gap-6 text-xl">

          <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClasses}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={() => setOpen(false)} className={navLinkClasses}>
            Shop
          </NavLink>

          {/* ✅ MOBILE CATEGORY DROPDOWN */}
          <details className="text-gray-700">
            <summary className="cursor-pointer text-xl py-1">Category</summary>

            <div className="ml-4 mt-3 flex flex-col gap-4 text-lg">
              <NavLink to="/bouquets" onClick={() => setOpen(false)}>Bouquets</NavLink>
              <NavLink to="/stems" onClick={() => setOpen(false)}>Single Stems</NavLink>
              <NavLink to="/gifts" onClick={() => setOpen(false)}>Gift Sets</NavLink>
            </div>
          </details>

          <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClasses}>
            About
          </NavLink>
        </div>

        {/* MOBILE ACCOUNT + CART */}
        <div className="h-[1px] bg-gray-300 my-7"></div>

        <div className="flex flex-col gap-5 text-xl">

          <Link
            to={redirect}
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 border rounded-full px-6 py-3 hover:bg-gray-100 transition"
          >
            <User size={22} /> Account
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 border rounded-full px-6 py-3 hover:bg-gray-100 transition relative"
          >
            <ShoppingCart size={22} />
            Cart
            <span className="absolute right-4 bg-[#4F8C71] text-white px-2 py-0.5 text-xs rounded-full">
              2
            </span>
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;
