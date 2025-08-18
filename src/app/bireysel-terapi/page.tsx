"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import {
  FaUserFriends,
  FaHeart,
  FaBrain,
  FaCalendarCheck,
} from "react-icons/fa";

const BireyselPage = () => {
  const benefits = [
    {
      icon: <FaUserFriends className="w-8 h-8 text-purple-600" />,
      title: "Kişisel Gelişim",
      description:
        "Kendinizi daha iyi tanıma ve kişisel potansiyelinizi keşfetme yolculuğunda size rehberlik ediyorum.",
    },
    {
      icon: <FaHeart className="w-8 h-8 text-purple-600" />,
      title: "Duygusal Destek",
      description:
        "Yaşadığınız zorlu dönemlerde yanınızda olup, duygusal dengenizi yeniden kurmanızda destek oluyorum.",
    },
    {
      icon: <FaBrain className="w-8 h-8 text-purple-600" />,
      title: "Zihinsel Sağlık",
      description:
        "Anksiyete, depresyon, stres gibi durumlarla başa çıkma konusunda profesyonel destek sağlıyorum.",
    },
    {
      icon: <FaCalendarCheck className="w-8 h-8 text-purple-600" />,
      title: "Düzenli Takip",
      description:
        "İlerlemenizi düzenli olarak takip ederek, hedefinize ulaşmanızda sistematik destek sunuyorum.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "İlk Görüşme",
      description:
        "Tanışma ve durumunuzu değerlendirme aşaması. Size en uygun terapi yöntemini belirliyoruz.",
    },
    {
      step: "02",
      title: "Hedef Belirleme",
      description:
        "Birlikte çalışacağımız konuları ve ulaşmak istediğiniz hedefleri net bir şekilde belirliyoruz.",
    },
    {
      step: "03",
      title: "Terapi Süreci",
      description:
        "Düzenli seanslarla, belirlediğimiz hedeflere yönelik sistematik çalışmalar yapıyoruz.",
    },
    {
      step: "04",
      title: "İzleme ve Değerlendirme",
      description:
        "İlerlemenizi takip eder, gerektiğinde terapi planınızı güncelleriz.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/psikolog_images/bireysel_detay.jpg"
            alt="Bireysel Psikoloji Danışmanlığı"
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
                Bireysel Psikoloji
                <span className="block text-purple-300">Danışmanlığı</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Kendinizi keşfetme yolculuğunda size eşlik ediyorum. Bireysel
                ihtiyaçlarınıza özel terapi süreçleriyle yanınızdayım.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  Hemen Randevu Al
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
              Bireysel Terapi Nedir?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Bireysel psikoloji danışmanlığı, kişinin yaşadığı psikolojik
              zorlukları, duygusal problemleri ve yaşam zorluklarını aşmasına
              yardımcı olan profesyonel bir destek sürecidir. Bu süreçte,
              bireyin kendini daha iyi tanıması, potansiyelini keşfetmesi ve
              yaşam kalitesini artırması hedeflenir.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Güvenli ve yargısız bir ortamda, size özel terapi teknikleriyle
              birlikte çalışarak, yaşadığınız zorluklarla başa çıkma
              becerilerinizi geliştirmenize destek oluyorum. Her bireyin
              benzersiz olduğunu bilerek, size özel bir yaklaşım belirliyoruz.
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
              Size Nasıl Yardımcı Olabilirim?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bireysel terapi sürecinde size sunduğum temel destek alanları
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
                  <div className="flex-shrink-0 p-3 bg-purple-50 rounded-xl">
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
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Terapi Süreci Nasıl İlerler?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Birlikte geçireceğimiz terapi sürecinin adımları
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
                  <div className="w-16 h-16 mx-auto bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-purple-200 -translate-x-8"></div>
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

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 md:p-16 text-center text-white mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Değişim Yolculuğunuza Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Size özel bireysel terapi süreciyle, yaşamınızda pozitif
            değişiklikler yaratmanın zamanı geldi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Randevu Al
            </Button>
            <Button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold">
              Daha Fazla Bilgi
            </Button>
          </div>
        </motion.section>
      </Container>
    </div>
  );
};

export default BireyselPage;
