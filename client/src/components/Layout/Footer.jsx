import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="mt-20">
      <footer className="bg-[#FAF8F6] border-gray-200 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="ShiCraft Logo"
                className="h-10 w-10 object-contain"
              />
              <h2 className="text-3xl font-bold text-[#4F8C71]">ShiCraft</h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Handcrafted flowers brought to life with passion and creativity.
            </p>

            <div className="flex gap-4 mt-5">
              <a href="#" className="text-gray-600 hover:text-[#4F8C71] transition">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4F8C71] transition">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4F8C71] transition">
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/shop" className="hover:text-[#4F8C71]">All Products</Link></li>
              <li><Link to="/bouquets" className="hover:text-[#4F8C71]">Bouquets</Link></li>
              <li><Link to="/stems" className="hover:text-[#4F8C71]">Single Stems</Link></li>
              <li><Link to="/gifts" className="hover:text-[#4F8C71]">Gift Sets</Link></li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-gray-600 text-sm">Email: support@shicraft.com</p>
            <p className="text-gray-600 text-sm mt-2">Locations: Malaysia, India</p>
            <p className="text-gray-600 text-sm mt-2">Worldwide Shipping Available</p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t py-5 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} ShiCraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
