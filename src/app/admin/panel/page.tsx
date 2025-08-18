"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase, signOut, getCurrentUser, Appointment } from "@/lib/supabase";
import Button from "../../components/Button";
import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaCheck,
  FaTimes,
  FaSignOutAlt,
  FaPhone,
  FaEnvelope,
  FaComment,
} from "react-icons/fa";

// Moment.js yerelleştirme
moment.locale("tr");
const localizer = momentLocalizer(moment);

const AdminPanelPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  const router = useRouter();

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Randevular yüklenirken hata:", error);
    }
  };

  const checkAuthAndLoadData = useCallback(async () => {
    try {
      const { user: currentUser } = await getCurrentUser();

      if (!currentUser) {
        // Kullanıcı giriş yapmamış, login sayfasına yönlendir
        router.push("/admin");
        return;
      }

      setUser(currentUser);
      await fetchAppointments();
    } catch (error) {
      console.error("Auth/Data loading error:", error);
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Sayfa yüklendiğinde auth kontrol et ve randevuları yükle
  useEffect(() => {
    checkAuthAndLoadData();
  }, [checkAuthAndLoadData]);

  // Çıkış yap
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Randevu durumunu güncelle
  const updateAppointmentStatus = async (
    appointmentId: string,
    newStatus: "confirmed" | "cancelled"
  ) => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", appointmentId);

      if (error) throw error;

      // Listeyi güncelle
      await fetchAppointments();
      setSelectedAppointment(null);

      const statusText =
        newStatus === "confirmed" ? "onaylandı" : "iptal edildi";
      alert(`Randevu başarıyla ${statusText}!`);
    } catch (error) {
      console.error("Randevu güncellenirken hata:", error);
      alert("Randevu güncellenirken bir hata oluştu.");
    } finally {
      setActionLoading(false);
    }
  };

  // Takvim için event'leri hazırla
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.time_slot} - ${appointment.name}`,
    start: moment(
      `${appointment.date} ${appointment.time_slot.split("-")[0]}`
    ).toDate(),
    end: moment(
      `${appointment.date} ${appointment.time_slot.split("-")[1]}`
    ).toDate(),
    resource: appointment,
  }));

  // Event stilini belirleme
  const eventStyleGetter = (event: { resource: Appointment }) => {
    const appointment = event.resource;
    let backgroundColor = "#3b82f6"; // Mavi (pending)

    if (appointment.status === "confirmed") {
      backgroundColor = "#10b981"; // Yeşil
    } else if (appointment.status === "cancelled") {
      backgroundColor = "#ef4444"; // Kırmızı
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  // Event'e tıklandığında detay göster
  const handleSelectEvent = (event: { resource: Appointment }) => {
    setSelectedAppointment(event.resource);
  };

  // İstatistikler
  const stats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    confirmed: appointments.filter((apt) => apt.status === "confirmed").length,
    cancelled: appointments.filter((apt) => apt.status === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Randevu Yönetim Sistemi</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hoş geldiniz, {user?.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Çıkış</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Toplam Randevu
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FaClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Onaylanan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.confirmed}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-50 rounded-lg">
                <FaTimes className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  İptal Edilen
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.cancelled}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Takvim */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-600" />
                Randevu Takvimi
              </h2>

              <div className="calendar-container" style={{ height: "600px" }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventStyleGetter}
                  popup={true}
                  popupOffset={{ x: 10, y: 10 }}
                  messages={{
                    next: "Sonraki",
                    previous: "Önceki",
                    today: "Bugün",
                    month: "Ay",
                    week: "Hafta",
                    day: "Gün",
                    showMore: (total) => `+${total} randevu daha`,
                  }}
                />
              </div>

              {/* Renk açıklaması */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span>Bekliyor</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Onaylandı</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>İptal Edildi</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Randevu Detayları */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {selectedAppointment ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Randevu Detayları
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Ad Soyad
                    </label>
                    <p className="text-gray-900">{selectedAppointment.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      E-posta
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      {selectedAppointment.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Telefon
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <FaPhone className="mr-2 text-gray-400" />
                      {selectedAppointment.phone}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Tarih & Saat
                    </label>
                    <p className="text-gray-900">
                      {moment(selectedAppointment.date).format("DD MMMM YYYY")}{" "}
                      - {selectedAppointment.time_slot}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Durum
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        selectedAppointment.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : selectedAppointment.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedAppointment.status === "confirmed"
                        ? "Onaylandı"
                        : selectedAppointment.status === "cancelled"
                        ? "İptal Edildi"
                        : "Bekliyor"}
                    </span>
                  </div>

                  {selectedAppointment.message && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <FaComment className="mr-2" />
                        Mesaj
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {selectedAppointment.message}
                      </p>
                    </div>
                  )}

                  {selectedAppointment.status === "pending" && (
                    <div className="flex space-x-3 pt-4">
                      <Button
                        onClick={() =>
                          updateAppointmentStatus(
                            selectedAppointment.id,
                            "confirmed"
                          )
                        }
                        disabled={actionLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <FaCheck className="mr-2" />
                        Onayla
                      </Button>
                      <Button
                        onClick={() =>
                          updateAppointmentStatus(
                            selectedAppointment.id,
                            "cancelled"
                          )
                        }
                        disabled={actionLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <FaTimes className="mr-2" />
                        İptal Et
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Randevu Seçin
                </h3>
                <p className="text-gray-600">
                  Detayları görmek için takvimden bir randevuya tıklayın.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
