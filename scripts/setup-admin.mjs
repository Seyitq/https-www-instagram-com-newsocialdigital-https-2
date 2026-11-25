import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const envPath = ".env.local";
let current = "";
try {
  current = await readFile(envPath, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const values = new Map(
  current
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/))
    .filter(Boolean)
    .map((match) => [match[1], match[2].replace(/^["']|["']$/g, "")]),
);

if (values.has("ADMIN_EMAIL") || values.has("ADMIN_PASSWORD_HASH")) {
  console.error(".env.local içinde admin ayarı zaten var. Bu dosyayı önce kendin gözden geçir.");
  process.exit(1);
}

const readline = createInterface({ input: stdin, output: stdout });
const email = (await readline.question("Admin e-posta adresi: ")).trim().toLowerCase();
readline.close();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Geçerli bir e-posta adresi gir.");
  process.exit(1);
}

if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
  console.error("Bu komutu etkileşimli bir terminalde çalıştır.");
  process.exit(1);
}

stdout.write("Admin şifresi (en az 12 karakter): ");
stdin.setRawMode(true);
stdin.resume();

const password = await new Promise((resolve, reject) => {
  let value = "";
  stdin.on("data", (buffer) => {
    const key = buffer.toString("utf8");
    if (key === "\u0003") {
      reject(new Error("Kurulum iptal edildi."));
      return;
    }
    if (key === "\r" || key === "\n") {
      resolve(value);
      return;
    }
    if (key === "\u007f" || key === "\b") {
      value = value.slice(0, -1);
      stdout.write("\b \b");
    } else if (key.length === 1) {
      value += key;
      stdout.write("*");
    }
  });
});

stdin.setRawMode(false);
stdin.pause();
stdout.write("\n");

if (password.length < 12) {
  console.error("Şifre en az 12 karakter olmalı.");
  process.exit(1);
}

values.set("DATABASE_URL", values.get("DATABASE_URL") || "file:./prisma/dev.db");
values.set("AUTH_SECRET", values.get("AUTH_SECRET") || randomBytes(32).toString("base64url"));
values.set("AUTH_URL", values.get("AUTH_URL") || "http://localhost:3000");
values.set("ADMIN_EMAIL", email);
values.set("ADMIN_PASSWORD_HASH", await bcrypt.hash(password, 12));

const content = [...values.entries()]
  .map(([key, value]) => key + "=" + JSON.stringify(value))
  .join("\n");
await writeFile(envPath, content + "\n", { encoding: "utf8", mode: 0o600 });
console.log("Admin ayarlandı: " + email + ". Şifre .env.local dosyasına yazılmadı.");
