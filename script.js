/*
  KONFIGURASI TEMPLATE:
  1) Ubah nama, tanggal, lokasi, dan rekening di index.html.
  2) Ubah tanggal target di WEDDING_DATE di bawah.
  3) Tempel URL Web App Google Apps Script di APPS_SCRIPT_URL setelah menyiapkannya.
*/
const WEDDING_DATE = "2026-11-19T08:00:00+07:00";
const APPS_SCRIPT_URL = ""; // Contoh: https://script.google.com/macros/s/ID_DEPLOYMENT/exec

const intro = document.getElementById("intro");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

document.body.classList.add("locked");

openButton.addEventListener("click", async () => {
  intro.classList.add("is-hidden");
  document.body.classList.remove("locked");

  try {
    music.volume = 0.7;
    await music.play();
    musicLabel.textContent = "Jeda Musik";
  } catch (error) {
    console.error("Musik gagal diputar:", error);
    musicLabel.textContent = "Putar Musik";
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Jeda Musik";
    } catch (error) {
      console.error("Gagal memutar musik:", error);
      musicLabel.textContent = "Putar Musik";
    }
  } else {
    music.pause();
    musicLabel.textContent = "Putar Musik";
  }
});

music.addEventListener("ended", () => {
  musicLabel.textContent = "Putar Musik";
});

function updateCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("copyAccount").addEventListener("click", async () => {
  const number = document.getElementById("accountNumber").textContent.trim();
  const message = document.getElementById("copyMessage");
  try {
    await navigator.clipboard.writeText(number);
    message.textContent = "Nomor rekening berhasil disalin.";
  } catch {
    message.textContent = "Silakan salin nomor rekening secara manual: " + number;
  }
});

async function sendToSheet(payload, messageEl) {
  if (!APPS_SCRIPT_URL) {
    messageEl.textContent = "Formulir belum terhubung. Pemilik template perlu mengatur APPS_SCRIPT_URL di script.js.";
    return false;
  }
  try {
    // no-cors dipakai karena endpoint Apps Script menerima kiriman formulir lintas domain.
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams(payload)
    });
    messageEl.textContent = "Terima kasih! Kiriman Anda sudah dikirim.";
    return true;
  } catch (error) {
    messageEl.textContent = "Pengiriman gagal. Periksa koneksi internet lalu coba lagi.";
    return false;
  }
}

document.getElementById("rsvpForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("rsvpMessage");
  const data = new FormData(form);
  message.textContent = "Mengirim...";
  await sendToSheet({
    type: "rsvp",
    name: data.get("name"),
    attendance: data.get("attendance"),
    guests: data.get("guests"),
    timestamp: new Date().toISOString()
  }, message);
  if (APPS_SCRIPT_URL) form.reset();
});

document.getElementById("wishForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("wishMessage");
  const name = document.getElementById("wishName").value.trim();
  const wish = document.getElementById("wishText").value.trim();
  if (!name || !wish) return;
  message.textContent = "Mengirim...";
  const ok = await sendToSheet({
    type: "wish",
    name,
    message: wish,
    timestamp: new Date().toISOString()
  }, message);
  if (ok) {
    // Tampilan lokal untuk pengirim saat ini; daftar lintas perangkat memerlukan endpoint baca data.
    const empty = document.querySelector(".empty-wishes");
    if (empty) empty.remove();
    const entry = document.createElement("article");
    entry.className = "wish-entry";
    const title = document.createElement("strong");
    title.textContent = name;
    const paragraph = document.createElement("p");
    paragraph.textContent = wish;
    entry.append(title, paragraph);
    document.getElementById("wishList").prepend(entry);
    form.reset();
  }
});
