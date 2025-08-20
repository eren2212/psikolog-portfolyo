"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr"; // Türkçe locale'i açıkça import et
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase, Appointment, BlockedPeriod } from "@/lib/supabase";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { useToast } from "../components/Toast";

// Moment.js yerelleştirme - Production için güçlendirilmiş
moment.locale("tr");

const RandevuAlPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<
    "month" | "week" | "day" | "agenda" | "work_week"
  >("month");

  // Mobil cihaz tespiti
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([]);

  // Türkçe tarih formatları için memoized localizer
  const turkishLocalizer = useMemo(() => {
    // Production'da locale'in kesin yüklendiğinden emin ol
    moment.locale("tr");
    return momentLocalizer(moment);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Validation functions
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
    if (!phone.trim()) return "Telefon numarası zorunludur";
    // Türkiye telefon numarası formatları: 05xx xxx xx xx veya +90 5xx xxx xx xx
    const phoneRegex = /^(\+90\s?)?0?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    const cleanPhone = phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return "Geçerli bir Türkiye telefon numarası giriniz (örn: 0532 123 45 67)";
    }
    return "";
  };

  // Handle input changes with validation
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Çalışma saatleri (09:00 - 17:00 arası)
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  // Locale'i kesin ayarla ve verileri yükle
  useEffect(() => {
    // Production'da locale ayarını kesinleştir
    moment.locale("tr");

    fetchAppointments();
    fetchBlockedPeriods();
  }, []);

  const fetchBlockedPeriods = async () => {
    try {
      const { data, error } = await supabase
        .from("blocked_periods")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      setBlockedPeriods(data || []);
    } catch (error) {
      console.error("Bloke dönemler yüklenirken hata:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setCalendarLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .neq("status", "cancelled") // İptal edilen randevuları hariç tut
        .order("date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Randevular yüklenirken hata:", error);
    } finally {
      // Kısa bir gecikme ekleyerek takvimin render olmasını bekle
      setTimeout(() => {
        setCalendarLoading(false);
      }, 500);
    }
  };

  // Takvim için event'leri hazırla
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.time_slot} - ${
      appointment.status === "confirmed" ? "Dolu" : "Rezerve"
    }`,
    start: moment(
      `${appointment.date} ${appointment.time_slot.split("-")[0]}`
    ).toDate(),
    end: moment(
      `${appointment.date} ${appointment.time_slot.split("-")[1]}`
    ).toDate(),
    resource: appointment,
  }));

  // Tarihi seçtiğimizde
  const handleSelectSlot = ({ start }: { start: Date }) => {
    const selectedDay = moment(start).startOf("day");
    const today = moment().startOf("day");

    // Geçmiş tarihleri seçmeyi engelle
    if (selectedDay.isBefore(today)) {
      toast.showWarning(
        "Geçmiş Tarih",
        "Geçmiş tarihler için randevu alınamaz."
      );
      return;
    }

    // Hafta sonu kontrolü (Cumartesi: 6, Pazar: 0)
    if (start.getDay() === 0 || start.getDay() === 6) {
      toast.showWarning("Hafta Sonu", "Hafta sonları randevu alınamaz.");
      return;
    }

    // Bloke edilen dönemler kontrolü
    const isBlocked = blockedPeriods.some((period) => {
      const startDate = moment(period.start_date);
      const endDate = moment(period.end_date);
      return selectedDay.isBetween(startDate, endDate, "day", "[]");
    });

    if (isBlocked) {
      const blockedPeriod = blockedPeriods.find((period) => {
        const startDate = moment(period.start_date);
        const endDate = moment(period.end_date);
        return selectedDay.isBetween(startDate, endDate, "day", "[]");
      });

      const reasonText =
        blockedPeriod?.reason || "Bu tarih aralığı müsait değil";
      toast.showWarning(
        "Tarih Müsait Değil",
        `Bu tarih için randevu alınamaz. ${reasonText}`
      );
      return;
    }

    setSelectedDate(start);
    setSelectedTimeSlot("");
    setShowForm(false);
  };

  // Saat dilimi seçimi
  const handleTimeSlotSelect = (timeSlot: string) => {
    if (!selectedDate) return;

    const dateStr = moment(selectedDate).format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    // Geçmiş saat kontrolü - bugün seçilmişse ve saat geçmişse engelle
    if (dateStr === today) {
      const currentTime = moment();
      const slotStartTime = moment(`${dateStr} ${timeSlot.split("-")[0]}`);

      if (slotStartTime.isBefore(currentTime)) {
        toast.showWarning(
          "Geçmiş Saat",
          "Geçmiş saatler için randevu alınamaz!"
        );
        return;
      }
    }

    // Bu saat diliminde randevu var mı kontrol et
    const existingAppointment = appointments.find(
      (apt) => apt.date === dateStr && apt.time_slot === timeSlot
    );

    if (existingAppointment) {
      toast.showWarning("Saat Dolu", "Bu saat dilimi zaten dolu!");
      return;
    }

    setSelectedTimeSlot(timeSlot);
    setShowForm(true);
  };

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    const newErrors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
    };

    setErrors(newErrors);

    // If there are errors, don't submit
    if (nameError || emailError || phoneError) {
      toast.showWarning(
        "Form Hatası",
        "Lütfen tüm alanları doğru şekilde doldurun."
      );
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        time_slot: selectedTimeSlot,
        message: formData.message,
        status: "pending" as const,
      };

      const { error } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (error) throw error;

      toast.showSuccess(
        "Randevu Talebiniz Oluşturuldu!",
        "Randevunuz talebiniz başarıyla oluşturuldu! En kısa sürede size dönüş yapılacaktır."
      );

      // Formu temizle
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({ name: "", email: "", phone: "" });
      setSelectedDate(null);
      setSelectedTimeSlot("");
      setShowForm(false);

      // Randevuları yeniden yükle
      fetchAppointments();
    } catch (error) {
      console.error("Randevu oluşturulurken hata:", error);
      toast.showError(
        "Hata!",
        "Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  // Event stilini belirleme (kullanıcı için renk ayrımı)
  const eventStyleGetter = (event: { resource: Appointment }) => {
    const appointment = event.resource;
    let backgroundColor = "#3b82f6"; // Mavi - Rezerve (pending)

    if (appointment.status === "confirmed") {
      backgroundColor = "#10b981"; // Yeşil - Dolu (confirmed)
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Randevu Al
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Size en uygun tarih ve saati seçerek kolayca randevu alabilirsiniz.
            Randevunuz onaylandıktan sonra size bilgilendirme yapılacaktır.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Takvim */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 order-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-600" />
                Tarih Seçin
              </h2>

              {isMobile && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-sm text-blue-700">
                    📱 <strong>Mobil İpucu:</strong> Takvimden istediğiniz
                    tarihe dokunarak randevu alabilirsiniz.
                  </p>
                </div>
              )}

              <div
                className="calendar-container touch-manipulation"
                style={{
                  height: "500px",
                  touchAction: "manipulation", // Mobil dokunmatik optimizasyonu
                }}
              >
                {calendarLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Takvim yükleniyor...</p>
                    </div>
                  </div>
                ) : (
                  <Calendar
                    localizer={turkishLocalizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    eventPropGetter={eventStyleGetter}
                    views={isMobile ? ["month"] : ["month", "week", "day"]}
                    view={isMobile ? "month" : currentView}
                    onView={(view) => {
                      // Mobilde sadece month view'a izin ver
                      if (!isMobile) {
                        setCurrentView(view);
                      }
                    }}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    toolbar={true}
                    // Mobil dokunmatik destek
                    longPressThreshold={100}
                    onSelectEvent={() => {
                      // Event'e tıklandığında hiçbir şey yapma (sadece tarih seçimine izin ver)
                      return;
                    }}
                    // Türkçe mesajlar
                    messages={{
                      next: "Sonraki",
                      previous: "Önceki",
                      today: "Bugün",
                      month: "Ay",
                      week: "Hafta",
                      day: "Gün",
                      agenda: "Ajanda",
                      date: "Tarih",
                      time: "Saat",
                      event: "Etkinlik",
                      noEventsInRange:
                        "Bu tarih aralığında etkinlik bulunmuyor.",
                      showMore: (total: number) => `+${total} tane daha`,
                    }}
                    // Mobil için daha iyi dokunmatik deneyim
                    step={60}
                    timeslots={1}
                    formats={{
                      dateFormat: "DD",
                      dayFormat: (date: Date) => moment(date).format("dddd"),
                      dayHeaderFormat: (date: Date) =>
                        moment(date).format("dddd DD/MM"),
                      dayRangeHeaderFormat: ({
                        start,
                        end,
                      }: {
                        start: Date;
                        end: Date;
                      }) =>
                        `${moment(start).format("DD MMMM")} - ${moment(
                          end
                        ).format("DD MMMM YYYY")}`,
                      monthHeaderFormat: (date: Date) =>
                        moment(date).format("MMMM YYYY"),
                      weekdayFormat: (date: Date) => moment(date).format("dd"),
                    }}
                    // Mobil responsive ayarlar
                    popup
                    popupOffset={10}
                    // Mobilde drill-down davranışını engelle
                    drilldownView={isMobile ? null : "day"}
                    // Mobilde event tıklamalarını engelle
                    onDrillDown={isMobile ? () => false : undefined}
                  />
                )}
              </div>

              {/* Renk açıklaması */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Dolu</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span>Rezerve</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span>Müsait</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 order-2"
          >
            {/* Tarih Seçimi */}
            {selectedDate && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaClock className="mr-3 text-purple-600" />
                  Saat Seçin
                </h3>
                <p className="text-gray-600 mb-4">
                  Seçilen Tarih:{" "}
                  <strong>
                    {moment(selectedDate).locale("tr").format("DD MMMM YYYY")}
                  </strong>
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((timeSlot) => {
                    const dateStr = moment(selectedDate).format("YYYY-MM-DD");
                    const today = moment().format("YYYY-MM-DD");

                    // Randevu var mı kontrol
                    const isBooked = appointments.some(
                      (apt) =>
                        apt.date === dateStr && apt.time_slot === timeSlot
                    );

                    // Geçmiş saat mi kontrol (bugün seçilmişse)
                    let isPastTime = false;
                    if (dateStr === today) {
                      const currentTime = moment();
                      const slotStartTime = moment(
                        `${dateStr} ${timeSlot.split("-")[0]}`
                      );
                      isPastTime = slotStartTime.isBefore(currentTime);
                    }

                    const isDisabled = isBooked || isPastTime;

                    return (
                      <button
                        key={timeSlot}
                        onClick={() => handleTimeSlotSelect(timeSlot)}
                        disabled={isDisabled}
                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                          isDisabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedTimeSlot === timeSlot
                            ? "bg-purple-600 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        {timeSlot}{" "}
                        {isBooked ? "(Dolu)" : isPastTime ? "(Geçmiş)" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Randevu Formu */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-3 text-purple-600" />
                  Bilgileriniz
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.name
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      placeholder="0532 123 45 67"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj (Opsiyonel)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Randevu hakkında belirtmek istediğiniz özel durumlar..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                  >
                    {loading ? "Randevu Oluşturuluyor..." : "Randevu Oluştur"}
                  </Button>
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bilgilendirme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Randevu Alma Süreci
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Tarih ve Saat Seçin
              </h4>
              <p className="text-blue-700 text-sm">
                Takvimden uygun tarih ve saat dilimini seçerek randevu
                talebinizi oluşturun.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Onay Bekleyin
              </h4>
              <p className="text-blue-700 text-sm">
                Randevu talebiniz incelendikten sonra sizi arayacağız ve
                bilgilendireceğiz.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Randevunuza Gelin
              </h4>
              <p className="text-blue-700 text-sm">
                Onaylanan randevu saatinde belirlenen yerde buluşarak seansınızı
                gerçekleştirin.Veya online terapi yapabilirsiniz.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RandevuAlPage;
