"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "05", // Başlangıçta otomatik 05 yazar
    service: "Cilt Bakımı",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Telefon Numarası Maskeleme (05XX XXX XX XX formatı)
    if (name === 'phone') {
      let input = value.replace(/\D/g, ''); 
      
      if (input === '' || input === '0') input = '05';
      else if (input.length === 1 && input !== '0') input = '05' + input;
      else if (input.length >= 2 && !input.startsWith('05')) input = '05' + input.substring(2);

      input = input.substring(0, 11);

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
    
    // Telefon numarası eksik mi kontrol et
    if (formData.phone.length < 14) {
      alert("Lütfen telefon numaranızı eksiksiz giriniz.");
      return;
    }

    setStatus("Gönderiliyor...");

    // 1. ADIM: Google Sheets
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxUE80_OTRybdH4lDr7aOYg4FOxK_-zXUms7Y7DBGS7F5y4bS2i8Mmt6m6f1Tc7Eg3uNw/exec";

    const formParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      formParams.append(key, value);
    });

    try {
      // 1. Google Sheets İsteği (keepalive eklendi)
      const googlePromise = fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors", 
        keepalive: true, // Tarayıcı kapansa bile işlemi arka planda tamamlar
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: formParams.toString(),
      });

      // 2. Telegram Bildirimi İsteği (keepalive eklendi)
      const telegramPromise = fetch('/api/randevu', {
        method: 'POST',
        keepalive: true, // Tarayıcı kapansa bile işlemi arka planda tamamlar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad: formData.name,
          telefon: formData.phone,
          hizmet: formData.service,
          tarih: "Sizi Arayalım Formu", // Tarih seçimi olmadığı için bilgi veriyoruz
          saat: "-",
          not: formData.message
        }),
      });

      // İki isteği AYNI ANDA çalıştır ve beklet (Form gönderim hızını 2 katına çıkarır)
      await Promise.all([googlePromise, telegramPromise]);

      setStatus("Başarılı");
      // Form gönderildikten sonra numarayı tekrar 05'e döndürüyoruz
      setFormData({ name: "", phone: "05", service: "Cilt Bakımı", message: "" });
      setTimeout(() => setStatus(""), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus("Hata"); // İnternet tamamen kopuksa sonsuza kadar asılı kalmaz, hata verir
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-[#E8E2DA]">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-[#3D2C23] mb-2">Sizi Arayalım</h3>
        <p className="text-[#7A6A5E] text-sm font-light">Sorularınız için bilgilerinizi bırakın, uzmanlarımız size hemen ulaşsın.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold tracking-wide text-[#7A6A5E] mb-1">Adınız Soyadınız *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-[#E8E2DA] rounded-xl focus:ring-2 focus:ring-[#8C7662] focus:border-[#8C7662] outline-none transition bg-[#FDFBF7]" placeholder="Örn: Ayşe Yılmaz" />
        </div>
        <div>
          <label className="block text-sm font-semibold tracking-wide text-[#7A6A5E] mb-1">Telefon Numaranız *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-[#E8E2DA] rounded-xl focus:ring-2 focus:ring-[#8C7662] focus:border-[#8C7662] outline-none transition bg-[#FDFBF7]" placeholder="05XX XXX XX XX" />
        </div>
        <div>
          <label className="block text-sm font-semibold tracking-wide text-[#7A6A5E] mb-1">İlgilendiğiniz Hizmet *</label>
          <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 border border-[#E8E2DA] rounded-xl focus:ring-2 focus:ring-[#8C7662] focus:border-[#8C7662] outline-none transition bg-[#FDFBF7]">
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
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold tracking-wide text-[#7A6A5E] mb-1">Notunuz (İsteğe Bağlı)</label>
          <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-[#E8E2DA] rounded-xl focus:ring-2 focus:ring-[#8C7662] focus:border-[#8C7662] outline-none transition bg-[#FDFBF7]" placeholder="Belirtmek istediğiniz bir detay var mı?"></textarea>
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
        
        <button 
          type="submit" 
          disabled={status === "Gönderiliyor..."}
          className="w-full bg-[#3D2C23] hover:bg-[#8C7662] text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-70"
        >
          {status === "Gönderiliyor..." ? "İletiliyor..." : "Talebi Gönder"}
        </button>

        {status === "Başarılı" && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center text-sm font-medium mt-4">
            Talebiniz başarıyla alındı. Uzmanlarımız size en kısa sürede dönüş yapacaktır.
          </div>
        )}
        {status === "Hata" && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-sm font-medium mt-4">
            Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya numaralarımızdan ulaşın.
          </div>
        )}
      </form>
    </div>
  );
}