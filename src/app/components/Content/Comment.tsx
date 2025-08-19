"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "../Container";
import Link from "next/link";

const Comment = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Hayatımda aldığım en iyi karar. Terapi seansları gerçekten işe yarıyor.",
      name: "A.Y",
      description: "Kaygı bozukluğu tedavisi",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Uzmanlarınız çok anlayışlı ve sabırlı. Online terapi harika bir deneyim.",
      name: "M.D",
      description: "Stres yönetimi",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Depresyonumla başa çıkmada bana çok yardımcı oldular. Minnettarım.",
      name: "Z.K",
      description: "Depresyon tedavisi",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gray-50 rounded-4xl mt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Yorumlar
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Müşterilerimizin deneyimlerini dinleyin
          </motion.p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 my-10"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: "200%" }}
          >
            {/* İlk set yorumlar */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${testimonial.id}`}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex-shrink-0 w-80"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.8 + index * 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 500,
                      }}
                      viewport={{ once: true }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-full mr-4 border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-600 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-200"
                      whileHover={{ opacity: 0.2 }}
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-6 text-purple-200 text-4xl opacity-50">
                  &rdquo;
                </div>
              </motion.div>
            ))}

            {/* İkinci set yorumlar (döngü için) */}
            {testimonials.map((testimonial) => (
              <motion.div
                key={`second-${testimonial.id}`}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex-shrink-0 w-80"
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-full mr-4 border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-600 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-200"
                      whileHover={{ opacity: 0.2 }}
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-6 text-purple-200 text-4xl opacity-50">
                  &rdquo;
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-600 mb-6"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Siz de pozitif değişimi deneyimleyin
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            viewport={{ once: true }}
          >
            <Link href="/iletisim">Bizimle İletişime Geçin</Link>
          </motion.button>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Comment;
