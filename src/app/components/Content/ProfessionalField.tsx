"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../Container";

const ProfessionalField = () => {
  const services = [
    {
      id: 1,
      title: "Bireysel Psikolojik Danışmanlık",
      description:
        "Bireysel terapi, farkındalık ve yaşam kalitesi kazandıran süreçtir.",
      image: "/psikolog_images/bireysel.jpg",
      link: "/bireysel-terapi",
    },
    {
      id: 2,
      title: "Online Terapi",
      description:
        "Online terapi, her yerden erişimle psikolojik destek sunar.",
      image: "/psikolog_images/online.jpg",
      link: "/online-terapi",
    },
    {
      id: 3,
      title: "Aile ve Çift Terapisi",
      description: "Çift terapisi, ilişkide anlayış ve iletişimi güçlendirir.",
      image: "/psikolog_images/cift.jpg",
      link: "/aile-cift-terapisi",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gray-50 mt-10 rounded-4xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            🎯 Profesyonel Hizmetler
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Uzmanlık Alanlarımız
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Modern psikoloji yaklaşımlarıyla size en uygun tedavi yöntemlerini
            sunuyoruz
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-90 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-6 line-clamp-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <span>Detayları İncele</span>
                  <motion.svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
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
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
};

export default ProfessionalField;
