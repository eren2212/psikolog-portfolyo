import React from "react";
import Button from "./Button";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="  sticky top-0 z-50  py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/psikolog_images/logo.png"
                alt="logo"
                width={150}
                height={150}
                className="py-2"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out font-inter"
              >
                Anasayfa
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
              >
                Hakkımda
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
              >
                İletişim
              </a>
              <Button>Randevu Al</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-950 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100 mt-2">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
            >
              Anasayfa
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
            >
              Hakkımda
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
            >
              İletişim
            </a>
            <Button fullWidth>
              <a href="/randevu-al">Randevu Al</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
