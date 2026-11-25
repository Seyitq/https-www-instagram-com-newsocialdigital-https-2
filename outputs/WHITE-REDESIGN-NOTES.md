# New Social — Beyaz tasarım

## Tasarım kararları

Filmlik.net tarayıcıda incelendi. Beyaz zemin, dengeli iki sütunlu hero, okunabilir başlıklar, görsel keşif kartları ve sade süreç akışı temel alındı. Referansın görselleri ve kodu kopyalanmadı.

New Social'ın turuncusu yalnızca teklif butonları, aktif filtre ve küçük marka vurgularında kullanıldı. Manrope tek yazı ailesi olarak korundu; dev display fontu kaldırıldı. Siyah hero, editoryal hizmet satırları ve asimetrik portföy yerine sayfa düzeni yeniden oluşturuldu. Scroll reveal ve parallax kaldırıldı. Yalnızca kısa hover geçişleri kullanılıyor; hareketi azaltma tercihi destekleniyor.

## Değişen dosyalar

- `src/app/page.tsx`: yeni hero, hizmetler, portföy, hakkımızda, süreç, iletişim ve footer düzeni; güncel SEO metni.
- `src/app/studio.css`: beyaz tasarım sistemi ve masaüstü, tablet, mobil yerleşimler. Önceki public stylesheet tamamen değiştirildi.
- `src/app/layout.tsx`, `src/app/globals.css`: tek font ailesi ve açık sayfa zemini. Panelin kendi renkleri korundu.
- `src/components/features/public-site/site-header.tsx`: beş bağlantılı menü, teklif CTA'sı ve mobil menü.
- `src/components/features/public-site/service-index.tsx`: gerçek kategori filtreleri, görsel kartlar ve açılır detaylar.
- `src/components/features/public-site/project-gallery.tsx`: düzenli kartlar ve mevcut erişilebilir proje dialog'u.
- `src/components/features/public-site/cinematic-media.tsx`: yeni hero boyutları ve korunan isteğe bağlı video desteği.
- `src/components/features/public-site/contact-form.tsx`: tasarım sonrası doğrulamada bulunan form sıfırlama sorunu düzeltildi. Hatalı gönderim sonrasında hizmet ve onay seçimi korunur.
- `src/lib/studio-content.ts`: istenen dört süreç adımı ve yeni sosyal kampanya taslağı eşleştirmesi.
- `public/images/editorial/social-study.svg`, `SOURCES.md`: özgün tasarım taslağı ve kaynak bilgisi.

## Doğrulamalar

- Üretim derlemesi ve TypeScript kontrolü başarılı.
- 1440, 1024, 768, 375 ve 320 px genişliklerde yatay taşma görülmedi. Yüklenen görsellerde kırık kaynak tespit edilmedi.
- Hizmet filtreleri: tüm hizmetler 6; prodüksiyon 2; dijital pazarlama 2; tasarım 1; yapay zekâ 1. Hizmet detayının açılması ve teklif bağlantısı kontrol edildi.
- Mobil menü açıldı; iletişim bağlantısı menüyü kapattı ve ilgili bölüme odak taşıdı.
- Proje detayı açıldı; Escape ile kapandı; odak açan butona döndü.
- Boşluklardan oluşan ad gönderiminde sunucu alan hatası döndürdü, veritabanına kayıt eklenmedi. Düzeltme sonrasında hizmet seçimi ve onay kutusu korundu.
- Geçerli form gönderimi gerçek Server Action ile işlendi. SQLite içinde `NEW` durumu, seçilen hizmet ve onay zamanı doğrulandı. Yalnızca doğrulama için oluşturulan sentetik kayıt temizlendi. Form yeni mesaja hazır hâle getirildi.
- Lint ve test betikleri projede tanımlı değil. Yeni bağımlılık veya test paketi kurulmadı. Lighthouse puanı ölçülmedi.

## İçerik ve kurulum sınırları

Gerçek ajans proje dosyaları sağlanmadığı için mevcut lisanslı fotoğraflar temsilî olarak kullanıldı. Başlangıç portföyündeki üç kayıt açıkça konsept olarak etiketlidir; müşteri veya başarı istatistiği uydurulmadı. Hizmet kartlarındaki grafik düzenler taslak olarak belirtilir. Gerçek görseller panel üzerinden mevcut proje kayıtlarına eklenebilir.

Mevcut form, servis/repository veri akışı ve yönetim paneli altyapısı korundu. Yeni veritabanı şeması veya migration yok. Admin hesabı oluşturulmadı; kullanıcı `npm run admin:setup` ile kendi hesabını kurabilir. Canlı dağıtım yapılmadı.

## Önizlemeler

- Yerel site: http://localhost:3000
- `white-redesign-desktop.jpg`: masaüstü hero.
- `white-redesign-mobile.jpg`: 375 px mobil hero.
- `white-redesign-tablet.jpg`: 768 px tablet.
- `white-redesign-services.jpg`: hizmet kataloğu.
- `white-redesign-portfolio.jpg`: portföy.
