"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase, Appointment } from "@/lib/supabase";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";

// Moment.js yerelleştirme
moment.locale("tr");
const localizer = momentLocalizer(moment);

const RandevuAlPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  // Randevuları yükle
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .neq("status", "cancelled") // İptal edilen randevuları hariç tut
        .order("date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Randevular yüklenirken hata:", error);
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
      alert("Geçmiş tarihler için randevu alınamaz.");
      return;
    }

    // Hafta sonu kontrolü (Cumartesi: 6, Pazar: 0)
    if (start.getDay() === 0 || start.getDay() === 6) {
      alert("Hafta sonları randevu alınamaz.");
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
        alert("Geçmiş saatler için randevu alınamaz!");
        return;
      }
    }

    // Bu saat diliminde randevu var mı kontrol et
    const existingAppointment = appointments.find(
      (apt) => apt.date === dateStr && apt.time_slot === timeSlot
    );

    if (existingAppointment) {
      alert("Bu saat dilimi zaten dolu!");
      return;
    }

    setSelectedTimeSlot(timeSlot);
    setShowForm(true);
  };

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

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

      alert(
        "Randevunuz başarıyla oluşturuldu! En kısa sürede size dönüş yapılacaktır."
      );

      // Formu temizle
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedDate(null);
      setSelectedTimeSlot("");
      setShowForm(false);

      // Randevuları yeniden yükle
      fetchAppointments();
    } catch (error) {
      console.error("Randevu oluşturulurken hata:", error);
      alert("Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Takvim */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-600" />
                Tarih Seçin
              </h2>

              <div className="calendar-container" style={{ height: "500px" }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  onSelectSlot={handleSelectSlot}
                  selectable
                  eventPropGetter={eventStyleGetter}
                  messages={{
                    next: "Sonraki",
                    previous: "Önceki",
                    today: "Bugün",
                    month: "Ay",
                    week: "Hafta",
                    day: "Gün",
                  }}
                />
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
            className="space-y-6"
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
                  <strong>{moment(selectedDate).format("DD MMMM YYYY")}</strong>
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
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Adınız ve soyadınız"
                    />
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
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="ornek@email.com"
                    />
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
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0555 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj (Opsiyonel)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
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
                Randevu talebiniz incelendikten sonra size e-posta ile
                bilgilendirme yapılacaktır.
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
                gerçekleştirin.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RandevuAlPage;
