"use client";
import { useState, useEffect } from 'react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '05', // Başlangıçta otomatik 05 yazar
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); 
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    setTodayDate(localDate);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Tarih Kontrolü (Salı günleri kapalı)
    if (name === 'date' && value) {
      const selectedDate = new Date(value);
      if (selectedDate.getDay() === 2) {
        alert("Salı günleri hizmet vermemekteyiz. Lütfen başka bir gün seçiniz.");
        setFormData({ ...formData, date: '' });
        return;
      }
    }

    // Telefon Numarası Maskeleme (05XX XXX XX XX formatı)
    if (name === 'phone') {
      // Sadece rakamları al
      let input = value.replace(/\D/g, ''); 
      
      // Kullanıcı silmeye çalışsa bile 05 ile başlamasını sağla veya boşsa 05 ekle
      if (input === '' || input === '0') input = '05';
      else if (input.length === 1 && input !== '0') input = '05' + input;
      else if (input.length >= 2 && !input.startsWith('05')) input = '05' + input.substring(2);

      // Maksimum 11 rakam kuralı
      input = input.substring(0, 11);

      // Rakamları formatla
      let formatted = input;
      if (input.length > 7) {
        formatted = `${input.substring(0, 4)} ${input.substring(4, 7)} ${input.substring(7, 9)} ${input.substring(9, 11)}`;
      } else if (input.length > 4) {
        formatted = `${input.substring(0, 4)} ${input.substring(4, 7)} ${input.substring(7)}`;
      } else if (input.length > 3) {
        formatted = `${input.substring(0, 4)} ${input.substring(4)}`;
      }

      setFormData({ ...formData, phone: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Telefon numarası eksik mi kontrol et (11 hane olmalı + boşluklarla 14 karakter)
    if (formData.phone.length < 14) {
      alert("Lütfen telefon numaranızı eksiksiz giriniz.");
      return;
    }

    setStatus('loading');

    // 1. ADIM: Google Sheets
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUE80_OTRybdH4lDr7aOYg4FOxK_-zXUms7Y7DBGS7F5y4bS2i8Mmt6m6f1Tc7Eg3uNw/exec'; 

    const formParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      formParams.append(key, value);
    });

    try {
      // 1. Google Sheets İsteği (keepalive eklendi)
      const googlePromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true, // Tarayıcı kapansa bile arka planda gönderimi tamamlar
        body: formParams.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      // 2. Telegram İsteği (keepalive eklendi)
      const telegramPromise = fetch('/api/randevu', {
        method: 'POST',
        keepalive: true, // Tarayıcı kapansa bile arka planda gönderimi tamamlar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad: formData.name,
          telefon: formData.phone,
          hizmet: formData.service,
          tarih: formData.date,
          saat: formData.time,
          not: formData.message // Ek notları API'ye gönderiyoruz
        }),
      });

      // Her iki isteği AYNI ANDA çalıştır ve beklet
      await Promise.all([googlePromise, telegramPromise]);

      setStatus('success');
      // Form gönderildikten sonra da numarayı sıfırlarken 05'e döndürüyoruz
      setFormData({ name: '', phone: '05', service: '', date: '', time: '', message: '' }); 
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", 
    "19:00", "19:30", "20:00", "20:30"
  ];

  if (status === 'success') {
    return (
      <div className="bg-[#FDFBF7] border border-[#25D366]/30 p-10 rounded-2xl text-center shadow-sm">
        <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-serif text-[#3D2C23] mb-3">Talebiniz Alındı</h3>
        <p className="text-[#7A6A5E] mb-6">Randevu talebiniz başarıyla iletildi. Müsaitlik durumuna göre onay için size dönüş yapacağız.</p>
        <button onClick={() => setStatus('idle')} className="text-[#8C7662] font-bold uppercase text-sm tracking-widest hover:text-[#3D2C23] transition-colors border-b border-[#8C7662] hover:border-[#3D2C23] pb-1">
          Yeni Randevu Al
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#E8E2DA] text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Adınız Soyadınız *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all" placeholder="Örn: Ayşe Yılmaz" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Telefon Numaranız *</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all placeholder:text-gray-400" placeholder="05XX XXX XX XX" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Hizmet Seçimi *</label>
        <select required name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all appearance-none cursor-pointer">
          <option value="" disabled>Lütfen bir hizmet seçin</option>
          <option value="Cilt Bakımı">Cilt Bakımı</option>
          <option value="Kafa Masajı">Kafa Masajı</option>
          <option value="Kalıcı Oje">Kalıcı Oje</option>
          <option value="Kaş Tasarımı">Kaş Tasarımı</option>
          <option value="Kreatin Bakımı">Kreatin Bakımı</option>
          <option value="Kuaför">Kuaför</option>
          <option value="Lazer Epilasyon">Lazer Epilasyon</option>
          <option value="Led Terapi">Led Terapi</option>
          <option value="Manikür">Manikür</option>
          <option value="Pedikür">Pedikür</option>
          <option value="Protez Tırnak">Protez Tırnak</option>
          <option value="Diğer">Diğer</option>
          <option value="Ücretsiz Ön Görüşme">Ücretsiz Ön Görüşme</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Tarih *</label>
          <input required type="date" name="date" value={formData.date} min={todayDate} onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all cursor-pointer" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Saat *</label>
          <select required name="time" value={formData.time} onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all appearance-none cursor-pointer">
            <option value="" disabled>Saat Seçiniz</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-[#8C7662] uppercase tracking-wider mb-2">Ek Notlar (İsteğe Bağlı)</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-[#FDFBF7] border border-[#E8E2DA] rounded-lg px-4 py-3 text-[#3D2C23] focus:outline-none focus:ring-2 focus:ring-[#8C7662]/50 transition-all resize-none" placeholder="Belirtmek istediğiniz özel bir durum var mı?"></textarea>
      </div>

      <div className="flex items-start gap-3 mb-6">
        <input 
          type="checkbox" 
          id="iletisimIzni" 
          required 
          className="mt-1 w-4 h-4 cursor-pointer accent-[#8C7662]" 
        />
        <label htmlFor="iletisimIzni" className="text-xs text-[#7A6A5E] leading-relaxed cursor-pointer select-none">
          İletişim bilgilerimin bana ulaşılması ve randevu onayı amacıyla kullanılmasına izin veriyorum. *
        </label>
      </div>

      <button type="submit" disabled={status === 'loading'} className="w-full bg-[#3D2C23] hover:bg-[#8C7662] text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Gönderiliyor...' : 'Randevu Talebi Oluştur'}
      </button>
      
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-4 text-center">Bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.</p>
      )}
    </form>
  );
}