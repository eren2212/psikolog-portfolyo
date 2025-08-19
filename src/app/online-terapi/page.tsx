"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import {
  FaLaptop,
  FaClock,
  FaHome,
  FaShieldAlt,
  FaVideo,
  FaWifi,
  FaHeadset,
} from "react-icons/fa";
import Link from "next/link";

const OnlineTerapiPage = () => {
  const benefits = [
    {
      icon: <FaHome className="w-8 h-8 text-blue-600" />,
      title: "Evinizin Konforunda",
      description:
        "Kendi güvenli alanınızda, rahat ve samimi bir ortamda terapi seanslarınızı gerçekleştirin.",
    },
    {
      icon: <FaClock className="w-8 h-8 text-blue-600" />,
      title: "Esnek Saat Seçenekleri",
      description:
        "Yoğun programınıza uygun esnek randevu saatleri ile terapinizi aksatmadan devam edin.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: "Gizlilik ve Güvenlik",
      description:
        "End-to-end şifreli bağlantı ile tam gizlilik garantisi altında güvenli terapi seansları.",
    },
    {
      icon: <FaLaptop className="w-8 h-8 text-blue-600" />,
      title: "Kolay Erişim",
      description:
        "Sadece internet bağlantısı ile dünyanın her yerinden profesyonel psikolojik desteğe ulaşın.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Kayıt ve Değerlendirme",
      description:
        "Online platforma kayıt olun, ön değerlendirme formunu doldurun ve ilk görüşme randevunuzu alın.",
    },
    {
      step: "02",
      title: "Teknik Hazırlık",
      description:
        "Cihazınızı test edin, sessiz bir ortam hazırlayın ve bağlantı kalitesini kontrol edin.",
    },
    {
      step: "03",
      title: "Online Seanslar",
      description:
        "Güvenli video konferans üzerinden düzenli terapi seanslarınızı gerçekleştirin.",
    },
    {
      step: "04",
      title: "Sürekli Destek",
      description:
        "Seanslar arası mesaj desteği ve acil durumlarda iletişim imkanı ile sürekli rehberlik.",
    },
  ];

  const technicalRequirements = [
    {
      icon: <FaWifi className="w-6 h-6 text-blue-600" />,
      title: "Stabil İnternet",
      description: "En az 5 Mbps hızında güvenilir internet bağlantısı",
    },
    {
      icon: <FaVideo className="w-6 h-6 text-blue-600" />,
      title: "Kamera ve Mikrofon",
      description: "HD kalitede kamera ve net ses için mikrofon",
    },
    {
      icon: <FaLaptop className="w-6 h-6 text-blue-600" />,
      title: "Uyumlu Cihaz",
      description: "Bilgisayar, tablet veya akıllı telefon",
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-blue-600" />,
      title: "Sessiz Ortam",
      description: "Gizlilik için özel ve sessiz bir alan",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/psikolog_images/online_detay.jpg"
            alt="Online Psikoloji Danışmanlığı"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Online Psikoloji
                <span className="block text-blue-300">Danışmanlığı</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Teknolojinin gücüyle evinizin konforunda profesyonel psikolojik
                destek alın. Güvenli, etkili ve erişilebilir online terapi.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  <Link href="/randevu-al">Online Randevu Al</Link>
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Online Terapi Nedir?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Online terapi, geleneksel yüz yüze terapinin dijital ortamda
              gerçekleştirilmesi olan modern bir psikolojik destek yöntemidir.
              Güvenli video konferans teknolojisi kullanılarak, profesyonel
              psikolog ile hastanın internet üzerinden gerçek zamanlı iletişim
              kurduğu etkili bir terapi şeklidir.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Araştırmalar, online terapinin yüz yüze terapi kadar etkili
              olduğunu göstermektedir. Özellikle anksiyete, depresyon, stres
              yönetimi ve ilişki sorunları gibi birçok alanda başarılı sonuçlar
              elde edilmektedir. Coğrafi kısıtlamalar, zaman sınırlamaları veya
              fiziksel engeller nedeniyle geleneksel terapiye erişim sorunu
              yaşayan kişiler için ideal bir çözümdür.
            </p>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Online Terapinin Avantajları
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Neden online terapi seçmelisiniz? İşte size sunduğu benzersiz
              faydalar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Online Terapi Süreci
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Online terapi yolculuğunuzun adım adım rehberi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Requirements Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Teknik Gereksinimler
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Online terapi için ihtiyacınız olan minimum teknik şartlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalRequirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">{req.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {req.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{req.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Online Terapi Deneyiminizi Başlatın
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Evinizin konforunda, güvenli ve etkili online psikoloji desteği için
            hemen randevunuzu alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Ücretsiz Ön Görüşme
            </Button>
          </div>
        </motion.section>
      </Container>
    </div>
  );
};

export default OnlineTerapiPage;
