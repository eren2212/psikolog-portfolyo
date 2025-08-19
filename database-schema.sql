-- Randevu tablosu
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  message TEXT,
  created_by_admin BOOLEAN DEFAULT false, -- Admin tarafından oluşturuldu mu?
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Zaman slotları tablosu (opsiyonel - şimdilik kullanmayabiliriz)
CREATE TABLE time_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Bloke edilen dönemler tablosu (tatil/izin sistemi için)
CREATE TABLE blocked_periods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT, -- "Tatil", "İzin", "Toplantı" vb.
  block_type TEXT DEFAULT 'holiday' CHECK (block_type IN ('holiday', 'meeting', 'personal', 'unavailable')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (end_date >= start_date)
);

-- Row Level Security (RLS) aktifleştir
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_periods ENABLE ROW LEVEL SECURITY;

-- Public okuma izni (randevuları görüntülemek için)
CREATE POLICY "Anyone can view appointments" ON appointments
  FOR SELECT USING (true);

-- Public insert izni (randevu oluşturmak için)
CREATE POLICY "Anyone can create appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Sadece authenticated kullanıcılar güncelleyebilir (admin için)
CREATE POLICY "Only authenticated users can update appointments" ON appointments
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Time slots için benzer politikalar
CREATE POLICY "Anyone can view time_slots" ON time_slots
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage time_slots" ON time_slots
  FOR ALL USING (auth.role() = 'authenticated');

-- Blocked periods politikaları
CREATE POLICY "Anyone can view blocked_periods" ON blocked_periods
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage blocked_periods" ON blocked_periods
  FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for better performance
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_time_slots_date ON time_slots(date);
CREATE INDEX idx_blocked_periods_dates ON blocked_periods(start_date, end_date);
CREATE INDEX idx_blocked_periods_type ON blocked_periods(block_type);
