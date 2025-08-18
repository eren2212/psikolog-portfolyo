"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  supabase,
  signOut,
  getCurrentUser,
  Appointment,
  BlockedPeriod,
} from "@/lib/supabase";
import Button from "../../components/Button";
import { useToast } from "../../components/Toast";
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

// Manuel Randevu Oluşturma Modal Component
interface CreateAppointmentModalProps {
  selectedSlot: { date: Date; timeSlot?: string } | null;
  onClose: () => void;
  onSuccess: () => void;
  toast: any;
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  selectedSlot,
  onClose,
  onSuccess,
  toast,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    timeSlot: "",
  });
  const [loading, setLoading] = useState(false);

  // Çalışma saatleri
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !formData.timeSlot) return;

    setLoading(true);
    try {
      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: moment(selectedSlot.date).format("YYYY-MM-DD"),
        time_slot: formData.timeSlot,
        message: formData.message,
        status: "confirmed" as const, // Admin oluşturduğu randevular direkt onaylı
        created_by_admin: true,
      };

      const { error } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (error) throw error;

      toast.showSuccess(
        "Başarılı!",
        "Randevu talebiniz başarıyla oluşturuldu!"
      );
      onSuccess();
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

  if (!selectedSlot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Manuel Randevu Oluştur
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-purple-800 font-medium">
            📅 {moment(selectedSlot.date).format("DD MMMM YYYY, dddd")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saat Seçin *
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Saat seçin</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Hasta adı soyadı"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="0555 123 45 67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notlar
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ek bilgiler (isteğe bağlı)"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Oluşturuluyor..." : "Randevu Oluştur"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Tatil Yönetimi Modal Component
interface BlockPeriodModalProps {
  onClose: () => void;
  onSuccess: () => void;
  blockedPeriods: BlockedPeriod[];
  toast: any;
}

const BlockPeriodModal: React.FC<BlockPeriodModalProps> = ({
  onClose,
  onSuccess,
  blockedPeriods,
  toast,
}) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    blockType: "holiday" as const,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    // Tarih kontrolü
    if (moment(formData.endDate).isBefore(formData.startDate)) {
      toast.showWarning(
        "Geçersiz Tarih",
        "Bitiş tarihi başlangıç tarihinden önce olamaz!"
      );
      return;
    }

    setLoading(true);
    try {
      const blockData = {
        start_date: formData.startDate,
        end_date: formData.endDate,
        reason: formData.reason,
        block_type: formData.blockType,
      };

      const { error } = await supabase
        .from("blocked_periods")
        .insert([blockData]);

      if (error) throw error;

      toast.showSuccess("Başarılı!", "Dönem başarıyla bloke edildi!");
      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
        blockType: "holiday",
      });
      onSuccess();
    } catch (error) {
      console.error("Bloke dönem oluşturulurken hata:", error);
      toast.showError(
        "Hata!",
        "Bloke dönem oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu bloke dönemi silmek istediğinizden emin misiniz?"))
      return;

    try {
      const { error } = await supabase
        .from("blocked_periods")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.showSuccess("Başarılı!", "Bloke dönem başarıyla silindi!");
      onSuccess();
    } catch (error) {
      console.error("Bloke dönem silinirken hata:", error);
      toast.showError("Hata!", "Bloke dönem silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Tatil / İzin Yönetimi
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Yeni Bloke Dönem Ekleme */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">
            Yeni Dönem Bloke Et
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlangıç Tarihi *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                  min={moment().format("YYYY-MM-DD")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Tarihi *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                  min={formData.startDate || moment().format("YYYY-MM-DD")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tür
                </label>
                <select
                  value={formData.blockType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      blockType: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="holiday">Tatil</option>
                  <option value="personal">İzin</option>
                  <option value="meeting">Toplantı</option>
                  <option value="unavailable">Müsait Değil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  placeholder="Örn: Yıllık izin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Ekleniyor..." : "Dönem Bloke Et"}
            </Button>
          </form>
        </div>

        {/* Mevcut Bloke Dönemler */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Mevcut Bloke Dönemler
          </h4>
          {blockedPeriods.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Henüz bloke edilmiş dönem yok.
            </p>
          ) : (
            <div className="space-y-3">
              {blockedPeriods.map((period) => (
                <div
                  key={period.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {moment(period.start_date).format("DD MMM YYYY")} -{" "}
                      {moment(period.end_date).format("DD MMM YYYY")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {period.reason || "Açıklama yok"} •{" "}
                      {period.block_type === "holiday"
                        ? "Tatil"
                        : period.block_type === "personal"
                        ? "İzin"
                        : period.block_type === "meeting"
                        ? "Toplantı"
                        : "Müsait Değil"}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDelete(period.id)}
                    variant="secondary"
                    className="text-red-600 hover:text-red-700"
                  >
                    Sil
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AdminPanelPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<
    "month" | "week" | "day" | "agenda" | "work_week"
  >("month");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    timeSlot?: string;
  } | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([]);

  const router = useRouter();

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
      setFilteredAppointments(data || []);
    } catch (error) {
      console.error("Randevular yüklenirken hata:", error);
    }
  };

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

  // Filtreleme fonksiyonu
  const filterAppointments = (
    status: "all" | "pending" | "confirmed" | "cancelled"
  ) => {
    setActiveFilter(status);
    if (status === "all") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((apt) => apt.status === status);
      setFilteredAppointments(filtered);
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
      await fetchBlockedPeriods();
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

      // Aktif filtreyi tekrar uygula
      setTimeout(() => {
        filterAppointments(activeFilter);
      }, 100);

      const statusText =
        newStatus === "confirmed" ? "onaylandı" : "iptal edildi";
      toast.showSuccess("Başarılı!", `Randevu başarıyla ${statusText}!`);
    } catch (error) {
      console.error("Randevu güncellenirken hata:", error);
      toast.showError("Hata!", "Randevu güncellenirken bir hata oluştu.");
    } finally {
      setActionLoading(false);
    }
  };

  // Takvim için event'leri hazırla (filtrelenmiş)
  const calendarEvents = filteredAppointments.map((appointment) => ({
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

  // Boş slot seçme (manuel randevu oluşturma için)
  const handleSelectSlot = ({ start }: { start: Date }) => {
    const selectedDate = moment(start).format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    // Geçmiş tarih kontrolü
    if (moment(selectedDate).isBefore(today)) {
      toast.showWarning(
        "Geçmiş Tarih",
        "Geçmiş tarihler için randevu oluşturamazsınız!"
      );
      return;
    }

    // Hafta sonu kontrolü
    const dayOfWeek = moment(start).day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toast.showWarning(
        "Hafta Sonu",
        "Hafta sonları randevu oluşturamazsınız!"
      );
      return;
    }

    setSelectedSlot({ date: start });
    setShowCreateModal(true);
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
                onClick={() => setShowBlockModal(true)}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <FaCalendarAlt className="w-4 h-4" />
                <span>Tatil Yönetimi</span>
              </Button>
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
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeFilter === "all" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => filterAppointments("all")}
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
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeFilter === "pending" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => filterAppointments("pending")}
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
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeFilter === "confirmed" ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => filterAppointments("confirmed")}
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
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeFilter === "cancelled" ? "ring-2 ring-red-500" : ""
            }`}
            onClick={() => filterAppointments("cancelled")}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-purple-600" />
                  Randevu Takvimi
                </h2>
                <div className="text-sm text-gray-600">
                  {activeFilter === "all" && "Tüm Randevular"}
                  {activeFilter === "pending" && "Bekleyen Randevular"}
                  {activeFilter === "confirmed" && "Onaylanan Randevular"}
                  {activeFilter === "cancelled" && "İptal Edilen Randevular"}
                  {filteredAppointments.length > 0 && (
                    <span className="ml-2 text-purple-600 font-medium">
                      ({filteredAppointments.length} randevu)
                    </span>
                  )}
                </div>
              </div>

              <div className="calendar-container" style={{ height: "600px" }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  selectable={true}
                  eventPropGetter={eventStyleGetter}
                  popup={true}
                  popupOffset={{ x: 10, y: 10 }}
                  views={["month", "week", "day", "agenda"]}
                  view={currentView}
                  onView={(view) => setCurrentView(view)}
                  date={currentDate}
                  onNavigate={(date) => setCurrentDate(date)}
                  step={60}
                  showMultiDayTimes
                  toolbar={true}
                  messages={{
                    next: "Sonraki",
                    previous: "Önceki",
                    today: "Bugün",
                    month: "Ay",
                    week: "Hafta",
                    day: "Gün",
                    agenda: "Ajanda",
                    showMore: (total) => `+${total} randevu daha`,
                    date: "Tarih",
                    time: "Saat",
                    event: "Randevu",
                    noEventsInRange: "Bu tarih aralığında randevu yok.",
                    allDay: "Tüm Gün",
                    work_week: "İş Haftası",
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

      {/* Manuel Randevu Oluşturma Modal */}
      {showCreateModal && (
        <CreateAppointmentModal
          selectedSlot={selectedSlot}
          toast={toast}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedSlot(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setSelectedSlot(null);
            fetchAppointments();
            setTimeout(() => {
              filterAppointments(activeFilter);
            }, 100);
          }}
        />
      )}

      {/* Tatil Yönetimi Modal */}
      {showBlockModal && (
        <BlockPeriodModal
          blockedPeriods={blockedPeriods}
          toast={toast}
          onClose={() => setShowBlockModal(false)}
          onSuccess={() => {
            setShowBlockModal(false);
            fetchBlockedPeriods();
          }}
        />
      )}
    </div>
  );
};

export default AdminPanelPage;
