"use client";

import { useState } from "react";
import ContactForm from "../components/ContactForm";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import AppointmentForm from "../components/AppointmentForm";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A3B32]">
      
      {/* Üst Bilgi ve Menü (Header) */}
      <header className="fixed top-0 w-full z-50 py-4 px-4 md:px-8 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-[#E8E2DA] shadow-sm transition-all">
        <div className="font-serif text-xl md:text-2xl font-extrabold tracking-widest text-[#3D2C23] z-50">
          YUNUS ÇETİNOĞLU
          <span className="block text-[9px] md:text-[11px] font-medium tracking-[0.3em] text-[#8C7662] uppercase mt-1">Estetik & Güzellik</span>
        </div>
        
        <nav className="hidden lg:flex gap-8 text-[13px] font-bold text-[#3D2C23] uppercase tracking-widest">
          <a href="#hero" className="hover:text-[#8C7662] transition-colors duration-300">Ana Sayfa</a>
          <a href="#hizmetler" className="hover:text-[#8C7662] transition-colors duration-300">Hizmetler</a>
          <a href="#iletisim" className="hover:text-[#8C7662] transition-colors duration-300">İletişim</a>
          <a href="#hakkimizda" className="hover:text-[#8C7662] transition-colors duration-300">Hakkımızda</a>
        </nav>

        <div className="flex items-center gap-3 z-50">
          {/* Instagram Butonu (Masaüstü) */}
          <a 
            href="https://www.instagram.com/yunuscetinogluguzellik/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-[#E1306C] hover:text-[#C13584] text-xs font-bold transition-all uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
            Instagram
          </a>
          
          <a 
            href="#randevu" 
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#3D2C23] hover:bg-[#8C7662] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold transition-all shadow-md uppercase tracking-wider"
          >
            Randevu Al
          </a>

          {/* Hamburger İkonu (Mobil) */}
          <button 
            className="lg:hidden text-[#3D2C23] p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü Aç"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobil Tam Ekran Menü */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden transition-all">
          <nav className="flex flex-col gap-8 text-lg font-bold text-[#3D2C23] uppercase tracking-widest text-center">
            <a href="#hero" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8C7662]">Ana Sayfa</a>
            <a href="#hizmetler" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8C7662]">Hizmetler</a>
            <a href="#iletisim" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8C7662]">İletişim</a>
            <a href="#hakkimizda" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8C7662]">Hakkımızda</a>
            
            <div className="w-12 h-[1px] bg-[#E8E2DA] mx-auto my-2"></div>
            
            <a 
              href="https://www.instagram.com/yunuscetinogluguzellik/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E1306C] flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              Instagram
            </a>
          </nav>
        </div>
      )}

      {/* 1. Hero Bölümü */}
      <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center text-center px-4 overflow-hidden bg-[#2b1f18]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#2b1f18]/50"></div>
        <div className="relative z-10 max-w-4xl mt-20">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-8 drop-shadow-lg leading-tight">
            Yenilenmiş Hissetmenin <br/> Tam Zamanı
          </h1>
          <p className="text-lg md:text-xl text-[#FDFBF7] font-light mb-12 max-w-2xl mx-auto drop-shadow-md opacity-90">
            Profesyonel dokunuşlarla cildinizin ihtiyaç duyduğu bakımı keşfedin. Estetik, zarafet ve doğallığın buluşma noktası.
          </p>
          <a href="#hizmetler" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#3D2C23] px-10 py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300">
            Hizmetlerimizi Keşfedin
          </a>
        </div>
      </section>

      {/* 2. Hizmetler Bölümü */}
      <section id="hizmetler" className="py-28 bg-[#FDFBF7] px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#8C7662] text-sm font-bold tracking-widest uppercase mb-4 block">Uygulamalar</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#3D2C23] mb-6">Ayrıcalıklı Hizmetlerimiz</h2>
            <div className="w-20 h-[2px] bg-[#E8E2DA] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8E2DA]/50">
              <div className="relative h-80 overflow-hidden">
                <img src="/oda1.webp" alt="Cilt Bakımı" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif text-[#3D2C23] mb-3">Profesyonel Cilt Bakımı</h3>
                <p className="text-[#7A6A5E] text-sm mb-6 leading-relaxed">Cildinizin ihtiyacı olan nem ve parlaklığı geri kazandırın.</p>
                <a href="#randevu" className="inline-block border-b border-[#8C7662] text-[#8C7662] font-bold text-sm uppercase tracking-widest hover:text-[#3D2C23] hover:border-[#3D2C23] transition-colors pb-1">Randevu Al</a>
              </div>
            </div>

            <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8E2DA]/50">
              <div className="relative h-80 overflow-hidden">
                <img src="/bakim.webp" alt="Lazer Epilasyon" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif text-[#3D2C23] mb-3">Lazer Epilasyon</h3>
                <p className="text-[#7A6A5E] text-sm mb-6 leading-relaxed">Son teknoloji cihazlarla pürüzsüz ve estetik bir tene kavuşun.</p>
                <a href="#randevu" className="inline-block border-b border-[#8C7662] text-[#8C7662] font-bold text-sm uppercase tracking-widest hover:text-[#3D2C23] hover:border-[#3D2C23] transition-colors pb-1">Randevu Al</a>
              </div>
            </div>

            <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8E2DA]/50">
              <div className="relative h-80 overflow-hidden">
                <img src="/bekleme.webp" alt="El & Ayak Bakımı" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif text-[#3D2C23] mb-3">SPA / El & Ayak Bakımı</h3>
                <p className="text-[#7A6A5E] text-sm mb-6 leading-relaxed">Günün yorgunluğunu atan özel bakım ve ferahlama seansları.</p>
                <a href="#randevu" className="inline-block border-b border-[#8C7662] text-[#8C7662] font-bold text-sm uppercase tracking-widest hover:text-[#3D2C23] hover:border-[#3D2C23] transition-colors pb-1">Randevu Al</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öncesi / Sonrası Slider Bölümü */}
      <BeforeAfterSlider />

      {/* 3. Özel Randevu Formu Bölümü */}
      <section id="randevu" className="bg-white py-28 border-t border-[#E8E2DA]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8C7662] text-sm font-bold tracking-widest uppercase mb-4 block">Hızlı ve Kolay</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3D2C23] mb-6">Randevunuzu Oluşturun</h2>
          <p className="text-[#7A6A5E] text-lg mb-12 max-w-2xl mx-auto">
            Size en uygun işlemi, günü ve saati aşağıdan seçebilirsiniz. Talebiniz tarafımıza ulaştığında incelenecek ve size onay mesajı iletilecektir.
          </p>
          
          <AppointmentForm />
          
        </div>
      </section>

      {/* 4. İletişim, Saatler ve Harita Bölümü */}
      <section id="iletisim" className="py-24 bg-[#FDFBF7] border-t border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <ContactForm />
            </div>
            <div className="flex flex-col space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-[#E8E2DA] shadow-sm">
                <h3 className="text-2xl font-serif text-[#3D2C23] mb-6">Çalışma Saatlerimiz</h3>
                <ul className="space-y-3 text-[#7A6A5E] text-sm mb-8 border-b border-[#E8E2DA] pb-6">
                  <li className="flex justify-between"><span>Pazartesi</span> <span>09:00 - 19:00</span></li>
                  <li className="flex justify-between font-bold text-[#8C7662]"><span>Salı</span> <span>Kapalı</span></li>
                  <li className="flex justify-between"><span>Çarşamba</span> <span>09:00 - 19:00</span></li>
                  <li className="flex justify-between"><span>Perşembe</span> <span>09:00 - 19:00</span></li>
                  <li className="flex justify-between"><span>Cuma</span> <span>09:00 - 19:00</span></li>
                  <li className="flex justify-between"><span>Cumartesi</span> <span>09:00 - 21:00</span></li>
                  <li className="flex justify-between"><span>Pazar</span> <span>09:00 - 21:00</span></li>
                </ul>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#8C7662] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="text-[#7A6A5E] text-sm leading-relaxed">Tilmerç Mah. 3876 Sk. No:1/4<br/>The Best Apt, Batman Merkez</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#8C7662] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <a href="tel:+905078720272" className="text-[#7A6A5E] text-sm hover:text-[#3D2C23] transition-colors">0507 872 02 72</a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-72 lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-sm border border-[#E8E2DA] relative group">
                <iframe src="https://maps.google.com/maps?q=Yunus%20%C3%87etino%C4%9Flu%20G%C3%BCzellik%20Merkezi,%20Batman&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"></iframe>
                <a href="https://www.google.com/maps/dir//Yunus+%C3%87etino%C4%9Flu+G%C3%BCzellik+Merkezi,+The+Best+Apt,+Tilmerc,+3876+Sokak+No:1%2F4,+72000+Batman+Merkez%2FBatman/@37.9034679,41.1372361,3118m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x400b47fabd27591b:0xde2948f2e90c7d85!2m2!1d41.1575384!2d37.9092143?entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3D2C23] hover:bg-[#8C7662] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-lg uppercase tracking-wider whitespace-nowrap z-10">Yol Tarifi Al</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hakkımızda ve Sertifikalar Bölümü */}
      <section id="hakkimizda" className="py-28 bg-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#8C7662] text-sm font-bold tracking-widest uppercase mb-4 block">Biz Kimiz?</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3D2C23] mb-8">Yunus Çetinoğlu Estetik</h2>
          <div className="w-20 h-[2px] bg-[#E8E2DA] mx-auto mb-10"></div>
          <p className="text-lg md:text-xl text-[#7A6A5E] leading-relaxed font-light mb-16">
            Güzelliğinizi ve sağlığınızı ön planda tutarak, alanında uzman profesyonel ekibimiz ve son teknoloji cihazlarımızla size en üst düzey hizmeti sunmayı amaçlıyoruz. Kendinizi özel hissedeceğiniz bu modern mimaride, doğal güzelliğinizi ortaya çıkarmak ve günün stresinden arınmanızı sağlamak için buradayız.
          </p>
        </div>

        {/* Cihazlar ve Sertifikalar */}
        <div className="max-w-5xl mx-auto pt-16 border-t border-[#E8E2DA]">
          <span className="text-[#8C7662] text-xs font-bold tracking-[0.3em] uppercase mb-10 block text-center">Kullanılan Teknoloji ve Sertifikalar</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-3xl font-black tracking-tighter text-[#3D2C23] lowercase">4falcon</div>
            <div className="text-2xl font-serif font-bold text-[#3D2C23]">FDA <span className="font-light text-sm uppercase tracking-widest block text-center mt-1">Onaylı</span></div>
            <div className="text-3xl font-serif tracking-widest text-[#3D2C23]">CANDELA</div>
            <div className="text-2xl font-bold tracking-wider text-[#3D2C23]">HydraFacial<span className="text-lg font-light align-super">&reg;</span></div>
            <div className="text-2xl font-serif text-[#3D2C23]">Dermapen<span className="text-[#8C7662]">4</span></div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-[#3D2C23] text-[#FDFBF7] py-8 border-t border-[#2b1f18]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="font-serif text-lg font-bold tracking-wider text-center md:text-left">
            YUNUS ÇETİNOĞLU
            <span className="block text-[9px] font-light tracking-[0.3em] text-[#D0C4B7] uppercase mt-0.5">Estetik & Güzellik</span>
          </div>

          <div className="text-center text-xs text-[#D0C4B7] flex flex-col items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#8C7662]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              powered by <a href="https://www.instagram.com/yildiztechstudio/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#FDFBF7] hover:text-[#8C7662] transition-colors">Yıldız Web Studio</a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#D0C4B7] text-xs font-light tracking-widest uppercase mr-2">Takip Edin</span>
            <a 
              href="https://www.instagram.com/yunuscetinogluguzellik/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#4A3B32] hover:bg-[#8C7662] p-2.5 rounded-full transition-colors flex items-center justify-center group"
              title="Instagram'da Takip Edin"
            >
              <svg className="w-5 h-5 text-[#FDFBF7] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
            </a>
          </div>

        </div>
      </footer>

    </main>
  );
}