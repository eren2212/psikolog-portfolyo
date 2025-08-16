"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Anasayfa", href: "#" },
    { name: "Online Terapisi", href: "#" },
    { name: "Çift Terapisi", href: "#" },
  ];

  const blogLinks = [
    { name: "Blog", href: "#" },
    { name: "Psikoz Nedir?", href: "#" },
    { name: "Neden Yardım Almalıyız?", href: "#" },
  ];

  const contactLinks = [
    { name: "İletişim", href: "#" },
    { name: "Randevu Al", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: <FaFacebook className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: <FaYoutube className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: <FaInstagram className="w-5 h-5" />,
    },
  ];

  return (
    <motion.footer
      className="bg-white border-t border-gray-100 py-16 mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and CTA Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seni Neler Bekliyor?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Randevu Al
                </motion.button>
                <motion.button
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ara
                </motion.button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">
                PSK FATİH İRİDERE
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Anasayfa Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-gray-900 mb-6">Anasayfa</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Blog Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-gray-900 mb-6">Blog</h4>
            <ul className="space-y-3">
              {blogLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* İletişim Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-gray-900 mb-6">İletişim</h4>
            <ul className="space-y-3">
              {contactLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              © 2024 PSK FATİH İRİDERE. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a
                href="#"
                className="text-gray-500 hover:text-purple-600 text-sm transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Gizlilik Politikası
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-500 hover:text-purple-600 text-sm transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Kullanım Şartları
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
