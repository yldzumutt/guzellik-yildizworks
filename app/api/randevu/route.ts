import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Formdan gelecek veriler (formTipi eklendi)
    const { ad, telefon, hizmet, tarih, saat, not, formTipi } = body;

    // Şifreler şu anlık demo için sabit kalıyor (Yarınki sunumdan sonra .env'ye alacağız)
    const botToken = "8917926409:AAFoBachLM9-bIU4i1p4rxHnwG8UMQdHpBs"; 
    const chatId = "7954780766"; 

    // Randevuya özel benzersiz bir ID (Buton işlemlerinde hangi randevuya tıklandığını bulmak için)
    const randevuId = Date.now().toString(); 

    // Gelen formTipine göre başlığı belirliyoruz
    const isAranma = formTipi === "aranma";
    const baslik = isAranma ? "📞 *YENİ ARANMA TALEBİ* 📞" : "🔔 *YENİ RANDEVU TALEBİ* 🔔";

    const mesaj = `
${baslik}

👤 *Müşteri:* ${ad || 'Belirtilmedi'}
📞 *Telefon:* ${telefon || 'Belirtilmedi'}
💆‍♀️ *Hizmet:* ${hizmet || 'Belirtilmedi'}
📆 *Zaman:* ${tarih || 'Belirtilmedi'} - ${saat || 'Belirtilmedi'}
📝 *Not:* ${not || 'Yok'}
`;

    // 3'lü Buton Yapısı (Inline Keyboard)
    const replyMarkup = {
      inline_keyboard: [
        [
          { text: "✅ Onayla", callback_data: `onayla_${randevuId}` },
          { text: "⏳ Beklet", callback_data: `beklet_${randevuId}` }
        ],
        [
          { text: "❌ Reddet", callback_data: `reddet_${randevuId}` }
        ]
      ]
    };

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: mesaj,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API Hatası Detayı:", errorData);
      throw new Error('Telegram API hatası');
    }

    return NextResponse.json({ success: true, message: 'Mesaj başarıyla iletildi.' });

  } catch (error) {
    console.error("Sunucu Hatası:", error);
    return NextResponse.json({ success: false, message: 'Bir hata oluştu.' }, { status: 500 });
  }
}