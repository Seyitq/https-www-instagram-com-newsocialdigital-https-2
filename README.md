# BK Media House website

Next.js web sitesi, içerik yönetimi ve proje talep paneli.

## Yerel geliştirme

Gerekenler: Node.js 22 ve npm.

Siteyi çalıştırmak için sırasıyla npm install, npm run db:setup ve npm run dev komutlarını çalıştır.

Site http://localhost:3000, yönetim girişi http://localhost:3000/admin/login adresinde açılır.

İlk admin hesabını kendi bilgisayarında npm run admin:setup komutuyla oluştur.
E-posta adresini ve en az 12 karakterli şifreni yerel terminale gir.
Şifre terminalde görünmez; parola hash'i .env.local dosyasına kaydolur.
Bu dosya Git'e eklenmez.

npm run admin:setup, .env.local dosyasında admin ayarı varsa dosyanın üzerine yazmaz.
Var olan ayarları değiştirmek için dosyayı önce kendin incele.

Veritabanı SQLite kullanır. Yerel şema değişikliklerini npm run db:migrate ile uygula.
Başlangıç hizmetleri ve örnek portföy npm run db:seed ile eklenir.

## İçerik

Yönetim panelinden hizmet ekleyip düzenleyebilir, portföy işlerini yayınlayabilir veya gizleyebilir ve gelen taleplerin durumunu değiştirebilirsin.
Görsel yolu yerel public klasörüne göre yazılır. Örnek: /images/yeni-is.webp.

Başlangıç portföyündeki üç kayıt, sitede açıkça konsept çalışma olarak gösterilir.
Temsilî fotoğrafların kaynakları public/images/editorial/SOURCES.md dosyasındadır.
Gerçek müşteri işleri hazır olduğunda panelden açıklamalarını ve görsellerini değiştir.

## Tanıtım filmi

Hero bölümü video olmadan optimize edilmiş poster görselini gösterir.
Sessiz tanıtım filmini public/videos/studio-reel.mp4 konumuna ekleyip
STUDIO_REEL_URL=/videos/studio-reel.mp4 ortam değişkenini tanımlayabilirsin.
WebM de desteklenir. Hareketi azaltma tercihi etkinse poster gösterilir.

## Dağıtım

next.config.ts standalone çıktısı üretir. Sunucuda .env.local yerine platformun secret yönetiminde DATABASE_URL, AUTH_SECRET, AUTH_URL, ADMIN_EMAIL ve ADMIN_PASSWORD_HASH tanımla.

Bu başlangıç sürümü tek sunucu / yerel kullanım için SQLite kullanır.
Birden fazla sunucu örneğine ölçeklerken Prisma şemasını PostgreSQL'e geçir.
