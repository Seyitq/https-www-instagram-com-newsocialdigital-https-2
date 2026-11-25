# New Social — Tasarım ve doğrulama notları

15 Kasım 2026

## Uygulanan tasarım

Siyah, kırık beyaz ve sınırlı turuncu üzerine editoryal bir tasarım uygulandı. Yerel Barlow Condensed ve Manrope fontlarıyla büyük tipografi, sinematik poster, asimetrik portföy, numaralı hizmet dizini ve açık zeminli iletişim alanı oluşturuldu. Yeni bağımlılık kurulmadı.

Hizmetler mobilde tıklamayla açılır; masaüstünde görsel önizleme sunar. Projeler erişilebilir yerel dialog içinde açılır. Escape ile kapanma ve odağın geri dönmesi desteklenir. Menü, form hataları ve hareketi azaltma tercihi gözetildi.

Mevcut Prisma içerik akışı, yönetim paneli ve talep kaydı korundu. Form başarı durumunu yalnızca veritabanına kayıt tamamlandığında gösterir. Şema değişikliği ve yeni migration gerekmedi.

## Değişen dosyalar

- Sayfa ve stil: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/studio.css`.
- Etkileşimler: `src/components/features/public-site/` altında header, sinematik medya, hizmet dizini, proje galerisi, kontrollü animasyon ve iletişim formu.
- Veri ve doğrulama: `src/lib/studio-content.ts`, `src/lib/validations/studio.schema.ts`, `src/lib/validations/inquiry.schema.ts`.
- Form işlemleri: `src/server/actions/inquiry.actions.ts`, `src/app/actions.ts`.
- Yapılandırma ve belgeler: `src/env.ts`, `.env.example`, `README.md`.
- Görseller ve fontlar: `public/images/editorial/`, `public/fonts/`. Kaynak ve lisans dosyaları varlıklarla birlikte tutulur.

## Doğrulamalar

- Son `npm run build` başarılı. Prisma istemci üretimi, TypeScript ve Next.js üretim derlemesi tamamlandı.
- 320, 375, 768, 1024 ve 1440 px genişlikler kontrol edildi; yatay taşma veya yüklenemeyen görsel görülmedi.
- Mobil menü ve hizmet açılımı; proje dialog açılışı, Escape ile kapanması ve odak dönüşü kontrol edildi.
- Geçersiz ad girişinde alan hatası gösterildi, form değerleri korundu ve kayıt oluşturulmadı.
- Düzeltilen form gerçek Server Action üzerinden gönderildi. SQLite kaydında `NEW` durumu ve onay zamanı doğrulandı. Yalnızca bu doğrulama için oluşturulan sentetik kayıt sonrasında temizlendi.
- `npm run lint --if-present` ve `npm run test --if-present` çağrıldı. Projede lint/test betiği veya test paketi bulunmadığından bu kontroller çalışmadı; başarılı test sonucu olarak değerlendirilmemelidir.
- Lighthouse puanı ölçülmedi.

## Tamamlanması gereken içerik ve kurulum

- Mevcut üç başlangıç işi konsept olarak açıkça etiketlidir; gerçek müşteri ve sonuç iddiası içermez. Gerçek işlerin görselleri ve açıklamaları panelden eklenmeli.
- Tanıtım videosu sağlanmadığı için poster kullanılır. Video hazır olduğunda `public/videos/` içine eklenip `STUDIO_REEL_URL` tanımlanabilir.
- Admin kimlik bilgileri oluşturulmadı. Kullanıcı yerel terminalde `npm run admin:setup` ile e-posta ve şifresini belirlemeli. Panel doğrulaması için çalışan kimlik bilgileri gereklidir.
- Bu çalışma yerel uygulamadır; canlı sunucuya dağıtım yapılmadı. Mevcut SQLite kurulumu tek sunucu kullanımına yöneliktir.

## Önizlemeler

- Site: http://localhost:3000
- Panel girişi: http://localhost:3000/admin/login
- `redesign-desktop.jpg`: masaüstü açılış ekranı.
- `redesign-mobile.jpg`: 375 px mobil açılış ekranı.
- `form-success.jpg`: gerçek kayıt sonrası form başarı görünümü.
