# BK Media House — VDS Kurulum ve Yayın Rehberi

Bu rehber Ubuntu/Debian tabanlı bir VDS üzerinde Docker ile kurulum içindir. Yerel Windows PC'de Docker Desktop kurulabilir ve aynı Compose dosyaları test için kullanılabilir.

## 1. VDS hazırlığı

VDS'ye SSH ile bağlanın:

```bash
ssh root@SUNUCU_IP_ADRESI
apt update && apt upgrade -y
apt install -y ca-certificates curl git nginx certbot python3-certbot-nginx
```

## 2. Docker kurulumu

```bash
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/$VERSION_CODENAME stable" > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker
docker run --rm hello-world
docker compose version
```

## 3. Projeyi VDS'ye aktarın

Seçenek A — GitHub deposu üzerinden:

```bash
cd /opt
git clone https://KULLANICI/DEPO.git bk-media-house
cd bk-media-house
```

Seçenek B — dosyaları SCP/SFTP ile aktarın. VDS'de `.env.production`, `.env.local` ve veritabanı dosyası repository'ye commit edilmemelidir.

## 4. Üretim ortam dosyası

`.env.production.example` dosyasını kopyalayın:

```bash
cp .env.production.example .env.production
nano .env.production
```

İçerik:

```env
AUTH_SECRET=EN_AZ_32_KARAKTERLIK_RASTGELE_DEGER
AUTH_URL=https://bkmediahouse.com.tr
ADMIN_EMAIL=admin@bkmediahouse.com.tr
ADMIN_PASSWORD_HASH=BURAYA_BCRYPT_HASH
STUDIO_REEL_URL=/video/BK_MediaHouse_Hero_720x900.mp4
```

Güvenli AUTH_SECRET üretin:

```bash
openssl rand -base64 48
```

Çıkışı `.env.production` içindeki `AUTH_SECRET` değerine yapıştırın.

Admin parola hash'i oluşturun. Yerel PC'de Node ile:

```bash
node -e "require('bcryptjs').hash('GÜÇLÜ_PAROLA',12).then(console.log)"
```

Üretilen hash'i `ADMIN_PASSWORD_HASH=` satırına yazın. Parola düz metin olarak bu dosyaya yazılmamalıdır.

## 5. Firewall

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

## 6. Docker imajını derleyin ve başlatın

```bash
cd /opt/bk-media-house
docker compose build --no-cache
docker compose up -d
docker compose ps
docker compose logs --tail=100 web
```

Konteyner başlangıçta migration çalıştırmalı ve seed verisini güncellemelidir. Uygulama dahili olarak `127.0.0.1:3000` yerine Compose ağında `3000:3000` üzerinden erişilebilir.

## 7. DNS ayarı

Alan adı DNS sağlayıcısında şu kayıtları oluşturun:

```text
A     bkmediahouse.com.tr   -> VDS_IP_ADRESI
A     www.bkmediahouse.com.tr -> VDS_IP_ADRESI
```

DNS yayılımı tamamlanmadan HTTPS sertifikası çalışmayabilir.

## 8. Nginx reverse proxy

Mevcut örnek yapılandırmayı kullanın:

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/bkmediahouse
ln -sf /etc/nginx/sites-available/bkmediahouse /etc/nginx/sites-enabled/bkmediahouse
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Örnek dosya HTTP portunu dinleyip 3000 portundaki Next sunucusuna yönlendirir.

## 9. SSL / HTTPS

```bash
certbot --nginx -d bkmediahouse.com.tr -d www.bkmediahouse.com.tr
systemctl enable certbot.timer
systemctl list-timers | grep certbot
```

## 10. Güncelleme

Kod güncellemesinde:

```bash
cd /opt/bk-media-house
git pull --ff-only
docker compose build
docker compose up -d --force-recreate
docker compose logs --tail=100 web
```

Migration ve seed, `docker-entrypoint.sh` tarafından her başlangıçta uygulanır.

## 11. Yedekleme

SQLite veritabanı Docker volume'ünde tutulur. Elle yedek:

```bash
mkdir -p /opt/backups
TIMESTAMP=$(date +%F-%H%M)
docker compose exec -T web tar czf - /app/data > "/opt/backups/bk-media-house-$TIMESTAMP.tar.gz"
```

Geri yükleme öncesi uygulamayı durdurun:

```bash
docker compose down
docker compose up -d
```

## 12. Sağlık kontrolü

```bash
curl -I http://localhost:3000
curl -I https://bkmediahouse.com.tr
curl -I https://bkmediahouse.com.tr/sitemap.xml
curl -I https://bkmediahouse.com.tr/robots.txt
```

Beklenen: ana sayfa ve SEO rotaları için HTTP 200 veya 301.

## 13. İzleme

```bash
docker compose ps
docker compose logs -f web
tail -n 100 /var/log/nginx/error.log
docker stats
```

## 14. Dikkat edilmesi gerekenler

- SQLite tek sunuculu VDS için uygundur. Birden fazla container/replica çalıştırılmamalıdır.
- Büyük trafik veya çoklu instance için PostgreSQL'e geçilmelidir.
- `.env.production` dosyası chmod 600 yapılmalıdır:

```bash
chmod 600 /opt/bk-media-house/.env.production
```

- Referans logoları `public/ortaklar/` altında, hero videoları `public/video/` altında tutulur.
- Logolar veya videolar güncellendikten sonra `docker compose build` ve yeniden başlatma gerekir.
- Admin parolasını repository, chat veya loglara düz metin olarak eklemeyin.
- DNS, VDS IP, sertifika ve gerçek parola değerleri kişisel/kurumsal bilgi olarak burada tutulmamalıdır.
