# Template Undangan Pernikahan — Mewah & Romantis (Burgundi)

Template statis HTML/CSS/JavaScript untuk GitHub Pages. Ganti nama contoh, tanggal, foto, alamat, rekening, musik, dan endpoint formulir sebelum diberikan ke pelanggan.

## File
- `index.html` — konten undangan.
- `style.css` — warna dan desain responsif.
- `script.js` — animasi pembuka, musik, hitung mundur, salin rekening, kirim RSVP/ucapan.
- `apps-script/Code.gs` — backend opsional untuk menyimpan RSVP dan ucapan ke Google Sheets.

## 1. Coba di komputer
1. Ekstrak ZIP ini.
2. Buka foldernya.
3. Klik dua kali `index.html`. Beberapa fitur akan tampil, tetapi formulir belum menyimpan data sampai endpoint dipasang.

## 2. Ubah data undangan
Buka `index.html` menggunakan Notepad atau editor kode.
Cari dan ganti semua contoh:
- `Aditya` / `Kirana`
- `20 DESEMBER 2026` dan detail tanggal/jam
- Nama orang tua
- Alamat acara
- Link Google Maps (`https://maps.google.com/?q=...`)
- Nama bank, nomor rekening, dan pemilik rekening
- `@username` dan cerita perjalanan pasangan

Kemudian buka `script.js`, ubah `WEDDING_DATE` sesuai tanggal dan jam acara dengan format ISO. Contoh: `2027-06-12T08:00:00+07:00`.

### Foto
Cara termudah: letakkan foto bernama `bride.jpg` dan `groom.jpg` di folder yang sama. Lalu buka `style.css` dan ganti aturan `.portrait` dan `.portrait-two` menjadi:

```css
.portrait {
  background: linear-gradient(#0002, #0002), url("bride.jpg") center/cover;
}
.portrait-two {
  background: linear-gradient(#0002, #0002), url("groom.jpg") center/cover;
}
```

Gunakan foto yang sudah mendapat izin dari pasangan.

### Musik
Letakkan file musik bernama `music.mp3` di folder yang sama. Gunakan musik yang dibuat sendiri atau memiliki lisensi/izin penggunaan. Browser umumnya mensyaratkan interaksi pengguna sebelum musik bisa diputar.

## 3. Publikasikan melalui GitHub Pages
1. Masuk ke https://github.com dan buat repository baru, misalnya `undangan-aditya-kirana`.
2. Pilih **Public** jika ingin memakai GitHub Pages gratis untuk repository biasa.
3. Upload `index.html`, `style.css`, `script.js`, dan aset foto/musik yang memang boleh dibagikan. Jangan upload data pribadi tamu.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
7. Tunggu proses publikasi selesai. Link akan berbentuk `https://USERNAME.github.io/NAMA-REPOSITORY/`.
8. Buka link tersebut dari ponsel untuk menguji tampilan.

## 4. Aktifkan RSVP dan ucapan (Google Sheets)
Tanpa langkah ini, formulir hanya memberi tahu bahwa endpoint belum dikonfigurasi.

1. Buat Google Sheet baru.
2. Buat tab bernama `Tamu`.
3. Isi baris pertama dengan judul kolom: `Waktu | Jenis | Nama | Kehadiran | Jumlah | Ucapan`.
4. Dari Google Sheet pilih **Extensions → Apps Script**.
5. Ganti kode di editor dengan isi file `apps-script/Code.gs`.
6. Salin ID Google Sheet dari URL, yaitu bagian di antara `/d/` dan `/edit`, lalu ganti `GANTI_DENGAN_ID_GOOGLE_SHEET_ANDA` pada kode.
7. Simpan proyek.
8. Pilih **Deploy → New deployment → Web app**.
9. Pilih **Execute as: Me**. Untuk **Who has access**, pilih opsi yang memungkinkan tamu mengirim tanpa login jika tersedia dan sesuai kebijakan akunmu.
10. Klik **Deploy**, selesaikan otorisasi, lalu salin URL Web App yang berakhiran `/exec`.
11. Buka `script.js`, isi `APPS_SCRIPT_URL` dengan URL tersebut, lalu upload ulang `script.js` ke GitHub.

**Penting:** `fetch` memakai mode `no-cors`, jadi halaman tidak bisa memverifikasi jawaban server secara langsung. Uji dengan satu RSVP contoh dan pastikan baris baru muncul di Sheet. Lindungi Sheet dan batasi siapa yang dapat mengaksesnya. Jangan mengumpulkan data sensitif yang tidak diperlukan.

## 5. Batasan versi ini
- RSVP dan ucapan tersimpan ke Google Sheets setelah Apps Script dipasang.
- Ucapan yang ditampilkan pada halaman ini adalah ucapan yang baru dikirim dari sesi/perangkat itu. Untuk menampilkan seluruh ucapan dari semua tamu, diperlukan endpoint baca data tambahan.
- GitHub Pages tidak menyediakan database atau pengiriman email sendiri.
- Link GitHub Pages standar berada di subpath repository; gunakan path relatif untuk foto dan musik.
- Untuk penjualan komersial, buat satu repository atau salinan terpisah per pelanggan. Jangan memakai satu endpoint/Sheet bersama untuk beberapa pasangan tanpa pemisahan data.
- Tambahkan domain sendiri jika pelanggan menginginkan alamat khusus, misalnya `undangan.namadomain.com`.

## Checklist sebelum dikirim ke pelanggan
- [ ] Nama dan ejaan sudah benar
- [ ] Tanggal, jam, dan zona waktu benar
- [ ] Alamat dan Google Maps sudah diuji
- [ ] Nomor rekening dikonfirmasi pemilik
- [ ] Foto dan musik punya izin penggunaan
- [ ] RSVP masuk ke Google Sheet
- [ ] Uji dari HP Android dan iPhone jika memungkinkan
- [ ] Tidak ada data pribadi pelanggan yang tertinggal di repository publik
