"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import Image from "next/image";
import Container from "./Container";

const Hero = () => {
  return (
    <motion.section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-4xl mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Sol taraf - Metin içeriği */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                ✨ Uzman Psikolog Desteği
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Değişim yolculuğuna{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  adım atın
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Bilimsel temelli yaklaşımlar ve uzman kadromuzla, zihinsel ve
                fiziksel dönüşüm yolculuğunuzda daima yanınızdayız. Modern
                psikoloji ile hayatınızı dönüştürün.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="text-lg px-8 py-4">
                  <a href="/randevu-al" className="flex items-center gap-2">
                    HEMEN BAŞLA
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </a>
                </Button>
              </motion.div>

              <motion.button
                className="flex items-center gap-3 px-8 py-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-200"
                  whileHover={{ rotate: 10 }}
                >
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <span className="font-medium">Tanıtım videosunu izle</span>
              </motion.button>
            </motion.div>

            {/* İstatistikler */}
            <motion.div
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { number: "500+", label: "Mutlu Müşteri" },
                { number: "10+", label: "Yıl Deneyim" },
                { number: "98%", label: "Memnuniyet" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Sağ taraf - Görsel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/psikolog_images/erkek_uzman.jpg"
                alt="Profesyonel Psikolog Desteği"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl object-cover w-full h-[600px]"
                priority
              />
            </motion.div>

            {/* Dekoratif elementler */}
            <motion.div
              className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating card */}
            <motion.div
              className="absolute top-8 -left-8 bg-white rounded-xl shadow-xl p-4 z-20"
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                x: 0,
              }}
              transition={{
                opacity: { delay: 0.8 },
                x: { delay: 0.8 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Online Terapi
                  </div>
                  <div className="text-sm text-gray-600">7/24 Destek</div>
                </div>
              </div>
            </motion.div>

            {/* Rating card */}
            <motion.div
              className="absolute bottom-8 -right-8 bg-white rounded-xl shadow-xl p-4 z-20"
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
                x: 0,
              }}
              transition={{
                opacity: { delay: 1 },
                x: { delay: 1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="flex text-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.3 + i * 0.1,
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
                <span className="font-semibold text-gray-900">4.9</span>
              </div>
              <div className="text-sm text-gray-600">200+ Değerlendirme</div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { delay: 1.5 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
