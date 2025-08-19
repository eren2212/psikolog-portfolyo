"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import {
  FaHeart,
  FaUsers,
  FaComments,
  FaHandHoldingHeart,
} from "react-icons/fa";
import Link from "next/link";

const AileCiftTerapisiPage = () => {
  const benefits = [
    {
      icon: <FaHeart className="w-8 h-8 text-pink-600" />,
      title: "İlişki Güçlendirme",
      description:
        "Çiftler arasındaki bağı güçlendirme, sevgi ve saygıyı yeniden inşa etme konusunda profesyonel destek sunuyorum.",
    },
    {
      icon: <FaComments className="w-8 h-8 text-pink-600" />,
      title: "İletişim Becerileri",
      description:
        "Sağlıklı iletişim kurma, dinleme ve empati geliştirme becerilerini öğreterek ilişkileri iyileştiriyorum.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-pink-600" />,
      title: "Aile Dinamikleri",
      description:
        "Aile içi roller, sorumluluklar ve dinamikleri anlamaya yönelik çalışmalar yaparak uyumu artırıyorum.",
    },
    {
      icon: <FaHandHoldingHeart className="w-8 h-8 text-pink-600" />,
      title: "Çatışma Çözümü",
      description:
        "Anlaşmazlıkları yapıcı şekilde çözme, uzlaşma kültürü oluşturma konusunda rehberlik ediyorum.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "İlk Değerlendirme",
      description:
        "Çift veya aile ile tanışma, mevcut durumu anlama ve sorun alanlarını tespit etme aşaması.",
    },
    {
      step: "02",
      title: "Hedef Belirleme",
      description:
        "Birlikte çalışılacak konuları ve ulaşmak istediğiniz ilişki hedeflerini net şekilde belirleme.",
    },
    {
      step: "03",
      title: "Terapi Seansları",
      description:
        "Düzenli görüşmelerle iletişim becerilerini geliştirme ve ilişki dinamiklerini iyileştirme.",
    },
    {
      step: "04",
      title: "İzleme ve Pekiştirme",
      description:
        "İlerlemeyi takip etme, öğrenilen becerileri pekiştirme ve sürdürülebilirlik sağlama.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/psikolog_images/cift_detay.jpg"
            alt="Aile ve Çift Terapisi"
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
                Aile ve Çift
                <span className="block text-pink-300">Terapisi</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                İlişkilerinizi güçlendirin, sevginizi yeniden keşfedin. Aile ve
                çift dinamiklerinizi iyileştirmek için buradayım.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg">
                  <Link href="/randevu-al">Hemen Randevu Al</Link>
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
              Aile ve Çift Terapisi Nedir?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Aile ve çift terapisi, ilişkilerdeki sorunları çözmek, iletişimi
              güçlendirmek ve aile dinamiklerini iyileştirmek amacıyla yapılan
              profesyonel bir destek sürecidir. Bu süreçte, çiftler ve aileler
              arasındaki bağları güçlendirmeyi, sağlıklı iletişim kurabilmeyi ve
              karşılıklı anlayışı artırmayı hedefliyoruz.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Güvenli ve destekleyici bir ortamda, ilişkinizdeki zorlukları
              birlikte ele alır, çatışmaları yapıcı şekilde çözme yollarını
              öğrenir ve sevgi dolu bir aile ortamı yaratmanın yollarını
              keşfederiz. Her ailenin ve çiftin benzersiz dinamikleri olduğunu
              bilerek, size özel yaklaşımlar geliştiriyorum.
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
              İlişkilerinizi Nasıl Güçlendiririz?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aile ve çift terapisi sürecinde size sunduğum temel destek
              alanları
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
                  <div className="flex-shrink-0 p-3 bg-pink-50 rounded-xl">
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
              Terapi Süreci Nasıl İlerler?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Birlikte geçireceğimiz aile ve çift terapisi sürecinin adımları
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
                  <div className="w-16 h-16 mx-auto bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-pink-200 -translate-x-8"></div>
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

        {/* Special Section - Who Can Benefit */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Kimler Faydalanabilir?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Yeni Evli Çiftler",
                  description:
                    "Evlilik hayatına uyum sağlama, roller ve sorumlulukları belirleme",
                },
                {
                  title: "İletişim Sorunu Yaşayan Çiftler",
                  description:
                    "Anlaşmazlıkları çözme, sağlıklı iletişim kurma becerileri",
                },
                {
                  title: "Çocuklu Aileler",
                  description:
                    "Ebeveynlik becerileri, çocuk yetiştirme konularında destek",
                },
                {
                  title: "Boşanma Sürecindeki Çiftler",
                  description:
                    "Süreci sağlıklı yönetme, çocuklar için en iyi kararları alma",
                },
                {
                  title: "Geniş Aileler",
                  description:
                    "Aile büyükleri ile ilişkiler, sınır belirleme konuları",
                },
                {
                  title: "Kriz Dönemindeki Aileler",
                  description:
                    "Travma, kayıp, hastalık gibi zorlu dönemlerde destek",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
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
          className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            İlişkilerinizi Güçlendirmeye Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Sevdiklerinizle daha sağlıklı ve mutlu bir yaşam için aile ve çift
            terapisi yolculuğuna başlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-pink-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              <Link href="/randevu-al">Randevu Al</Link>
            </Button>
          </div>
        </motion.section>
      </Container>
    </div>
  );
};

export default AileCiftTerapisiPage;
