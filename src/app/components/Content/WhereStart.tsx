"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "../Container";

const WhereStart = () => {
  const psychologyOptions = [
    {
      id: 1,
      title: "Daha az stres",
      emoji: "😌",
      description: "Günlük yaşamda stresi azaltma teknikleri",
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 2,
      title: "Rahat bir uyku",
      emoji: "😴",
      description: "Kaliteli uyku için zihinsel rahatlama",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Kaygı yönetimi",
      emoji: "🧠",
      description: "Anksiyete ve endişe ile başa çıkma",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 4,
      title: "Depresyon ile mücadele",
      emoji: "💙",
      description: "Depresif durumlardan çıkış yolları",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      id: 5,
      title: "Daha sağlıklı bir beslenme",
      emoji: "🥗",
      description: "Zihinsel sağlığı destekleyen beslenme",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 6,
      title: "Öz güven artırma",
      emoji: "💪",
      description: "Kendine güven ve özdeğer geliştirme",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 rounded-4xl mt-10"
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Değişim yolculuğuna hangisi ile{" "}
            <motion.span
              className="text-purple-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              başlayalım?
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {psychologyOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-2xl`}
                  >
                    {option.emoji}
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {option.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-500 mt-1"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {option.description}
                    </motion.p>
                  </div>
                </div>
                <motion.div className="text-gray-400 group-hover:text-purple-500 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
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
            Size en uygun destek türünü seçin ve uzmanlarımızla iletişime geçin
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
            Hemen Başlayın
          </motion.button>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default WhereStart;
