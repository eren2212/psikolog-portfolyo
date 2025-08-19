"use client";
import React, { useState } from "react";

import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="  sticky top-0 z-50  py-5  backdrop-blur-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0">
                <Image
                  src="/psikolog_images/logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className="py-2"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out font-inter"
              >
                Anasayfa
              </Link>
              <Link
                href="/hakkimda"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
              >
                Hakkımda
              </Link>
              <Link
                href="/iletisim"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
              >
                İletişim
              </Link>
              <Link
                href="/randevu-al"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500 px-6 py-3 rounded-xl text-sm cursor-pointer"
              >
                Randevu Al
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-950 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span className="sr-only">Ana menüyü aç</span>
              {/* Hamburger icon */}
              {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  mt-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              >
                Anasayfa
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              >
                Hakkımda
              </Link>
              <Link
                href="/iletisim"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              >
                İletişim
              </Link>
              <Link
                href="/randevu-al"
                className="w-full inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500 px-6 py-3 rounded-xl text-sm cursor-pointer"
              >
                Randevu Al
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
