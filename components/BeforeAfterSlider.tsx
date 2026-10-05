"use client";
import { useState, useEffect } from 'react';

// Göstermek istediğimiz işlemlerin listesi
const cases = [
  { id: 0, name: "Cilt Bakımı", before: "/oncesi.jpg", after: "/sonrasi.jpg" },
  { id: 1, name: "Leke Tedavisi", before: "/oncesi2.jpg", after: "/sonrasi2.jpg" },
  { id: 2, name: "Akne Skar", before: "/oncesi3.jpg", after: "/sonrasi3.jpg" },
  { id: 3, name: "Anti-Aging", before: "/oncesi4.jpg", after: "/sonrasi4.jpg" }
];

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeIndex, setActiveIndex] = useState(0);

  // Kategori değiştiğinde slider çizgisini tekrar tam ortaya (50%) al
  useEffect(() => {
    setSliderPosition(50);
  }, [activeIndex]);

  return (
    <section className="bg-[#FDFBF7] py-20 border-y border-[#E8E2DA]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <span className="text-[#8C7662] text-sm font-bold tracking-widest uppercase mb-4 block">Gözle Görülür Değişim</span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#3D2C23] mb-8">Sonuçlarımıza Göz Atın</h2>
        
        {/* Kategori Seçici Butonlar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cases.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-[#3D2C23] text-white shadow-md" 
                  : "bg-white text-[#7A6A5E] border border-[#E8E2DA] hover:bg-[#8C7662] hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Slider Konteyner */}
        <div className="relative w-full max-w-3xl mx-auto h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg select-none transition-all duration-500">
          
          {/* Sonrası (Alt Katman) */}
          <div className="absolute inset-0 bg-[#E8E2DA]">
            <img 
              src={cases[activeIndex].after} 
              alt={`Sonrası - ${cases[activeIndex].name}`}
              className="w-full h-full object-cover"
              draggable="false"
            />
            <span className="absolute bottom-4 right-4 bg-[#3D2C23] text-white px-3 py-1 text-sm rounded-full opacity-90 shadow">Sonrası</span>
          </div>

          {/* Öncesi (Üst Katman) */}
          <div 
            className="absolute inset-0 bg-[#D0C4B7]"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={cases[activeIndex].before} 
              alt={`Öncesi - ${cases[activeIndex].name}`}
              className="w-full h-full object-cover grayscale opacity-80" 
              draggable="false"
            />
            <span className="absolute bottom-4 left-4 bg-white text-[#3D2C23] px-3 py-1 text-sm rounded-full opacity-90 shadow">Öncesi</span>
          </div>

          {/* Kaydırma Çizgisi ve Butonu */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center transition-all duration-75"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D2C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D2C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 -ml-2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </div>

          {/* Gizli Slider İnputu */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>
        
      </div>
    </section>
  );
}