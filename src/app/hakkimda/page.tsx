"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import {
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaHospital,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";

const HakkimdaPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const experiences = [
    {
      title: "İNSAN KAYNAKLARI STAJYER",
      company: "Sport Center Academy",
      location: "İstanbul",
      icon: FaBuilding,
      color: "from-blue-500 to-indigo-600",
      responsibilities: [
        "İnsan kaynakları süreçlerine destek sağlayarak, personel alımları, mülakat süreçleri ve işe alım faaliyetlerinde aktif rol aldım",
        "İşe alım, performans değerlendirme ve çalışan memnuniyeti üzerine pratik deneyimler edindim",
        "Microsoft Office bilgilerimle çalışan dosyalarının düzenlenmesi ve arşivleme işlemleri ile ilgili organizasyonel destek sağladım",
        "Pazarlama üzerine eğitimler alarak beraber çalıştığımız bölümleri anlama üzerine gelişim sağladım",
      ],
    },
    {
      title: "PSİKOLOG STAJYER",
      company: "Göztepe Prof. Dr. Süleyman Yalçın Şehir Hastanesi",
      location: "İstanbul",
      icon: FaHospital,
      color: "from-green-500 to-teal-600",
      responsibilities: [
        "Klinik psikoloji alanında hasta görüşmeleri yaparak, bireysel ve grup terapileri hakkında bilgi edindim",
        "Psikolojik rapor hazırlama ve danışan takibi sağlama konusunda deneyim kazandım",
        "Çocuk, ergen ve yetişkin gruplarına yönelik terapi teknikleri üzerine bilgi edindim",
        "Farklı yaş gruplarının psikolojik ihtiyaçlarını analiz etme becerisi kazandım",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Container className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative inline-block mb-8 rounded-full">
              <motion.div
                className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <FaUser className="text-6xl text-white opacity-70" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-full overflow-hidden">
                    <Image
                      src="/psikolog_images/bireysel.jpg"
                      alt="Profile"
                      width={500}
                      height={500}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaHeart className="text-white text-lg" />
              </motion.div>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Hakkımda
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-6"
              variants={itemVariants}
            />
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full inline-block shadow-lg"
            >
              <span className="text-lg font-semibold">
                ✨ +2 Yıl Profesyonel Deneyim
              </span>
            </motion.div>
          </motion.div>

          {/* About Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Kimim?</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong>
                  İstanbul Medeniyet Üniversitesi Psikoloji bölümü mezunu
                </strong>
                , İnsan Kaynakları ve psikoloji alanlarında uzmanlaşmış bir
                psikolog adayıyım. Sport Center Academy&apos;de İnsan Kaynakları
                departmanında staj yaparak iş gücü yönetimi ve organizasyonel
                süreçler üzerine derinlemesine bilgiler edindim.
              </p>
              <p className="text-lg mt-4">
                İletişim becerilerim sayesinde, takım çalışmalarında aktif rol
                alarak verimli işbirlikleri geliştirdim. Ayrıca, Göztepe Prof.
                Dr. Süleyman Yalçın Şehir Hastanesi&apos;nde psikolog
                stajyerliği yaparak klinik psikoloji ve hasta ilişkileri
                konusunda değerli deneyimler kazandım.
              </p>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mr-4">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">İş Deneyimi</h2>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${exp.color}`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${exp.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                        >
                          <exp.icon className="text-white text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {exp.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-1">
                            <FaBuilding className="mr-2 text-sm" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-sm" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            {resp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Birlikte Çalışalım</h3>
            <p className="text-xl mb-8 opacity-90">
              <strong>2 yıl deneyimim</strong> ile psikoloji danışmanlığı ve
              insan kaynakları konularında size profesyonel destek
              sağlayabilirim.
            </p>
            <motion.a
              href="/randevu-al"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FaCalendarAlt className="mr-2" />
              Randevu Al
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HakkimdaPage;
