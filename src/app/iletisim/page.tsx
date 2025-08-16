"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Container from "../components/Container";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    from_name: "",
    reply_to: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Validasyon fonksiyonları
  const validateName = (name: string) => {
    if (!name.trim()) return "Ad soyad zorunludur";
    if (name.trim().length < 2) return "Ad soyad en az 2 karakter olmalıdır";
    if (!/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/.test(name))
      return "Ad soyad sadece harf içerebilir";
    if (name.trim().split(" ").length < 2)
      return "Lütfen ad ve soyadınızı giriniz";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "E-posta zorunludur";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Geçerli bir e-posta adresi giriniz";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return ""; // Telefon zorunlu değil
    // Türkiye telefon numarası formatları: 05xx xxx xx xx veya +90 5xx xxx xx xx
    const phoneRegex = /^(\+90\s?)?0?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    const cleanPhone = phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return "Geçerli bir Türkiye telefon numarası giriniz (örn: 0532 123 45 67)";
    }
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message.trim()) return "Mesaj zorunludur";
    if (message.trim().length < 10) return "Mesaj en az 10 karakter olmalıdır";
    if (message.trim().length > 1000)
      return "Mesaj en fazla 1000 karakter olabilir";
    return "";
  };

  const formatPhone = (phone: string) => {
    // Sadece rakamları al
    const numbers = phone.replace(/\D/g, "");

    // Türkiye format: 0532 123 45 67
    if (numbers.length >= 11) {
      return numbers
        .slice(0, 11)
        .replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
    } else if (numbers.length >= 7) {
      return numbers
        .replace(/(\d{4})(\d{3})(\d{0,2})(\d{0,2})/, "$1 $2 $3 $4")
        .trim();
    } else if (numbers.length >= 4) {
      return numbers.replace(/(\d{4})(\d{0,3})/, "$1 $2").trim();
    }
    return numbers;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let error = "";

    // Telefon özel formatlama
    if (name === "phone") {
      formattedValue = formatPhone(value);
      error = validatePhone(formattedValue);
    }
    // Diğer alanlar için validasyon
    else if (name === "from_name") {
      error = validateName(value);
    } else if (name === "reply_to") {
      error = validateEmail(value);
    } else if (name === "message") {
      error = validateMessage(value);
    } else if (name === "subject") {
      error = !value ? "Konu seçimi zorunludur" : "";
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tüm alanları tekrar validasyon yap
    const nameError = validateName(formData.from_name);
    const emailError = validateEmail(formData.reply_to);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);
    const subjectError = !formData.subject ? "Konu seçimi zorunludur" : "";

    const newErrors = {
      from_name: nameError,
      reply_to: emailError,
      phone: phoneError,
      subject: subjectError,
      message: messageError,
    };

    setErrors(newErrors);

    // Herhangi bir hata varsa form gönderme
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const templateParams = {
        ...formData,
        time: new Date().toLocaleString("tr-TR"),
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setIsSuccess(true);
      setFormData({
        from_name: "",
        reply_to: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({
        from_name: "",
        reply_to: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Başarı mesajını 5 saniye sonra kaldır
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Email gönderme hatası:", error);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container>
        <div className="py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              📞 İletişim
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Bizimle{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                İletişime Geçin
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Uzman psikolog desteği almak, randevu oluşturmak veya sorularınız
              için bize ulaşın. Size en kısa sürede dönüş yapacağız.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.h2
                className="text-2xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                📝 Mesaj Gönder
              </motion.h2>

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş
                  yapacağız.
                </motion.div>
              )}

              {/* Error Message */}
              {isError && (
                <motion.div
                  className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ❌ Lütfen form hatalarını düzeltin ve tekrar deneyin.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label
                      htmlFor="from_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      👤 Ad Soyad *
                    </label>
                    <motion.input
                      type="text"
                      id="from_name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.from_name
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="Adınız ve soyadınız"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.from_name && (
                      <motion.p
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.from_name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label
                      htmlFor="reply_to"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      📧 E-posta *
                    </label>
                    <motion.input
                      type="email"
                      id="reply_to"
                      name="reply_to"
                      value={formData.reply_to}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.reply_to
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="ornek@email.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.reply_to && (
                      <motion.p
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.reply_to}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      📱 Telefon
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="0532 123 45 67"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.phone && (
                      <motion.p
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Subject Select */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      📋 Konu *
                    </label>
                    <motion.select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.subject
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="Bireysel Terapi">Bireysel Terapi</option>
                      <option value="Çift Terapisi">Çift Terapisi</option>
                      <option value="Online Terapi">Online Terapi</option>
                      <option value="Danışmanlık">Danışmanlık</option>
                      <option value="Randevu">Randevu</option>
                      <option value="Diğer">Diğer</option>
                    </motion.select>
                    {errors.subject && (
                      <motion.p
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    💬 Mesajınız *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                    placeholder="Mesajınızı buraya yazın..."
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.message && (
                      <motion.p
                        className="text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                    <p
                      className={`text-sm ml-auto ${
                        formData.message.length > 1000
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.message.length}/1000
                    </p>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{
                    scale: isLoading ? 1 : 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Gönderiliyor...
                    </div>
                  ) : (
                    "📤 Mesajı Gönder"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* Contact Cards */}
              {[
                {
                  icon: "📧",
                  title: "E-posta",
                  info: "info@psikolog.com",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: "📱",
                  title: "Telefon",
                  info: "+90 532 123 45 67",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: "📍",
                  title: "Adres",
                  info: "İstanbul, Türkiye",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: "🕒",
                  title: "Çalışma Saatleri",
                  info: "Pzt-Cum: 09:00-18:00",
                  color: "from-orange-500 to-orange-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-xl`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* CTA Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  🌟 Acil Durum?
                </motion.h3>
                <motion.p
                  className="mb-6 opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  Acil durumlar için 7/24 destek hattımızı arayabilirsiniz.
                </motion.p>
                <motion.button
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Hemen Ara
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
